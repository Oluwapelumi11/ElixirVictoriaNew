# Use the official Node.js 18 Alpine image as base
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install frontend dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Install backend dependencies
COPY backend/package.json backend/package-lock.json* ./backend/
WORKDIR /app/backend
RUN npm install --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy frontend dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules

# Copy source code
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build frontend
RUN npm run build

# Production image, copy all the files and run both services
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy frontend files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy backend files
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/backend/node_modules ./backend/node_modules

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
RUN chown -R nextjs:nodejs ./backend

USER nextjs

# Expose both ports
EXPOSE 3000 5000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Create a startup script that runs both services
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"] 