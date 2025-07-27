'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export function BrandStory() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
                                        <h2 className="text-h1 text-pearl-white mb-6">
                            Where Luxury Meets Wellness
                          </h2>
                          <p className="text-body text-subtle-gray leading-relaxed mb-6">
                            Today, Elixir Victoria launches to redefine what luxury beauty and wellness means in the modern age.
                            Born from a vision to bridge timeless elegance with contemporary innovation, we're ready to become
                            the choice of discerning individuals who seek authenticity in an industry often dominated by tradition.
                          </p>
                                        <p className="text-body text-subtle-gray leading-relaxed mb-8">
                            What sets us apart is our fearless approach to luxury. We don't just follow trends—we create them.
                            Our young team of master artisans brings fresh perspectives to beauty and wellness, combining
                            cutting-edge technology with time-honored techniques. We source the rarest ingredients from
                            around the world, working directly with farmers and harvesters to ensure the highest quality
                            while championing sustainable practices that respect both people and planet.
                          </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-champagne-gold">
                  Artisanal Craftsmanship
                </h4>
                <p className="text-sm text-subtle-gray leading-relaxed">
                  Each product is handcrafted by master artisans using time-honored techniques and cutting-edge innovation.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-champagne-gold">
                  Rare Ingredients
                </h4>
                <p className="text-sm text-subtle-gray leading-relaxed">
                  We source the world's most precious ingredients, working directly with farmers and communities worldwide.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-champagne-gold">
                  Complete Wellness
                </h4>
                <p className="text-sm text-subtle-gray leading-relaxed">
                  From rare fragrances to artisanal body care, we offer a complete luxury wellness journey.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-champagne-gold">
                  Timeless Elegance
                </h4>
                <p className="text-sm text-subtle-gray leading-relaxed">
                  Our products are designed to become part of your legacy, passed down through generations.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
            >
              <Link href="/brand-story">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury"
                >
                  Discover Our Story
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div variants={imageVariants} className="relative">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-champagne-gold/20 to-soft-gold/10 rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-black/40 to-transparent" />
              
              {/* Logo instead of text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Logo size="lg" className="mx-auto w-96 h-48" />
                  <div className="text-subtle-gray text-sm">
                    Launching Today
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-champagne-gold/20 rounded-full blur-sm animate-float" />
              <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-soft-gold/15 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-champagne-gold/30 rounded-full blur-sm animate-float" style={{ animationDelay: '4s' }} />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-champagne-gold/30 rounded-sm" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-champagne-gold/20 rounded-sm" />
            
            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
              className="absolute -bottom-8 -left-8 bg-charcoal border border-divider-gray p-6 max-w-xs"
            >
              <p className="text-sm text-subtle-gray italic leading-relaxed">
                "We're not just creating products—we're redefining what luxury beauty and wellness means for a new generation."
              </p>
              <p className="text-xs text-champagne-gold mt-2 font-medium">
                — Victoria Elixir, Founder & Creative Director
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 