import { HeroSection } from '@/components/sections/HeroSection'
import { ProductShowcase } from '@/components/sections/ProductShowcase'
import { BrandStory } from '@/components/sections/BrandStory'
import { Testimonials } from '@/components/sections/Testimonials'
import { Newsletter } from '@/components/sections/Newsletter'
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Elixir Victoria - Luxury Perfume, Elixir & Fragrance Collection</title>
        <meta name="description" content="Shop the best luxury perfumes, elixirs, and body care. Discover signature scents, bespoke fragrances, and exclusive beauty at Elixir Victoria." />
        <meta name="keywords" content="perfume, elixir, luxury perfume, fragrance, signature scent, buy perfume, best perfume, exclusive perfume, Elixir Victoria" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Elixir Victoria',
          url: 'https://elixirvictoria.com/',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://elixirvictoria.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }) }} />
      </Head>
      <div className="pt-20">
        <HeroSection />
        <ProductShowcase />
        <BrandStory />
        <Testimonials />
        <Newsletter />
      </div>
    </>
  )
} 