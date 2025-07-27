import { Suspense } from 'react'
import { CollectionPage } from '@/components/pages/CollectionPage'

export default function Collection() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <CollectionPage />
    </Suspense>
  )
}