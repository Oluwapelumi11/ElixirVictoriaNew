import { Suspense } from 'react'
import { CollectionPage } from '@/components/pages/CollectionPage'
import Head from 'next/head'

export default function Collection() {
  return (
    <>
      <Head>
        <title>Perfume Collection | Elixir Victoria</title>
        <meta name="description" content="Browse our curated collection of luxury perfumes, elixirs, and body care. Find your signature scent at Elixir Victoria." />
        <meta name="keywords" content="perfume collection, luxury perfume, elixir, fragrance, buy perfume, best perfume, Elixir Victoria" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Perfume Collection',
          description: 'Curated collection of luxury perfumes, elixirs, and body care at Elixir Victoria.'
        }) }} />
      </Head>
      <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
        <CollectionPage />
      </Suspense>
    </>
  )
}