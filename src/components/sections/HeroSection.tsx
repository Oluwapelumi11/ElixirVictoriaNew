'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

export function HeroSection() {
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
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/80 via-luxury-black/60 to-luxury-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/40 via-transparent to-luxury-black/40 z-10" />
        
        {/* Placeholder for video - replace with actual video */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-800">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-200/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Brand Name */}
                            <motion.div
                      variants={itemVariants}
                      className="mb-8 flex justify-center"
                    >
                      <Logo size="lg" className="scale-200 md:scale-300 lg:scale-400" />
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div
                      variants={itemVariants}
                      className="mb-12"
                    >
                      <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light max-w-4xl mx-auto leading-relaxed">
                        Experience luxury redefined. From rare fragrances to artisanal body care, discover a complete wellness journey crafted with unparalleled artistry and the world's most precious ingredients.
                      </p>
                    </motion.div>

                    {/* Luxury Badge */}
                    <motion.div
                      variants={itemVariants}
                      className="mb-8"
                    >
                      <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/30 px-6 py-3 rounded-full">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-yellow-500 text-sm font-medium tracking-wide">LAUNCHING TODAY</span>
                      </div>
                    </motion.div>

        {/* CTA Buttons */}
                            <motion.div
                      variants={itemVariants}
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                      <Link href="/collection">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-luxury text-lg px-12 py-6"
                        >
                          Discover Collection
                        </motion.button>
                      </Link>
                      
                      <Link href="/brand-story">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-luxury-ghost text-lg px-12 py-6 flex items-center space-x-2"
                        >
                          <span>Our Story</span>
                        </motion.button>
                      </Link>
                    </motion.div>
      </motion.div>

      {/* Scroll Indicator - Moved outside content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
        >
          <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Luxury Elements */}
        <div className="absolute right-10 top-1/4 w-32 h-64 opacity-10">
          <div className="w-full h-full bg-gradient-to-b from-yellow-500 to-transparent rounded-full blur-sm" />
        </div>
        
        {/* Wellness Particles */}
        <div className="absolute left-20 top-1/3 w-2 h-2 bg-yellow-500 rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute right-1/4 bottom-1/3 w-1 h-1 bg-yellow-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute left-1/3 bottom-1/4 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-50 animate-float" style={{ animationDelay: '5s' }} />
        
        {/* Additional Luxury Elements */}
        <div className="absolute right-1/3 top-1/2 w-16 h-16 border border-yellow-500/20 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute left-1/4 bottom-1/3 w-12 h-12 border border-yellow-200/30 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </motion.div>
    </section>
  )
} 