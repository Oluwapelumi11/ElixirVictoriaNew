'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, Truck, RefreshCw, Shield, Clock } from 'lucide-react'

export default function ShippingPage() {
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
              Shipping & Returns
            </h1>
            <p className="text-body-lg text-gray-400">
              We ensure your luxury products arrive safely and on time, with comprehensive return policies for your peace of mind.
            </p>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-12"
          >
            {/* Shipping Information */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Truck size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Standard Shipping</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• 3-5 business days</li>
                    <li>• Free shipping on orders over $200</li>
                    <li>• $15 shipping fee for orders under $200</li>
                    <li>• Tracking number provided</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Express Shipping</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• 1-2 business days</li>
                    <li>• $25 additional fee</li>
                    <li>• Priority handling</li>
                    <li>• Signature required</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Returns Information */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <RefreshCw size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Returns & Exchanges</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Return Policy</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• 30-day return window</li>
                    <li>• Unused and unopened items only</li>
                    <li>• Original packaging required</li>
                    <li>• Return shipping included</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                  <h3 className="text-heading-sm font-serif text-white mb-4">Exchange Policy</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>• Size exchanges available</li>
                    <li>• Color exchanges available</li>
                    <li>• No restocking fees</li>
                    <li>• Quick processing</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Security & Protection */}
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Security & Protection</h2>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield size={24} className="text-yellow-500" />
                    </div>
                    <h4 className="text-heading-sm font-serif text-white mb-2">Secure Packaging</h4>
                    <p className="text-gray-400 text-body-sm">Luxury-grade protective packaging ensures your products arrive in perfect condition.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock size={24} className="text-yellow-500" />
                    </div>
                    <h4 className="text-heading-sm font-serif text-white mb-2">Real-time Tracking</h4>
                    <p className="text-gray-400 text-body-sm">Track your order from warehouse to doorstep with detailed updates.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck size={24} className="text-yellow-500" />
                    </div>
                    <h4 className="text-heading-sm font-serif text-white mb-2">Insured Delivery</h4>
                    <p className="text-gray-400 text-body-sm">Full insurance coverage for all shipments for your complete peace of mind.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Contact Support */}
            <motion.section variants={itemVariants} className="text-center">
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <h3 className="text-heading-lg font-serif text-white mb-4">Need Help?</h3>
                <p className="text-gray-400 text-body-lg mb-6">
                  Our customer service team is here to assist you with any shipping or return questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact"
                    className="btn-luxury"
                  >
                    Contact Us
                  </Link>
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