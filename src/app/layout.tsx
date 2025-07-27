import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Elixir Victoria - Ultra-Luxury Perfume Collection',
  description: 'Discover the finest luxury fragrances and body care products, crafted with rare ingredients and unparalleled artistry.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="icon" href="/images/products/victoria-nocturne.png" type="image/png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/products/victoria-nocturne.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/products/victoria-nocturne.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/products/victoria-nocturne.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        <meta name="msapplication-TileColor" content="#2d5016" />
      </head>
      <body className="antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a1a',
                color: '#fefefe',
                border: '1px solid #d4af37',
              },
              success: {
                iconTheme: {
                  primary: '#d4af37',
                  secondary: '#1a1a1a',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#1a1a1a',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
} 