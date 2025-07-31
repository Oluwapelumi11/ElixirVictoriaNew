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
        {/* SEO Meta Tags */}
        <meta name="keywords" content="perfume, perfumes, victoria, fragrance, fragrances, elixir, elixirs, luxury perfume, luxury perfumes, signature scent, signature scents, best perfume, best perfumes, buy perfume, buy perfumes, buy fragrance, buy fragrances, shop perfume, shop perfumes, shop fragrance, shop fragrances, premium perfume, premium perfumes, premium fragrance, premium fragrances, niche perfume, niche perfumes, niche fragrance, niche fragrances, artisan perfume, artisan perfumes, artisan fragrance, artisan fragrances, exclusive perfume, exclusive perfumes, exclusive fragrance, exclusive fragrances, celebrity perfume, celebrity perfumes, celebrity fragrance, celebrity fragrances, unisex perfume, unisex perfumes, unisex fragrance, unisex fragrances, long-lasting perfume, long-lasting perfumes, long-lasting fragrance, long-lasting fragrances, oud perfume, oud perfumes, oud fragrance, oud fragrances, floral perfume, floral perfumes, floral fragrance, floral fragrances, oriental perfume, oriental perfumes, oriental fragrance, oriental fragrances, woody perfume, woody perfumes, woody fragrance, woody fragrances, fruity perfume, fruity perfumes, fruity fragrance, fruity fragrances, body care, luxury body care, luxury lip gloss, luxury scrub, cologne, colognes, best cologne, best colognes, buy cologne, shop cologne, shop colognes, scent, scents, best scent, best scents, shop scent, shop scents, perfume for men, perfume for women, perfume for her, perfume for him, fragrance for men, fragrance for women, fragrance for her, fragrance for him, elixir perfume, elixir fragrance, elixir scent, elixir cologne, misspelled: perume, purfume, parfume, fragance, fragrence, elixer, elixr, colone, cologne, colognes, best smelling perfume, best smelling fragrance, best smelling cologne, top perfume, top fragrance, top cologne, top scents, unique perfume, unique fragrance, unique cologne, unique scent, rare perfume, rare fragrance, rare cologne, rare scent, custom perfume, custom fragrance, custom cologne, custom scent, bespoke perfume, bespoke fragrance, bespoke cologne, bespoke scent, personalized perfume, personalized fragrance, personalized cologne, personalized scent, wedding perfume, wedding fragrance, wedding cologne, wedding scent, gift perfume, gift fragrance, gift cologne, gift scent, luxury scent, luxury scents, high end perfume, high end fragrance, high end cologne, high end scent, best perfume 2024, best fragrance 2024, best cologne 2024, best scent 2024, trending perfume, trending fragrance, trending cologne, trending scent, viral perfume, viral fragrance, viral cologne, viral scent, elixir victoria, elixir victoria perfume, elixir victoria fragrance, elixir victoria elixir, elixir victoria scent, elixir victoria cologne, victoria perfume, victoria fragrance, victoria elixir, victoria scent, victoria cologne, victoria nocturne, victoria nocturne perfume, victoria nocturne fragrance, victoria nocturne elixir, victoria nocturne scent, victoria nocturne cologne, and more" />
        <meta property="og:title" content="Elixir Victoria - Ultra-Luxury Perfume Collection" />
        <meta property="og:description" content="Discover the finest luxury fragrances and body care products, crafted with rare ingredients and unparalleled artistry." />
        <meta property="og:image" content="/images/products/victoria-nocturne.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elixirvictoria.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elixir Victoria - Ultra-Luxury Perfume Collection" />
        <meta name="twitter:description" content="Discover the finest luxury fragrances and body care products, crafted with rare ingredients and unparalleled artistry." />
        <meta name="twitter:image" content="/images/products/victoria-nocturne.png" />
        {/* Organization Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Elixir Victoria',
          url: 'https://elixirvictoria.com/',
          logo: '/images/products/victoria-nocturne.png',
          sameAs: [
            'https://www.instagram.com/elixirvictoria/',
            'https://www.facebook.com/elixirvictoria',
            'https://twitter.com/elixirvictoria'
          ],
          contactPoint: [{
            '@type': 'ContactPoint',
            telephone: '+2347048928368',
            contactType: 'customer service',
            email: 'info@elixirvictoria.com',
            areaServed: 'NG',
            availableLanguage: ['English']
          }]
        }) }} />
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