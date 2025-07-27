# 🚀 Elixir Victoria - Coolify Deployment Guide

## 📋 Prerequisites

- Coolify instance running
- Git repository with your code
- Domain name (optional but recommended)

## 🐳 Docker Configuration

### Files Created:
- ✅ `Dockerfile` - Multi-stage build optimized for production
- ✅ `.dockerignore` - Excludes unnecessary files for faster builds
- ✅ `docker-compose.yml` - For local testing and Coolify deployment
- ✅ `next.config.js` - Updated with standalone output
- ✅ `src/app/api/health/route.ts` - Health check endpoint

## 🔧 Coolify Deployment Steps

### 1. **Connect Your Repository**
1. Log into your Coolify dashboard
2. Go to "Resources" → "Applications"
3. Click "New Application"
4. Select "Git Repository"
5. Connect your Git repository (GitHub, GitLab, etc.)

### 2. **Configure Application**
```
Application Name: elixir-victoria-ui
Repository: [Your Git Repository URL]
Branch: main (or your preferred branch)
Build Pack: Dockerfile
```

### 3. **Environment Variables**
Add these environment variables in Coolify:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

### 4. **Build Configuration**
```
Dockerfile Path: ./Dockerfile
Port: 3000
```

### 5. **Domain Configuration (Optional)**
- Add your custom domain
- Enable SSL certificate
- Configure DNS records

## 🧪 Local Testing

### Build and Run Locally:
```bash
# Build the Docker image
docker build -t elixir-victoria-ui .

# Run with docker-compose
docker-compose up -d

# Or run directly with Docker
docker run -p 3000:3000 elixir-victoria-ui
```

### Test Health Check:
```bash
curl http://localhost:3000/api/health
```

## 🔍 Monitoring & Health Checks

### Health Check Endpoint:
- **URL**: `/api/health`
- **Method**: GET
- **Response**: JSON with status, timestamp, and version

### Docker Health Check:
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3
- **Start Period**: 40 seconds

## 🚀 Performance Optimizations

### Docker Optimizations:
- ✅ Multi-stage build for smaller image size
- ✅ Alpine Linux base for minimal footprint
- ✅ Standalone output for faster startup
- ✅ Non-root user for security
- ✅ Proper caching layers

### Next.js Optimizations:
- ✅ Static generation where possible
- ✅ Image optimization enabled
- ✅ Telemetry disabled
- ✅ Production build optimizations

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check if all dependencies are in `package.json`
   - Verify Node.js version compatibility
   - Check Docker build logs

2. **Application Won't Start**
   - Verify port 3000 is exposed
   - Check environment variables
   - Review application logs

3. **Health Check Fails**
   - Ensure `/api/health` endpoint is accessible
   - Check if application is fully started
   - Verify network connectivity

### Debug Commands:
```bash
# Check container logs
docker logs <container-id>

# Enter container for debugging
docker exec -it <container-id> sh

# Check container health
docker inspect <container-id> | grep Health -A 10
```

## 📊 Monitoring

### Coolify Dashboard:
- Application status
- Resource usage
- Logs and errors
- Deployment history

### Health Metrics:
- Response time
- Error rates
- Resource utilization
- Uptime monitoring

## 🔄 CI/CD Integration

### Automatic Deployments:
1. Push to main branch
2. Coolify detects changes
3. Automatic build and deployment
4. Health checks verify deployment

### Manual Deployments:
1. Go to Coolify dashboard
2. Select your application
3. Click "Deploy"
4. Monitor deployment progress

## 🛡️ Security Considerations

### Docker Security:
- ✅ Non-root user (nextjs:1001)
- ✅ Minimal Alpine base image
- ✅ No sensitive data in image
- ✅ Proper file permissions

### Application Security:
- ✅ Environment variables for secrets
- ✅ HTTPS enforcement (via Coolify)
- ✅ Input validation
- ✅ CORS configuration

## 📈 Scaling

### Horizontal Scaling:
- Coolify supports multiple instances
- Load balancer configuration
- Auto-scaling based on metrics

### Vertical Scaling:
- Resource limits configuration
- Memory and CPU allocation
- Performance monitoring

## 🎯 Success Metrics

### Deployment Success:
- ✅ Health check passes
- ✅ Application responds on port 3000
- ✅ All pages load correctly
- ✅ No build errors

### Performance Targets:
- ✅ Page load time < 3 seconds
- ✅ Health check response < 100ms
- ✅ 99.9% uptime
- ✅ Zero security vulnerabilities

---

## 🚀 Ready to Deploy!

Your Elixir Victoria luxury e-commerce platform is now ready for Coolify deployment with:
- ✅ Optimized Docker configuration
- ✅ Health monitoring
- ✅ Security best practices
- ✅ Performance optimizations
- ✅ Comprehensive documentation

Deploy with confidence! 🎉 