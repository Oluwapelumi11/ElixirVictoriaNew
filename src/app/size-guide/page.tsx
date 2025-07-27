'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, Ruler, Info } from 'lucide-react'

export default function SizeGuidePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-heading-xl font-serif text-white mb-6">
              Size Guide
            </h1>
            <p className="text-body-lg text-gray-400">
              Find the perfect fit for your luxury fragrances and body care products.
            </p>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Ruler size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Fragrance Sizes</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Travel Size (30ml)</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• Perfect for travel and sampling</li>
                    <li>• TSA compliant</li>
                    <li>• Ideal for daily use</li>
                    <li>• Compact and portable</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Standard Size (50ml)</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• Most popular size</li>
                    <li>• Great value for money</li>
                    <li>• Perfect for regular use</li>
                    <li>• Elegant presentation</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Info size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Body Care Sizes</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Small (100ml)</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• Perfect for sampling</li>
                    <li>• Travel-friendly</li>
                    <li>• Great for gifts</li>
                    <li>• Compact storage</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Large (250ml)</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• Best value for regular use</li>
                    <li>• Family-sized</li>
                    <li>• Spa-quality experience</li>
                    <li>• Luxurious presentation</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="text-center">
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <h3 className="text-heading-lg font-serif text-white mb-4">Need Help Choosing?</h3>
                <p className="text-gray-400 text-body-lg mb-6">
                  Our customer service team can help you find the perfect size for your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:info@elixirvictoria.com"
                    className="btn-luxury"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="https://wa.me/2347048928368"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-ghost"
                  >
                    WhatsApp Support
                  </a>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 