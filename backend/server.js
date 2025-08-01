require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')

// Database connection with fallback
let pool = null
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
} else {
  console.log('⚠️  DATABASE_URL not configured - database features will be disabled')
}

const app = express()
const PORT = process.env.PORT || 5000

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Paystack Configuration
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// Test database connection
const testDatabaseConnection = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      console.log('⚠️  DATABASE_URL not configured - database features will be limited')
      return false
    }
    
    if (!pool) {
      console.log('⚠️  Database pool not initialized')
      return false
    }
    
    const result = await pool.query('SELECT NOW()')
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.log('⚠️  Some features may not work without database connection')
    return false
  }
}

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))

// Add basic logging for production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
  })
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' })
    }
    req.user = user
    next()
  })
}

// Email transporter
const createTransporter = () => {
  console.log('Creating email transporter with SMTP:', process.env.SMTP_HOST, process.env.SMTP_USER)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'), // Use env variable, fallback to 587
    secure: false, // No SSL on connect
    requireTLS: true, // Enforce STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })
}

// Real implementation for storing newsletter subscribers
const ensureSubscribersTable = async () => {
  console.log('[DB] Ensuring subscribers table exists...')
  if (!pool) {
    console.log('[DB] No database connection available')
    throw new Error('Database connection not available')
  }
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)
    console.log('[DB] Subscribers table ensured successfully')
  } catch (error) {
    console.error('[DB] Error ensuring subscribers table:', error.message)
    console.error('[DB] Full error:', error)
    throw error
  }
}

const storeEmailInDatabase = async (email) => {
  console.log('[DB] Starting storeEmailInDatabase for email:', email)
  if (!pool) {
    console.log('[DB] No database connection available, returning mock success')
    return { status: 'new' }
  }
  try {
    await ensureSubscribersTable()
    console.log('[DB] Subscribers table ensured')
    
    // Try to fix the table schema if it has the old structure
    try {
      await pool.query('ALTER TABLE subscribers ALTER COLUMN name DROP NOT NULL')
      console.log('[DB] Fixed table schema - made name column nullable')
    } catch (alterError) {
      console.log('[DB] Table schema is already correct or alter failed:', alterError.message)
    }
    
    // Check if email exists
    console.log('[DB] Checking if email exists...')
    const existing = await pool.query('SELECT id FROM subscribers WHERE email = $1', [email])
    console.log('[DB] Existing query result:', existing.rows.length, 'rows found')
    
    if (existing.rows.length > 0) {
      console.log('[DB] Email already exists, returning exists status')
      return { status: 'exists' }
    }
    
    // Insert new subscriber
    console.log('[DB] Email not found, inserting new subscriber...')
    await pool.query('INSERT INTO subscribers (email) VALUES ($1)', [email])
    console.log('[DB] New subscriber inserted successfully')
    return { status: 'new' }
  } catch (error) {
    console.error('[DB] Error in storeEmailInDatabase:', error.message)
    console.error('[DB] Full error:', error)
    throw error
  }
}

