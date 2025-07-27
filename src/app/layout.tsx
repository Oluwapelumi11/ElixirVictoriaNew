import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Elixir Victoria - Luxury Beauty & Wellness',
  description: 'Launching today, July 27, 2025. Experience luxury redefined. From rare fragrances to artisanal body care, discover a complete wellness journey crafted with unparalleled artistry and the world\'s most precious ingredients.',
  keywords: 'luxury beauty, wellness products, exclusive fragrances, artisanal body care, rare ingredients, Elixir Victoria, launch day',
  authors: [{ name: 'Elixir Victoria' }],
  creator: 'Elixir Victoria',
  publisher: 'Elixir Victoria',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elixirvictoria.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Elixir Victoria - Luxury Beauty & Wellness',
    description: 'Launching today, July 27, 2025. Experience luxury redefined. From rare fragrances to artisanal body care, discover a complete wellness journey crafted with unparalleled artistry and the world\'s most precious ingredients.',
    url: 'https://elixirvictoria.com',
    siteName: 'Elixir Victoria',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elixir Victoria - Luxury Beauty & Wellness',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elixir Victoria - Luxury Beauty & Wellness',
    description: 'Launching today, July 27, 2025. Experience luxury redefined. From rare fragrances to artisanal body care, discover a complete wellness journey crafted with unparalleled artistry and the world\'s most precious ingredients.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        <meta name="msapplication-TileColor" content="#2d5016" />
      </head>
      <body className={`${inter.className} bg-luxury-black text-pearl-white antialiased`}>
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