'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, Droplets, Sun, Shield, Sparkles } from 'lucide-react'

export default function CareInstructionsPage() {
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
              Care Instructions
            </h1>
            <p className="text-body-lg text-gray-400">
              Learn how to properly care for your luxury fragrances and body care products to maintain their quality and longevity.
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
                <Droplets size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Fragrance Care</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Storage</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• Store in a cool, dark place</li>
                    <li>• Keep away from direct sunlight</li>
                    <li>• Maintain room temperature</li>
                    <li>• Avoid extreme temperature changes</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Application</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• Apply to pulse points</li>
                    <li>• Use sparingly for best results</li>
                    <li>• Allow to dry naturally</li>
                    <li>• Reapply as needed</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Body Care Products</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Storage</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• Keep in a cool, dry place</li>
                    <li>• Avoid exposure to heat</li>
                    <li>• Keep lids tightly closed</li>
                    <li>• Store away from children</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Usage</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• Apply to clean, dry skin</li>
                    <li>• Use gentle, circular motions</li>
                    <li>• Allow to absorb completely</li>
                    <li>• Follow with sunscreen if needed</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Safety Guidelines</h2>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-heading-sm font-serif text-white mb-3">Do's</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Patch test before use</li>
                      <li>• Follow recommended usage</li>
                      <li>• Store properly</li>
                      <li>• Check expiration dates</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-heading-sm font-serif text-white mb-3">Don'ts</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Don't use on broken skin</li>
                      <li>• Don't expose to extreme heat</li>
                      <li>• Don't share personal care items</li>
                      <li>• Don't use expired products</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="text-center">
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <h3 className="text-heading-lg font-serif text-white mb-4">Need Help?</h3>
                <p className="text-gray-400 text-body-lg mb-6">
                  Our customer service team is here to help with any care questions.
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