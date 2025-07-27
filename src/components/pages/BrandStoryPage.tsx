'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, Quote, Award, Users, Globe, Heart } from 'lucide-react'

export function BrandStoryPage() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Link href="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mb-8">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Link>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
              Our Story
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              How a vision for authentic luxury launches today as the most anticipated beauty and wellness brand in the world
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* The Beginning */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                  The Vision
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-6">
                  Today, July 27, 2025, Victoria Elixir launches Elixir Victoria after years of perfecting her vision. 
                  While traditional brands focused on heritage and legacy, she saw an opportunity to create 
                  something entirely new—a brand that would bridge timeless elegance with contemporary innovation.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  "I wanted to create products that spoke to a new generation of luxury consumers," says Victoria. 
                  "People who value authenticity, sustainability, and innovation as much as they value quality and craftsmanship."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Heart size={24} className="text-yellow-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Authenticity First</h4>
                  <p className="text-sm text-gray-400">Every ingredient tells a story of its origin and the people who harvest it.</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Globe size={24} className="text-yellow-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Global Sourcing</h4>
                  <p className="text-sm text-gray-400">We work directly with farmers and communities around the world.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square bg-gradient-to-br from-yellow-500/20 to-yellow-200/10 rounded-sm overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                                      <div className="text-yellow-500 text-6xl font-serif">2025</div>
                  <div className="text-white text-lg font-medium">Launch Day</div>
                  <div className="text-gray-400 text-sm">July 27, 2025</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Our Process
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-3xl mx-auto">
              How we create luxury beauty and wellness products that are both timeless and innovative
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-yellow-500">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Discovery</h3>
              <p className="text-gray-400 leading-relaxed">
                We travel the world to discover rare ingredients and meet the artisans who harvest them. 
                Every ingredient has a story, and we want to tell it through our products.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-yellow-500">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Innovation</h3>
              <p className="text-gray-400 leading-relaxed">
                Our young artisans combine cutting-edge technology with traditional techniques to create 
                products that are both familiar and surprising.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-yellow-500">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Craftsmanship</h3>
              <p className="text-gray-400 leading-relaxed">
                Each product is handcrafted in small batches, ensuring the highest quality and attention 
                to detail that luxury demands.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Team */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Meet Our Team
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-3xl mx-auto">
              Visionaries launching today to redefine luxury beauty and wellness
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-yellow-200/10 rounded-full mx-auto flex items-center justify-center">
                <Users size={48} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Victoria Elixir</h3>
              <p className="text-yellow-500 font-medium">Founder & Creative Director</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                The visionary behind Elixir Victoria, bringing fresh perspectives to luxury beauty and wellness creation.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-yellow-200/10 rounded-full mx-auto flex items-center justify-center">
                <Award size={48} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Master Artisans</h3>
              <p className="text-yellow-500 font-medium">Innovation Team</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Young artisans who combine traditional techniques with modern innovation to create unique beauty and wellness products.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-yellow-200/10 rounded-full mx-auto flex items-center justify-center">
                <Globe size={48} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Global Partners</h3>
              <p className="text-yellow-500 font-medium">Sourcing Network</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Farmers, harvesters, and communities worldwide who provide us with the rarest and finest ingredients.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Future */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              The Future of Luxury
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              As we launch today, our commitment to innovation, sustainability, and authenticity is unwavering. 
              We're not just creating products—we're building a new standard for luxury beauty and wellness in the modern age.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collection">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury text-lg px-12 py-6"
                >
                  Explore Our Products
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury-ghost text-lg px-12 py-6"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 