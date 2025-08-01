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
  title: 'Elixir Victoria - #1 Luxury Perfume Brand | Premium Fragrances & Body Care',
  description: 'Elixir Victoria - The #1 luxury perfume brand in Nigeria. Shop premium fragrances, bespoke perfumes, and exclusive beauty products. Victoria Nocturne, luxury lip gloss, body care. Free shipping nationwide.',
  keywords: 'Elixir Victoria, #1 luxury perfume, best perfume Nigeria, Victoria Nocturne, luxury fragrance, premium perfume, bespoke perfume, signature scent, luxury body care, exclusive perfume, buy perfume Nigeria, shop perfume Lagos, luxury beauty, premium cosmetics, artisan perfume, niche fragrance, unisex perfume, long-lasting fragrance, oud perfume, floral perfume, oriental perfume, woody perfume, fruity perfume, luxury gift, wedding perfume, custom fragrance, personalized scent, rare ingredients, luxury brand, premium quality, sophisticated fragrance, elegant perfume, exclusive beauty, luxury lifestyle, high-end perfume, designer fragrance, boutique perfume, luxury shopping, premium beauty products, luxury cosmetics, exclusive collection, signature fragrance, luxury experience, premium shopping, elegant beauty, sophisticated style, luxury market, premium brand, exclusive market, luxury retail, premium retail, boutique shopping, luxury e-commerce, premium e-commerce, exclusive e-commerce, luxury online shopping, premium online shopping, exclusive online shopping, luxury perfume shop, premium fragrance shop, exclusive perfume shop, luxury beauty shop, premium beauty shop, exclusive beauty shop, luxury cosmetics shop, premium cosmetics shop, exclusive cosmetics shop, luxury gift shop, premium gift shop, exclusive gift shop, luxury wedding shop, premium wedding shop, exclusive wedding shop, luxury custom shop, premium custom shop, exclusive custom shop, luxury personalized shop, premium personalized shop, exclusive personalized shop, luxury rare shop, premium rare shop, exclusive rare shop, luxury artisan shop, premium artisan shop, exclusive artisan shop, luxury niche shop, premium niche shop, exclusive niche shop, luxury unisex shop, premium unisex shop, exclusive unisex shop, luxury long-lasting shop, premium long-lasting shop, exclusive long-lasting shop, luxury oud shop, premium oud shop, exclusive oud shop, luxury floral shop, premium floral shop, exclusive floral shop, luxury oriental shop, premium oriental shop, exclusive oriental shop, luxury woody shop, premium woody shop, exclusive woody shop, luxury fruity shop, premium fruity shop, exclusive fruity shop, best perfume 2024, best fragrance 2024, trending perfume, viral perfume, luxury perfume Nigeria, premium fragrance Nigeria, exclusive perfume Nigeria, bespoke perfume Nigeria, custom fragrance Nigeria, personalized scent Nigeria, rare ingredients Nigeria, luxury brand Nigeria, premium quality Nigeria, sophisticated fragrance Nigeria, elegant perfume Nigeria, exclusive beauty Nigeria, luxury lifestyle Nigeria, high-end perfume Nigeria, designer fragrance Nigeria, boutique perfume Nigeria, luxury shopping Nigeria, premium beauty products Nigeria, luxury cosmetics Nigeria, exclusive collection Nigeria, signature fragrance Nigeria, luxury experience Nigeria, premium shopping Nigeria, elegant beauty Nigeria, sophisticated style Nigeria, luxury market Nigeria, premium brand Nigeria, exclusive market Nigeria, luxury retail Nigeria, premium retail Nigeria, boutique shopping Nigeria, luxury e-commerce Nigeria, premium e-commerce Nigeria, exclusive e-commerce Nigeria, luxury online shopping Nigeria, premium online shopping Nigeria, exclusive online shopping Nigeria, luxury perfume shop Nigeria, premium fragrance shop Nigeria, exclusive perfume shop Nigeria, luxury beauty shop Nigeria, premium beauty shop Nigeria, exclusive beauty shop Nigeria, luxury cosmetics shop Nigeria, premium cosmetics shop Nigeria, exclusive cosmetics shop Nigeria, luxury gift shop Nigeria, premium gift shop Nigeria, exclusive gift shop Nigeria, luxury wedding shop Nigeria, premium wedding shop Nigeria, exclusive wedding shop Nigeria, luxury custom shop Nigeria, premium custom shop Nigeria, exclusive custom shop Nigeria, luxury personalized shop Nigeria, premium personalized shop Nigeria, exclusive personalized shop Nigeria, luxury rare shop Nigeria, premium rare shop Nigeria, exclusive rare shop Nigeria, luxury artisan shop Nigeria, premium artisan shop Nigeria, exclusive artisan shop Nigeria, luxury niche shop Nigeria, premium niche shop Nigeria, exclusive niche shop Nigeria, luxury unisex shop Nigeria, premium unisex shop Nigeria, exclusive unisex shop Nigeria, luxury long-lasting shop Nigeria, premium long-lasting shop Nigeria, exclusive long-lasting shop Nigeria, luxury oud shop Nigeria, premium oud shop Nigeria, exclusive oud shop Nigeria, luxury floral shop Nigeria, premium floral shop Nigeria, exclusive floral shop Nigeria, luxury oriental shop Nigeria, premium oriental shop Nigeria, exclusive oriental shop Nigeria, luxury woody shop Nigeria, premium woody shop Nigeria, exclusive woody shop Nigeria, luxury fruity shop Nigeria, premium fruity shop Nigeria, exclusive fruity shop Nigeria',
  openGraph: {
    title: 'Elixir Victoria - #1 Luxury Perfume Brand | Premium Fragrances',
    description: 'Elixir Victoria - The #1 luxury perfume brand in Nigeria. Shop premium fragrances, bespoke perfumes, and exclusive beauty products. Victoria Nocturne, luxury lip gloss, body care.',
    url: 'https://elixirvictoria.com',
    siteName: 'Elixir Victoria',
    images: [
      {
        url: 'https://elixirvictoria.com/images/products/victoria-nocturne.png',
        width: 1200,
        height: 630,
        alt: 'Elixir Victoria - #1 Luxury Perfume Brand',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elixir Victoria - #1 Luxury Perfume Brand',
    description: 'Elixir Victoria - The #1 luxury perfume brand in Nigeria. Shop premium fragrances, bespoke perfumes, and exclusive beauty products.',
    images: ['https://elixirvictoria.com/images/products/victoria-nocturne.png'],
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
  alternates: {
    canonical: 'https://elixirvictoria.com',
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
    'alexaVerifyID': 'your-alexa-verification-code',
  },
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
        {/* Google Merchant Center Verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        {/* Product Schema Verification */}
        <meta name="google-site-verification" content="your-product-schema-verification" />
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
          alternateName: ['#1 Luxury Perfume Brand', 'Best Perfume Nigeria', 'Premium Fragrance Brand'],
          url: 'https://elixirvictoria.com/',
          logo: '/images/products/victoria-nocturne.png',
          description: 'Elixir Victoria - The #1 luxury perfume brand in Nigeria. Premium fragrances, bespoke perfumes, and exclusive beauty products.',
          foundingDate: '2024',
          award: ['#1 Luxury Perfume Brand', 'Best Premium Fragrance', 'Exclusive Beauty Products'],
          knowsAbout: ['Luxury Perfumes', 'Bespoke Fragrances', 'Premium Beauty', 'Exclusive Cosmetics'],
          sameAs: [
            'https://www.instagram.com/elixirvictoria/',
            'https://www.facebook.com/elixirvictoria',
            'https://twitter.com/elixirvictoria',
            'https://www.tiktok.com/@elixirvictoria'
          ],
          contactPoint: [{
            '@type': 'ContactPoint',
            telephone: '+2347048928368',
            contactType: 'customer service',
            email: 'info@elixirvictoria.com',
            areaServed: 'NG',
            availableLanguage: ['English']
          }],
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'NG',
            addressLocality: 'Nigeria',
            addressRegion: 'Lagos'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Luxury Perfume Collection',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Product',
                  name: 'Victoria Nocturne',
                  description: '#1 Luxury Perfume - Victoria Nocturne by Elixir Victoria'
                }
              }
            ]
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: 5.0,
            reviewCount: 150,
            bestRating: 5,
            worstRating: 1
          }
        }) }} />
        
        {/* WebSite Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Elixir Victoria',
          url: 'https://elixirvictoria.com/',
          description: 'Ultra-luxury perfume and fragrance collection',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://elixirvictoria.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }) }} />
        
        {/* Local Business Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Elixir Victoria',
          description: 'Ultra-luxury perfume and fragrance boutique',
          url: 'https://elixirvictoria.com/',
          telephone: '+2347048928368',
          email: 'info@elixirvictoria.com',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'NG',
            addressLocality: 'Nigeria'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '9.0820',
            longitude: '8.6753'
          },
          openingHours: 'Mo-Su 09:00-18:00',
          priceRange: '$$$',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Luxury Perfume Collection'
          }
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