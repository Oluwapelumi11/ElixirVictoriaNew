# Elixir Victoria Backend

Express.js backend for handling contact forms, email services, and database operations.

## Features

- ✅ **Contact Form API**: Handle form submissions with validation
- ✅ **SMTP Integration**: Send emails via your SMTP server
- ✅ **PostgreSQL Database**: Store emails and contact submissions
- ✅ **Security**: Rate limiting, input validation, CORS protection
- ✅ **Health Checks**: Monitor backend and database status

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin Email for Notifications
ADMIN_EMAIL=info@elixirvictoria.com

# Database Configuration (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/elixir_victoria

# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
```

### 3. Database Setup
Run these SQL commands in your PostgreSQL database:

```sql
-- Subscribers table for email marketing
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users table for authentication
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User addresses table
CREATE TABLE user_addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('shipping', 'billing')),
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_type ON user_addresses(type);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'NGN',
  payment_method VARCHAR(50) NOT NULL DEFAULT 'paystack',
  payment_reference VARCHAR(255),
  paystack_transaction_id VARCHAR(255),
  shipping_address_id INTEGER REFERENCES user_addresses(id),
  billing_address_id INTEGER REFERENCES user_addresses(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image VARCHAR(500),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order status history
CREATE TABLE order_status_history (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for orders
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_status_history_order_id ON order_status_history(order_id);
```

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### POST `/api/contact`
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "General Inquiry",
  "message": "Hello, I have a question..."
}
```

**Response:**
```json
{
  "message": "Message sent successfully",
  "success": true
}
```

### GET `/api/health`
Check if the backend is running.

### GET `/api/health/db`
Check database connection status.

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All form fields are validated
- **CORS Protection**: Only allows requests from configured frontend URL
- **Helmet**: Security headers for Express
- **SQL Injection Protection**: Parameterized queries

## Email Features

- **Customer Confirmation**: Auto-reply to form submitter
- **Admin Notification**: Email to admin with form details
- **Professional Templates**: Branded HTML emails
- **Error Handling**: Graceful failure handling

## Development

### Running Both Frontend and Backend

1. **Terminal 1** (Frontend):
```bash
cd ../
npm run dev
```

2. **Terminal 2** (Backend):
```bash
cd backend
npm run dev
```

### Testing the API

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

## Production Deployment

1. **Environment Variables**: Set production values
2. **Database**: Use production PostgreSQL instance
3. **SMTP**: Configure production email service
4. **Process Manager**: Use PM2 or similar
5. **Reverse Proxy**: Use Nginx or Apache

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check `FRONTEND_URL` in `.env`
2. **Database Connection**: Verify `DATABASE_URL` and PostgreSQL is running
3. **SMTP Errors**: Check SMTP credentials and enable "Less secure apps" for Gmail
4. **Rate Limiting**: Reduce requests or increase limits for development

### Logs
Check console output for detailed error messages and connection status. 