// Send newsletter welcome email
const sendNewsletterWelcomeEmail = async (email) => {
  const transporter = createTransporter()
  const mailOptions = {
    from: `"Elixir Victoria" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Welcome to Elixir Victoria Newsletter',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Elixir Victoria</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f8f8f8;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8f8f8;">
          <tr>
            <td align="center" style="padding:40px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background-color:#fff;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding:40px 40px 20px 40px;text-align:center;background:linear-gradient(135deg,#000 0%,#1a1a1a 100%);border-radius:8px 8px 0 0;">
                    <h1 style="color:#d4af37;margin:0;font-size:28px;font-weight:600;letter-spacing:1px;">ELIXIR VICTORIA</h1>
                    <p style="color:#fff;margin:10px 0 0 0;font-size:14px;opacity:0.8;">Luxury Fragrances & Body Care</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px 40px 20px 40px;">
                    <h2 style="color:#000;margin:0 0 20px 0;font-size:22px;font-weight:600;">Welcome to the Elixir Victoria Family!</h2>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;">Thank you for subscribing to our newsletter. You'll be the first to know about new launches, exclusive offers, and luxury fragrance inspiration.</p>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;">Stay tuned for updates and special treats, just for you.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 40px 40px 40px;text-align:center;background-color:#f9f9f9;border-radius:0 0 8px 8px;">
                    <p style="color:#666;margin:0;font-size:14px;line-height:1.5;">Best regards,<br><strong>The Elixir Victoria Team</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  }
  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('[EMAIL] Newsletter welcome sent:', result)
    return result
  } catch (error) {
    console.error('[EMAIL] Error sending newsletter welcome:', error)
    throw error
  }
}

// Store contact submission
const storeContactSubmission = async (data) => {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.log('Database URL not configured, skipping database storage')
      return { id: 'temp-' + Date.now() }
    }

    const query = `
      INSERT INTO contact_submissions (name, email, phone, subject, message, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id
    `
    const result = await pool.query(query, [
      data.name,
      data.email,
      data.phone || null,
      data.subject,
      data.message
    ])
    return result.rows[0]
  } catch (error) {
    console.error('Database error:', error)
    // Don't throw error, just log it and continue
    // This prevents the entire contact form from failing if database is unavailable
    console.log('Contact submission stored in memory only due to database error')
    return { id: 'temp-' + Date.now() }
  }
}

// Send customer confirmation email
const sendCustomerEmail = async (data) => {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Elixir Victoria" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: 'Thank you for contacting Elixir Victoria',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Elixir Victoria</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f8f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f8f8;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="color: #d4af37; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">ELIXIR VICTORIA</h1>
                    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">Luxury Fragrances & Body Care</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    <h2 style="color: #000000; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Thank you for reaching out!</h2>
                    
                    <p style="color: #333333; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                      Dear ${data.name},
                    </p>
                    
                    <p style="color: #333333; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                      Thank you for contacting Elixir Victoria. We have received your message and will get back to you within 24 hours.
                    </p>
                    
                    <!-- Message Details Box -->
                    <div style="background-color: #f9f9f9; border-left: 4px solid #d4af37; padding: 20px; margin: 30px 0; border-radius: 0 4px 4px 0;">
                      <h3 style="color: #000000; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">Your Message Details</h3>
                      <p style="color: #333333; margin: 0 0 10px 0; font-size: 14px;"><strong>Subject:</strong> ${data.subject}</p>
                      <p style="color: #333333; margin: 0; font-size: 14px;"><strong>Message:</strong></p>
                      <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; margin-top: 10px;">
                        <p style="color: #333333; margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${data.message}</p>
                      </div>
                    </div>
                    
                    <p style="color: #333333; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                      In the meantime, feel free to explore our luxury collection and stay connected with us:
                    </p>
                    
                    <!-- Action Buttons -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="border-radius: 6px; background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);">
                                <a href="${process.env.FRONTEND_URL}/collection" style="background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); border: 1px solid #d4af37; display: inline-block; padding: 12px 24px; text-decoration: none; border-radius: 6px; color: #000000; font-weight: 600; font-size: 14px;">Browse Collection</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Contact Info -->
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 30px 0;">
                      <h3 style="color: #000000; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Stay Connected</h3>
                      <p style="color: #333333; margin: 0 0 8px 0; font-size: 14px;">
                        📧 <a href="mailto:info@elixirvictoria.com" style="color: #d4af37; text-decoration: none;">info@elixirvictoria.com</a>
                      </p>
                      <p style="color: #333333; margin: 0 0 8px 0; font-size: 14px;">
                        📱 <a href="https://wa.me/2347048928368" style="color: #d4af37; text-decoration: none;">WhatsApp: +234 704 892 8368</a>
                      </p>
                      <p style="color: #333333; margin: 0; font-size: 14px;">
                        📸 <a href="https://instagram.com/elixirvictoria" style="color: #d4af37; text-decoration: none;">@elixirvictoria</a>
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px 40px 40px; text-align: center; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
                    <p style="color: #666666; margin: 0; font-size: 14px; line-height: 1.5;">
                      Best regards,<br>
                      <strong>The Elixir Victoria Team</strong>
                    </p>
                    <p style="color: #999999; margin: 15px 0 0 0; font-size: 12px;">
                      This email was sent in response to your contact form submission.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  }
  console.log('[EMAIL] Sending customer email to:', data.email, 'Subject:', mailOptions.subject)
  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('[EMAIL] Customer email sent:', result)
    return result
  } catch (error) {
    console.error('[EMAIL] Error sending customer email:', error)
    throw error
  }
}

// Send admin notification email
const sendAdminEmail = async (data) => {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Elixir Victoria Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || 'info@elixirvictoria.com',
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f8f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f8f8;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 30px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
                    <p style="color: #000000; margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">Elixir Victoria Website</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px;">
                    <h2 style="color: #000000; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Contact Form Details</h2>
                    
                    <!-- Customer Info -->
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
                      <h3 style="color: #000000; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Customer Information</h3>
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                            <strong style="color: #333333; font-size: 14px;">Name:</strong>
                            <span style="color: #333333; font-size: 14px; margin-left: 10px;">${data.name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">
                            <strong style="color: #333333; font-size: 14px;">Email:</strong>
                            <span style="color: #333333; font-size: 14px; margin-left: 10px;">
                              <a href="mailto:${data.email}" style="color: #d4af37; text-decoration: none;">${data.email}</a>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0;">
                            <strong style="color: #333333; font-size: 14px;">Phone:</strong>
                            <span style="color: #333333; font-size: 14px; margin-left: 10px;">
                              ${data.phone ? `<a href="tel:${data.phone}" style="color: #d4af37; text-decoration: none;">${data.phone}</a>` : 'Not provided'}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <!-- Message Details -->
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0;">
                      <h3 style="color: #000000; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Message Details</h3>
                      <p style="color: #333333; margin: 0 0 10px 0; font-size: 14px;"><strong>Subject:</strong> ${data.subject}</p>
                      <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; border-left: 4px solid #d4af37;">
                        <p style="color: #333333; margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${data.message}</p>
                      </div>
                    </div>
                    
                    <!-- Submission Info -->
                    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                      <p style="color: #333333; margin: 0; font-size: 14px;">
                        <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit',
                          timeZoneName: 'short'
                        })}
                      </p>
                    </div>
                    
                    <!-- Action Buttons -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="border-radius: 6px; background: #d4af37; margin-right: 10px;">
                                <a href="mailto:${data.email}" style="background: #d4af37; border: 1px solid #d4af37; display: inline-block; padding: 12px 28px; text-decoration: none; border-radius: 6px; color: #000000; font-weight: bold; font-size: 15px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Reply to Customer</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px 40px 40px; text-align: center; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
                    <p style="color: #666666; margin: 0; font-size: 14px; line-height: 1.5;">
                      This notification was sent from the Elixir Victoria website contact form.
                    </p>
                    <p style="color: #999999; margin: 10px 0 0 0; font-size: 12px;">
                      Please respond to the customer within 24 hours.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  }
  console.log('[EMAIL] Sending admin email to:', mailOptions.to, 'Subject:', mailOptions.subject)
  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('[EMAIL] Admin email sent:', result)
    return result
  } catch (error) {
    console.error('[EMAIL] Error sending admin email:', error)
    throw error
  }
}

// ===== TELEGRAM BOT FUNCTIONS =====

// Initialize Telegram Bot
let telegramBot = null
if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
  telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false })
}

// Send Telegram notification
const sendTelegramNotification = async (message) => {
  if (!telegramBot || !TELEGRAM_CHAT_ID) {
    console.log('Telegram bot not configured, skipping notification')
    return
  }

  try {
    await telegramBot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'HTML' })
    console.log('Telegram notification sent successfully')
  } catch (error) {
    console.error('Error sending Telegram notification:', error)
  }
}

// Send order notification to Telegram
const sendOrderNotification = async (order, items) => {
  if (!telegramBot || !TELEGRAM_CHAT_ID) return

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const orderTime = new Date(order.created_at).toLocaleString('en-NG', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const message = `
🛍️ <b>NEW ORDER RECEIVED!</b>

📦 <b>Order:</b> ${order.order_number}
👤 <b>Customer:</b> ${order.customer_name}
📧 <b>Email:</b> ${order.customer_email}
📱 <b>Phone:</b> ${order.customer_phone || 'Not provided'}
💰 <b>Total:</b> ₦${order.total.toLocaleString()}
📊 <b>Items:</b> ${totalItems} item${totalItems !== 1 ? 's' : ''}
⏰ <b>Time:</b> ${orderTime}

📋 <b>Items:</b>
${items.map(item => `• ${item.product_name || 'Unknown Product'} (Qty: ${item.quantity})`).join('\n')}

${order.notes ? `📝 <b>Notes:</b> ${order.notes}` : ''}

🔗 <b>Status:</b> ${order.status.toUpperCase()}
  `.trim()

  await sendTelegramNotification(message)
}

// Send contact form notification to Telegram
const sendContactNotification = async (submission) => {
  if (!telegramBot || !TELEGRAM_CHAT_ID) return

  const message = `
📞 <b>NEW CONTACT FORM SUBMISSION!</b>

👤 <b>Name:</b> ${submission.name}
📧 <b>Email:</b> ${submission.email}
📱 <b>Phone:</b> ${submission.phone || 'Not provided'}
📋 <b>Subject:</b> ${submission.subject}

💬 <b>Message:</b>
${submission.message}

⏰ <b>Time:</b> ${new Date().toLocaleString('en-NG', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}
  `.trim()

  await sendTelegramNotification(message)
}

// Send order confirmation email to customer
const sendOrderConfirmationEmail = async (order, items) => {
  const transporter = createTransporter()
  const productRows = items.map(item => `
    <tr>
      <td style="padding: 8px 0; color: #333; font-size: 14px;">${item.product_name}</td>
      <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">₦${item.unit_price.toLocaleString()}</td>
      <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">₦${item.total_price.toLocaleString()}</td>
    </tr>
  `).join('')
  const mailOptions = {
    from: `"Elixir Victoria" <${process.env.SMTP_USER}>`,
    to: order.customer_email,
    subject: `Order Confirmation - Elixir Victoria [${order.order_number}]`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Order Confirmation</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f8f8f8;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8f8f8;">
          <tr>
            <td align="center" style="padding:40px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background-color:#fff;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding:40px 40px 20px 40px;text-align:center;background:linear-gradient(135deg,#000 0%,#1a1a1a 100%);border-radius:8px 8px 0 0;">
                    <h1 style="color:#d4af37;margin:0;font-size:28px;font-weight:600;letter-spacing:1px;">ELIXIR VICTORIA</h1>
                    <p style="color:#fff;margin:10px 0 0 0;font-size:14px;opacity:0.8;">Luxury Fragrances & Body Care</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px 40px 20px 40px;">
                    <h2 style="color:#000;margin:0 0 20px 0;font-size:22px;font-weight:600;">Thank you for your order!</h2>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;">Dear ${order.customer_name},</p>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;">Your order <strong>${order.order_number}</strong> has been received and is being processed. We will notify you when it ships.</p>
                    <div style="background-color:#f9f9f9;padding:20px;border-radius:6px;margin:30px 0;">
                      <h3 style="color:#000;margin:0 0 15px 0;font-size:16px;font-weight:600;">Order Summary</h3>
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <th align="left" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Product</th>
                          <th align="center" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Qty</th>
                          <th align="right" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Unit Price</th>
                          <th align="right" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Total</th>
                        </tr>
                        ${productRows}
                        <tr>
                          <td colspan="3" style="color:#333;font-size:15px;font-weight:bold;padding-top:16px;text-align:right;">Order Total:</td>
                          <td style="color:#d4af37;font-size:16px;font-weight:bold;padding-top:16px;text-align:right;">₦${order.total.toLocaleString()}</td>
                        </tr>
                      </table>
                    </div>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;">If you have any questions, reply to this email or contact us at <a href="mailto:info@elixirvictoria.com" style="color:#d4af37;text-decoration:none;">info@elixirvictoria.com</a>.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 40px 40px 40px;text-align:center;background-color:#f9f9f9;border-radius:0 0 8px 8px;">
                    <p style="color:#666;margin:0;font-size:14px;line-height:1.5;">Best regards,<br><strong>The Elixir Victoria Team</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  }
  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('[EMAIL] Order confirmation sent:', result)
    return result
  } catch (error) {
    console.error('[EMAIL] Error sending order confirmation:', error)
    throw error
  }
}

// Send 'Order Received, Awaiting Payment' email to customer
const sendOrderReceivedEmail = async (order, items) => {
  const transporter = createTransporter()
  const productRows = items.map(item => `
    <tr>
      <td style="padding: 8px 0; color: #333; font-size: 14px;">${item.product_name}</td>
      <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">₦${item.unit_price.toLocaleString()}</td>
      <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">₦${item.total_price.toLocaleString()}</td>
    </tr>
  `).join('')
  const mailOptions = {
    from: `"Elixir Victoria" <${process.env.SMTP_USER}>`,
    to: order.customer_email,
    subject: `Order Received - Awaiting Payment [${order.order_number}]`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Received - Awaiting Payment</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f8f8f8;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8f8f8;">
          <tr>
            <td align="center" style="padding:40px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background-color:#fff;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding:40px 40px 20px 40px;text-align:center;background:linear-gradient(135deg,#000 0%,#1a1a1a 100%);border-radius:8px 8px 0 0;">
                    <h1 style="color:#d4af37;margin:0;font-size:28px;font-weight:600;letter-spacing:1px;">ELIXIR VICTORIA</h1>
                    <p style="color:#fff;margin:10px 0 0 0;font-size:14px;opacity:0.8;">Luxury Fragrances & Body Care</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px 40px 20px 40px;">
                    <h2 style="color:#000;margin:0 0 20px 0;font-size:22px;font-weight:600;">Order Received - Awaiting Payment</h2>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;">Dear ${order.customer_name},</p>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;">We have received your order <strong>${order.order_number}</strong>. Please complete your payment to process your order. If you have already paid, kindly wait for payment confirmation.</p>
                    <div style="background-color:#f9f9f9;padding:20px;border-radius:6px;margin:30px 0;">
                      <h3 style="color:#000;margin:0 0 15px 0;font-size:16px;font-weight:600;">Order Summary</h3>
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <th align="left" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Product</th>
                          <th align="center" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Qty</th>
                          <th align="right" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Unit Price</th>
                          <th align="right" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Total</th>
                        </tr>
                        ${productRows}
                        <tr>
                          <td colspan="3" style="color:#333;font-size:15px;font-weight:bold;padding-top:16px;text-align:right;">Order Total:</td>
                          <td style="color:#d4af37;font-size:16px;font-weight:bold;padding-top:16px;text-align:right;">₦${order.total.toLocaleString()}</td>
                        </tr>
                      </table>
                    </div>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;">If you have any questions, reply to this email or contact us at <a href="mailto:info@elixirvictoria.com" style="color:#d4af37;text-decoration:none;">info@elixirvictoria.com</a>.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 40px 40px 40px;text-align:center;background-color:#f9f9f9;border-radius:0 0 8px 8px;">
                    <p style="color:#666;margin:0;font-size:14px;line-height:1.5;">Best regards,<br><strong>The Elixir Victoria Team</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  }
  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('[EMAIL] Order received/awaiting payment sent:', result)
    return result
  } catch (error) {
    console.error('[EMAIL] Error sending order received/awaiting payment:', error)
    throw error
  }
}
// Send admin notification for new order
const sendOrderAdminNotification = async (order, items) => {
  const transporter = createTransporter()
  const productRows = items.map(item => `
    <tr>
      <td style="padding: 8px 0; color: #333; font-size: 14px;">${item.product_name}</td>
      <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">₦${item.unit_price.toLocaleString()}</td>
      <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">₦${item.total_price.toLocaleString()}</td>
    </tr>
  `).join('')
  const mailOptions = {
    from: `"Elixir Victoria Orders" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || 'info@elixirvictoria.com',
    subject: `New Order Received [${order.order_number}]`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Received</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f8f8f8;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8f8f8;">
          <tr>
            <td align="center" style="padding:40px 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background-color:#fff;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding:40px 40px 20px 40px;text-align:center;background:linear-gradient(135deg,#d4af37 0%,#b8941f 100%);border-radius:8px 8px 0 0;">
                    <h1 style="color:#000;margin:0;font-size:24px;font-weight:600;">New Order Received</h1>
                    <p style="color:#000;margin:10px 0 0 0;font-size:14px;opacity:0.8;">Elixir Victoria Website</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px 40px 20px 40px;">
                    <h2 style="color:#000;margin:0 0 20px 0;font-size:20px;font-weight:600;">Order Details</h2>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;"><strong>Order Number:</strong> ${order.order_number}</p>
                    <p style="color:#333;margin:0 0 20px 0;font-size:16px;line-height:1.6;"><strong>Customer:</strong> ${order.customer_name} (${order.customer_email})</p>
                    <div style="background-color:#f9f9f9;padding:20px;border-radius:6px;margin:30px 0;">
                      <h3 style="color:#000;margin:0 0 15px 0;font-size:16px;font-weight:600;">Order Summary</h3>
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <th align="left" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Product</th>
                          <th align="center" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Qty</th>
                          <th align="right" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Unit Price</th>
                          <th align="right" style="color:#d4af37;font-size:14px;padding-bottom:8px;">Total</th>
                        </tr>
                        ${productRows}
                        <tr>
                          <td colspan="3" style="color:#333;font-size:15px;font-weight:bold;padding-top:16px;text-align:right;">Order Total:</td>
                          <td style="color:#d4af37;font-size:16px;font-weight:bold;padding-top:16px;text-align:right;">₦${order.total.toLocaleString()}</td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 40px 40px 40px;text-align:center;background-color:#f9f9f9;border-radius:0 0 8px 8px;">
                    <p style="color:#666;margin:0;font-size:14px;line-height:1.5;">This notification was sent from the Elixir Victoria website order system.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  }
  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('[EMAIL] Admin order notification sent:', result)
    return result
  } catch (error) {
    console.error('[EMAIL] Error sending admin order notification:', error)
    throw error
  }
}

// ===== AUTHENTICATION ENDPOINTS =====

// Register user
app.post('/api/auth/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { email, password, name } = req.body

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: 'User with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, name, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, email, name',
      [email, hashedPassword, name]
    )

    const user = result.rows[0]

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Login user
app.post('/api/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { email, password } = req.body

    // Find user
    const result = await pool.query(
      'SELECT id, email, password_hash, name FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const user = result.rows[0]

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Get user profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, created_at FROM users WHERE id = $1',
      [req.user.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json({
      user: result.rows[0]
    })

  } catch (error) {
    console.error('Profile error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Update user profile
app.put('/api/auth/profile', authenticateToken, [
  body('name').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name } = req.body

    const result = await pool.query(
      'UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING id, email, name',
      [name, req.user.userId]
    )

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0]
    })

  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// ===== ADDRESS MANAGEMENT =====

// Get user addresses
app.get('/api/addresses', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM user_addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC',
      [req.user.userId]
    )

    res.json({
      addresses: result.rows
    })

  } catch (error) {
    console.error('Get addresses error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Add new address
app.post('/api/addresses', authenticateToken, [
  body('type').isIn(['shipping', 'billing']),
  body('address_line1').trim().isLength({ min: 5 }),
  body('city').trim().isLength({ min: 2 }),
  body('state').trim().isLength({ min: 2 }),
  body('postal_code').trim().isLength({ min: 3 }),
  body('country').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { type, address_line1, address_line2, city, state, postal_code, country, is_default } = req.body

    // If this is default, unset other defaults of same type
    if (is_default) {
      await pool.query(
        'UPDATE user_addresses SET is_default = false WHERE user_id = $1 AND type = $2',
        [req.user.userId, type]
      )
    }

    const result = await pool.query(
      `INSERT INTO user_addresses 
       (user_id, type, address_line1, address_line2, city, state, postal_code, country, is_default, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       RETURNING *`,
      [req.user.userId, type, address_line1, address_line2 || null, city, state, postal_code, country, is_default || false]
    )

    res.status(201).json({
      message: 'Address added successfully',
      address: result.rows[0]
    })

  } catch (error) {
    console.error('Add address error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Update address
app.put('/api/addresses/:id', authenticateToken, [
  body('type').isIn(['shipping', 'billing']),
  body('address_line1').trim().isLength({ min: 5 }),
  body('city').trim().isLength({ min: 2 }),
  body('state').trim().isLength({ min: 2 }),
  body('postal_code').trim().isLength({ min: 3 }),
  body('country').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { id } = req.params
    const { type, address_line1, address_line2, city, state, postal_code, country, is_default } = req.body

    // Verify address belongs to user
    const addressCheck = await pool.query(
      'SELECT id FROM user_addresses WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    )

    if (addressCheck.rows.length === 0) {
      return res.status(404).json({
        message: 'Address not found'
      })
    }

    // If this is default, unset other defaults of same type
    if (is_default) {
      await pool.query(
        'UPDATE user_addresses SET is_default = false WHERE user_id = $1 AND type = $2 AND id != $3',
        [req.user.userId, type, id]
      )
    }

    const result = await pool.query(
      `UPDATE user_addresses 
       SET type = $1, address_line1 = $2, address_line2 = $3, city = $4, state = $5, 
           postal_code = $6, country = $7, is_default = $8, updated_at = NOW()
       WHERE id = $9 AND user_id = $10
       RETURNING *`,
      [type, address_line1, address_line2 || null, city, state, postal_code, country, is_default || false, id, req.user.userId]
    )

    res.json({
      message: 'Address updated successfully',
      address: result.rows[0]
    })

  } catch (error) {
    console.error('Update address error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Delete address
app.delete('/api/addresses/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM user_addresses WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Address not found'
      })
    }

    res.json({
      message: 'Address deleted successfully'
    })

  } catch (error) {
    console.error('Delete address error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// ===== ORDER MANAGEMENT & PAYSTACK =====

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `ELX-${timestamp.slice(-6)}-${random}`
}

// Create order
app.post('/api/orders', [
  body('customer_email').isEmail().normalizeEmail(),
  body('customer_name').trim().isLength({ min: 2 }),
  body('items').isArray({ min: 1 }),
  body('subtotal').isFloat({ min: 0 }),
  body('total').isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const {
      customer_email,
      customer_name,
      customer_phone,
      items,
      subtotal,
      tax = 0,
      shipping = 0,
      total,
      shipping_address_id,
      billing_address_id,
      notes
    } = req.body

    // Check if user exists by email (optional account linking)
    let userId = null
    if (req.user?.userId) {
      userId = req.user.userId
    } else {
      // Try to find existing user by email
      const userResult = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [customer_email]
      )
      if (userResult.rows.length > 0) {
        userId = userResult.rows[0].id
      }
    }

    // Create order
    const orderNumber = generateOrderNumber()
    const orderResult = await pool.query(
      `INSERT INTO orders (
        order_number, user_id, customer_email, customer_name, customer_phone,
        subtotal, tax, shipping, total, shipping_address_id, billing_address_id, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        orderNumber,
        userId,
        customer_email,
        customer_name,
        customer_phone || null,
        subtotal,
        tax,
        shipping,
        total,
        shipping_address_id || null,
        billing_address_id || null,
        notes || null
      ]
    )

    const order = orderResult.rows[0]

    // Create order items
    const orderItems = []
    for (const item of items) {
      const itemResult = await pool.query(
        `INSERT INTO order_items (
          order_id, product_id, product_name, product_image, quantity, unit_price, total_price
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          order.id,
          item.product.id,
          item.product.name,
          item.product.images[0] || null,
          item.quantity,
          item.product.price,
          item.product.price * item.quantity
        ]
      )
      orderItems.push(itemResult.rows[0])
    }

    // Add initial status history
    await pool.query(
      'INSERT INTO order_status_history (order_id, status, notes) VALUES ($1, $2, $3)',
      [order.id, 'pending', 'Order created successfully']
    )

    // Send Telegram notification with database items
    await sendOrderNotification(order, orderItems)

    // Send 'Order Received, Awaiting Payment' email to customer
    try {
      await sendOrderReceivedEmail(order, orderItems)
    } catch (error) {
      console.error('Failed to send order received/awaiting payment email:', error.message)
    }
    // Send admin notification for new order
    try {
      await sendOrderAdminNotification(order, orderItems)
    } catch (error) {
      console.error('Failed to send admin order notification:', error.message)
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        ...order,
        items: orderItems
      }
    })

  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Initialize Paystack payment
app.post('/api/payments/initialize', [
  body('order_id').isInt(),
  body('email').isEmail().normalizeEmail(),
  body('amount').isFloat({ min: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { order_id, email, amount, callback_url } = req.body

    // Verify order exists
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [order_id]
    )

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }

    const order = orderResult.rows[0]

    // Initialize Paystack payment
    const paystackResponse = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: email,
        amount: Math.round(amount * 100), // Convert to kobo
        reference: order.order_number,
        callback_url: callback_url || `${process.env.FRONTEND_URL}/payment/verify`,
        metadata: {
          order_id: order.id,
          customer_name: order.customer_name
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (paystackResponse.data.status) {
      // Update order with payment reference
      await pool.query(
        'UPDATE orders SET payment_reference = $1 WHERE id = $2',
        [paystackResponse.data.data.reference, order.id]
      )

      res.json({
        message: 'Payment initialized successfully',
        authorization_url: paystackResponse.data.data.authorization_url,
        reference: paystackResponse.data.data.reference
      })
    } else {
      res.status(400).json({
        message: 'Failed to initialize payment'
      })
    }

  } catch (error) {
    console.error('Payment initialization error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Verify Paystack payment
app.post('/api/payments/verify', [
  body('reference').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { reference } = req.body

    // Verify with Paystack
    const paystackResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`
        }
      }
    )

    if (paystackResponse.data.status && paystackResponse.data.data.status === 'success') {
      const transaction = paystackResponse.data.data

      // Update order status
      await pool.query(
        `UPDATE orders 
         SET status = 'paid', 
             paystack_transaction_id = $1,
             updated_at = NOW()
         WHERE payment_reference = $2`,
        [transaction.id, reference]
      )

      // Add status history
      const orderResult = await pool.query(
        'SELECT id FROM orders WHERE payment_reference = $1',
        [reference]
      )

      if (orderResult.rows.length > 0) {
        await pool.query(
          'INSERT INTO order_status_history (order_id, status, notes) VALUES ($1, $2, $3)',
          [orderResult.rows[0].id, 'paid', `Payment verified. Transaction ID: ${transaction.id}`]
        )
        // Fetch order and items for confirmation email
        const orderId = orderResult.rows[0].id
        const orderData = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId])
        const order = orderData.rows[0]
        const itemsData = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [orderId])
        const items = itemsData.rows
        try {
          await sendOrderConfirmationEmail(order, items)
        } catch (error) {
          console.error('Failed to send order confirmation email:', error.message)
        }
      }

      res.json({
        message: 'Payment verified successfully',
        transaction: {
          id: transaction.id,
          amount: transaction.amount / 100, // Convert from kobo
          currency: transaction.currency,
          status: transaction.status
        }
      })
    } else {
      res.status(400).json({
        message: 'Payment verification failed'
      })
    }

  } catch (error) {
    console.error('Payment verification error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params

    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    )

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }

    const order = orderResult.rows[0]

    // Get order items
    const itemsResult = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [id]
    )

    // Get status history
    const historyResult = await pool.query(
      'SELECT * FROM order_status_history WHERE order_id = $1 ORDER BY created_at DESC',
      [id]
    )

    res.json({
      order: {
        ...order,
        items: itemsResult.rows,
        status_history: historyResult.rows
      }
    })

  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Get user orders (authenticated users)
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const ordersResult = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    )

    res.json({
      orders: ordersResult.rows
    })

  } catch (error) {
    console.error('Get user orders error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Get orders by email (for guest users)
app.get('/api/orders/email/:email', async (req, res) => {
  try {
    const { email } = req.params
    
    // Validate email format
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        message: 'Invalid email address'
      })
    }

    const ordersResult = await pool.query(
      'SELECT * FROM orders WHERE customer_email = $1 ORDER BY created_at DESC',
      [email]
    )

    res.json({
      orders: ordersResult.rows
    })

  } catch (error) {
    console.error('Get orders by email error:', error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

// Contact form endpoint
app.post('/api/contact', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 3 }).withMessage('Subject must be at least 3 characters'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number is required if provided')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name, email, phone, subject, message } = req.body

    // Store email in database for marketing (blocking, so we can check status)
    let subscriberStatus = null
    try {
      subscriberStatus = await storeEmailInDatabase(email)
    } catch (error) {
      console.log('Failed to store email in database:', error.message)
    }
    if (subscriberStatus && subscriberStatus.status === 'new') {
      // Send welcome email
      try {
        await sendNewsletterWelcomeEmail(email)
      } catch (error) {
        console.error('Failed to send newsletter welcome email:', error.message)
      }
    }
    if (subscriberStatus && subscriberStatus.status === 'exists') {
      return res.status(200).json({
        message: 'This email is already subscribed to our newsletter.',
        success: false
      })
    }

    // Store contact submission (non-blocking)
    try {
      await storeContactSubmission({ name, email, phone, subject, message })
    } catch (error) {
      console.log('Failed to store contact submission in database:', error.message)
    }

    // Send confirmation email to customer
    try {
      await sendCustomerEmail({ name, email, subject, message })
    } catch (error) {
      console.error('Failed to send customer email:', error.message)
    }

    // Send notification email to admin
    try {
      await sendAdminEmail({ name, email, phone, subject, message })
    } catch (error) {
      console.error('Failed to send admin email:', error.message)
    }

    // Send Telegram notification
    try {
      await sendContactNotification({ name, email, phone, subject, message })
    } catch (error) {
      console.error('Failed to send Telegram notification:', error.message)
    }

    res.status(200).json({
      message: 'Message sent successfully',
      success: true
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      message: 'Internal server error. Please try again later.',
      success: false
    })
  }
})

// Newsletter subscription endpoint
app.post('/api/newsletter', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required')
], async (req, res) => {
  console.log('[NEWSLETTER] Request received:', req.body)
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('[NEWSLETTER] Validation errors:', errors.array())
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }
    const { email } = req.body
    console.log('[NEWSLETTER] Processing email:', email)
    
    let subscriberStatus = null
    try {
      console.log('[NEWSLETTER] Attempting to store email in database...')
      subscriberStatus = await storeEmailInDatabase(email)
      console.log('[NEWSLETTER] Database result:', subscriberStatus)
    } catch (error) {
      console.error('[NEWSLETTER] Failed to store newsletter subscriber:', error.message)
      console.error('[NEWSLETTER] Full error:', error)
    }
    
    if (subscriberStatus && subscriberStatus.status === 'new') {
      console.log('[NEWSLETTER] New subscriber, sending welcome email...')
      try {
        await sendNewsletterWelcomeEmail(email)
        console.log('[NEWSLETTER] Welcome email sent successfully')
      } catch (error) {
        console.error('[NEWSLETTER] Failed to send newsletter welcome email:', error.message)
      }
      console.log('[NEWSLETTER] Sending success response')
      res.status(200).json({
        message: 'Successfully subscribed to newsletter!',
        success: true
      })
    } else if (subscriberStatus && subscriberStatus.status === 'exists') {
      console.log('[NEWSLETTER] Email already exists, sending exists response')
      res.status(200).json({
        message: 'This email is already subscribed to our newsletter.',
        success: false
      })
    } else {
      console.log('[NEWSLETTER] No subscriber status or unknown status, sending failure response')
      console.log('[NEWSLETTER] subscriberStatus:', subscriberStatus)
      res.status(500).json({
        message: 'Failed to subscribe to newsletter.',
        success: false
      })
    }
  } catch (error) {
    console.error('[NEWSLETTER] Newsletter subscription error:', error)
    res.status(500).json({
      message: 'Internal server error. Please try again later.',
      success: false
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'Elixir Victoria Backend is running',
    timestamp: new Date().toISOString()
  })
})

// Database health check
app.get('/api/health/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.status(200).json({
      message: 'Database connection successful',
      timestamp: result.rows[0].now
    })
  } catch (error) {
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: 'Something went wrong!',
    success: false
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Endpoint not found',
    success: false
  })
})

app.listen(PORT, async () => {
  console.log(`🚀 Elixir Victoria Backend running on port ${PORT}`)
  console.log(`📧 SMTP: ${process.env.SMTP_HOST}`)
  
  // Test database connection
  await testDatabaseConnection()
}) 