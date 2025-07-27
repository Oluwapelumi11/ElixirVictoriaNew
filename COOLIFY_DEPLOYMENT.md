# Coolify Deployment Guide

This guide will help you deploy Elixir Victoria to Coolify with both frontend and backend running in a single container.

## Prerequisites

- Coolify instance set up
- PostgreSQL database (can be provisioned through Coolify)
- SMTP service (Gmail, SendGrid, etc.)

## Deployment Steps

### 1. Repository Setup

Your repository should have this structure:
```
elixir-victoria-ui/
├── src/                    # Next.js frontend
├── backend/               # Express backend
├── Dockerfile            # Multi-service container
├── docker-compose.yml    # Local development
├── docker-entrypoint.sh  # Startup script
└── next.config.js        # Next.js config
```

### 2. Coolify Application Setup

1. **Create New Application** in Coolify
2. **Source**: Connect your Git repository
3. **Build Pack**: Docker
4. **Dockerfile**: Use the existing `Dockerfile`

### 3. Environment Variables

Set these environment variables in Coolify:

```env
# Frontend Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Backend Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=info@elixirvictoria.com
DATABASE_URL=postgresql://username:password@host:port/database
FRONTEND_URL=https://your-domain.com

# Optional: Custom ports
PORT=3000
BACKEND_PORT=5000
```

### 4. Database Setup

#### Option A: Coolify PostgreSQL
1. Create PostgreSQL service in Coolify
2. Use the connection string provided by Coolify
3. Run the SQL setup commands:

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
```

#### Option B: External PostgreSQL
Use your existing PostgreSQL instance and update the `DATABASE_URL`.

### 5. Port Configuration

The container exposes two ports:
- **3000**: Frontend (Next.js)
- **5000**: Backend (Express API)

In Coolify, configure:
- **Main Port**: 3000 (for frontend access)
- **Additional Ports**: 5000 (for backend API)

### 6. Health Checks

The container includes health checks:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000/api/health`

### 7. Build Configuration

**Build Command**: (Leave empty, uses Dockerfile)
**Start Command**: (Leave empty, uses Dockerfile CMD)

### 8. Domain Configuration

1. **Primary Domain**: Your main domain (e.g., `elixirvictoria.com`)
2. **SSL**: Enable automatic SSL certificate
3. **Proxy**: Configure to route to port 3000

### 9. Deployment

1. **Deploy**: Click deploy in Coolify
2. **Monitor**: Check logs for any issues
3. **Test**: Visit your domain and test the contact form

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Dockerfile syntax
   - Verify all files are in repository
   - Check build logs in Coolify

2. **Backend Not Starting**
   - Verify environment variables
   - Check database connection
   - Review backend logs

3. **Contact Form Not Working**
   - Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
   - Check SMTP credentials
   - Test database connection

4. **Port Conflicts**
   - Ensure ports 3000 and 5000 are available
   - Check Coolify port configuration

### Logs

Check logs in Coolify dashboard:
- **Frontend logs**: Next.js application
- **Backend logs**: Express server
- **Container logs**: Docker container

### Environment Variables Checklist

- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `ADMIN_EMAIL`
- [ ] `DATABASE_URL`
- [ ] `FRONTEND_URL`
- [ ] `NEXT_PUBLIC_BACKEND_URL`

## Post-Deployment

1. **Test Contact Form**: Submit a test message
2. **Check Emails**: Verify admin notifications
3. **Database**: Confirm emails are stored
4. **SSL**: Verify HTTPS is working
5. **Performance**: Monitor response times

## Monitoring

- **Uptime**: Monitor application availability
- **Performance**: Track response times
- **Errors**: Monitor error logs
- **Database**: Check connection health

## Updates

To update the application:
1. Push changes to your repository
2. Coolify will automatically detect changes
3. Build and deploy automatically
4. Monitor deployment logs

## Security Notes

- All SMTP credentials are secure in backend
- Database connections use environment variables
- Rate limiting prevents abuse
- CORS protection enabled
- Input validation on all forms 