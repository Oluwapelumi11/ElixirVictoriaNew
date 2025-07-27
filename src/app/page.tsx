import { HeroSection } from '@/components/sections/HeroSection'
import { ProductShowcase } from '@/components/sections/ProductShowcase'
import { BrandStory } from '@/components/sections/BrandStory'
import { Testimonials } from '@/components/sections/Testimonials'
import { Newsletter } from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <div className="pt-20">
      <HeroSection />
      <ProductShowcase />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </div>
  )
} 