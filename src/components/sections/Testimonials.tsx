'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

// Mock testimonials data - replace with actual data from API
const testimonials = [
  {
    id: 1,
    name: 'Isabella Rodriguez',
    title: 'Fashion Editor, Vogue',
    image: '/images/testimonials/isabella.jpg',
    quote: 'Elixir Victoria has redefined luxury fragrance for me. Each scent is a masterpiece that tells its own story. The Victoria Nocturne has become my signature scent.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Alexander Chen',
    title: 'Art Collector',
    image: '/images/testimonials/alexander.jpg',
    quote: 'The craftsmanship behind every Elixir Victoria fragrance is extraordinary. It\'s not just perfume—it\'s wearable art that captures the essence of luxury.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophia Laurent',
    title: 'Interior Designer',
    image: '/images/testimonials/sophia.jpg',
    quote: 'I discovered Elixir Victoria at a private event and was immediately captivated. The Mystique Orientale is absolutely divine—it\'s like wearing a piece of history.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Marcus Thompson',
    title: 'Luxury Hotel Concierge',
    image: '/images/testimonials/marcus.jpg',
    quote: 'Our most discerning guests specifically request Elixir Victoria fragrances. The quality and exclusivity make it the perfect choice for those who appreciate true luxury.',
    rating: 5,
  },
]

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-24 bg-luxury-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
                                    <h2 className="text-h1 text-pearl-white mb-6">
                          Voices of Luxury
                        </h2>
                        <p className="text-body text-subtle-gray max-w-3xl mx-auto leading-relaxed">
                          Discover why the world's most discerning individuals choose Elixir Victoria for their complete wellness journey
                        </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col lg:flex-row items-center gap-12"
              >
                {/* Customer Photo */}
                <div className="lg:w-1/3">
                  <div className="relative">
                    <div className="w-64 h-64 mx-auto bg-gradient-to-br from-champagne-gold/20 to-soft-gold/10 rounded-full flex items-center justify-center">
                      <div className="text-champagne-gold text-4xl font-playfair">
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-charcoal border border-champagne-gold rounded-full flex items-center justify-center">
                      <div className="text-champagne-gold text-xs font-medium">
                        EV
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote Content */}
                <div className="lg:w-2/3 text-center lg:text-left">
                  <div className="mb-6">
                    <div className="text-6xl text-champagne-gold/30 font-playfair mb-4">
                      "
                    </div>
                    <blockquote className="text-xl md:text-2xl text-pearl-white leading-relaxed mb-6 italic">
                      {testimonials[currentIndex].quote}
                    </blockquote>
                    <div className="text-6xl text-champagne-gold/30 font-playfair">
                      "
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-pearl-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-subtle-gray">
                      {testimonials[currentIndex].title}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center lg:justify-start space-x-1 mt-3">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-champagne-gold fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center items-center space-x-4 mt-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-12 h-12 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-luxury-black transition-colors duration-300 flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentIndex
                        ? 'bg-champagne-gold'
                        : 'bg-divider-gray hover:bg-champagne-gold/50'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-luxury-black transition-colors duration-300 flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-divider-gray"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-champagne-gold mb-2">
                Launch Day
              </div>
              <div className="text-sm text-subtle-gray">
                July 27, 2025
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-champagne-gold mb-2">
                Limited
              </div>
              <div className="text-sm text-subtle-gray">
                Edition Products
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-champagne-gold mb-2">
                5.0
              </div>
              <div className="text-sm text-subtle-gray">
                Quality Standard
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 