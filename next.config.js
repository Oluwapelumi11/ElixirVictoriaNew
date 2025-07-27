/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['pg']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'http://localhost:5000/api/:path*'
          : 'http://localhost:5000/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig 