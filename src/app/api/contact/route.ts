import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Types for our contact form
interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Store email in database (placeholder for now)
const storeEmailInDatabase = async (email: string, name: string) => {
  // TODO: Implement PostgreSQL connection and email storage
  // This would typically involve:
  // 1. Connecting to your PostgreSQL database
  // 2. Inserting the email into a subscribers/contacts table
  // 3. Handling duplicates and validation
  
  console.log(`Storing email: ${email} for user: ${name}`)
  
  // Example implementation:
  // const { Pool } = require('pg')
  // const pool = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  // })
  // 
  // const query = `
  //   INSERT INTO subscribers (email, name, created_at)
  //   VALUES ($1, $2, NOW())
  //   ON CONFLICT (email) DO NOTHING
  // `
  // 
  // await pool.query(query, [email, name])
}

// Send confirmation email to customer
const sendCustomerEmail = async (data: ContactFormData) => {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Elixir Victoria" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: 'Thank you for contacting Elixir Victoria',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d4af37; margin-bottom: 20px;">Thank you for reaching out!</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for contacting Elixir Victoria. We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message details:</strong></p>
        <ul>
          <li><strong>Subject:</strong> ${data.subject}</li>
          <li><strong>Message:</strong> ${data.message}</li>
        </ul>
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>Browse our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/collection" style="color: #d4af37;">luxury collection</a></li>
          <li>Follow us on <a href="https://instagram.com/elixirvictoria" style="color: #d4af37;">Instagram</a></li>
          <li>Contact us via WhatsApp: +234 704 892 8368</li>
        </ul>
        <p>Best regards,<br>The Elixir Victoria Team</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

// Send notification email to admin
const sendAdminEmail = async (data: ContactFormData) => {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"Elixir Victoria Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || 'info@elixirvictoria.com',
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d4af37; margin-bottom: 20px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #d4af37; margin: 10px 0;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Store email in database for marketing/newsletters
    await storeEmailInDatabase(body.email, body.name)

    // Send confirmation email to customer
    await sendCustomerEmail(body)

    // Send notification email to admin
    await sendAdminEmail(body)

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
} 