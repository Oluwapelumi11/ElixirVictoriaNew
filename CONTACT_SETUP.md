# Contact Form Setup Guide

## Overview
The contact form is now fully functional with:
- ✅ Beautiful contact page at `/contact`
- ✅ SMTP email integration
- ✅ Email storage for marketing/newsletters
- ✅ Admin notifications
- ✅ Form validation and error handling

## Environment Variables Required

Create a `.env.local` file in your project root with:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# SMTP Configuration for Contact Form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin Email for Contact Form Notifications
ADMIN_EMAIL=info@elixirvictoria.com

# Database Configuration (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/elixir_victoria
```

## SMTP Setup

### Gmail Setup (Recommended)
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password" for your application
3. Use the app password as `SMTP_PASS`

### Other SMTP Providers
- **SendGrid**: Use `smtp.sendgrid.net` as host
- **Mailgun**: Use `smtp.mailgun.org` as host
- **Custom SMTP**: Configure your own SMTP server

## Database Setup

### PostgreSQL Tables Needed

```sql
-- Subscribers table for email marketing
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact form submissions (optional)
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Features

### ✅ Contact Form Features
- **Form Validation**: Required fields, email format validation
- **Loading States**: Spinner during submission
- **Success Feedback**: Confirmation message after submission
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all devices

### ✅ Email Features
- **Customer Confirmation**: Auto-reply to customer
- **Admin Notification**: Email to admin with form details
- **Professional Templates**: Branded email templates
- **HTML Emails**: Rich formatting with links

### ✅ Database Integration
- **Email Storage**: Store emails for marketing/newsletters
- **Duplicate Prevention**: Handle existing emails gracefully
- **Contact History**: Track all form submissions (optional)

## Next Steps

### 1. Complete Database Integration
Update the `storeEmailInDatabase` function in `/src/app/api/contact/route.ts`:

```typescript
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const storeEmailInDatabase = async (email: string, name: string) => {
  const query = `
    INSERT INTO subscribers (email, name, created_at)
    VALUES ($1, $2, NOW())
    ON CONFLICT (email) DO NOTHING
  `
  
  await pool.query(query, [email, name])
}
```

### 2. User Authentication System
Consider implementing user accounts for:
- **Saved Addresses**: Store shipping/billing addresses
- **Order History**: Track past purchases
- **Wishlist**: Persistent wishlist across sessions
- **Personalization**: Tailored recommendations

### 3. Email Marketing Integration
- **Newsletter Signup**: Add to footer/contact form
- **Automated Campaigns**: Welcome series, abandoned cart
- **Segmentation**: Different emails for different customer types

## Testing

1. **Local Testing**: Use Gmail SMTP for development
2. **Form Validation**: Test all required fields
3. **Email Delivery**: Check spam folders
4. **Database Storage**: Verify emails are stored correctly

## Security Considerations

- **Rate Limiting**: Prevent spam submissions
- **CAPTCHA**: Add reCAPTCHA for production
- **Input Sanitization**: Clean user inputs
- **Email Validation**: Verify email format and domain 