'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Scale } from 'lucide-react'

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-body-lg text-gray-400">
              Last updated: December 2024
            </p>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <FileText size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Acceptance of Terms</h2>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <p className="text-gray-400 text-body-md leading-relaxed">
                  By accessing and using Elixir Victoria's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Product Information</h2>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <ul className="space-y-2 text-gray-400">
                  <li>• All products are authentic and sourced from authorized manufacturers</li>
                  <li>• Product images are representative but may vary slightly</li>
                  <li>• Prices are subject to change without notice</li>
                  <li>• Product availability is subject to stock levels</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Scale size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Order & Payment</h2>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <ul className="space-y-2 text-gray-400">
                  <li>• Orders are subject to acceptance and availability</li>
                  <li>• Payment must be completed before order processing</li>
                  <li>• We accept major credit cards and secure payment methods</li>
                  <li>• Orders may be cancelled if payment cannot be processed</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Limitation of Liability</h2>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <p className="text-gray-400 text-body-md leading-relaxed">
                  Elixir Victoria shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services.
                </p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="text-center">
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <h3 className="text-heading-lg font-serif text-white mb-4">Questions About Terms?</h3>
                <p className="text-gray-400 text-body-lg mb-6">
                  If you have any questions about our terms of service, please contact us.
                </p>
                <Link 
                  href="/contact"
                  className="btn-luxury"
                >
                  Contact Us
                </Link>
              </div>
            </motion.section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 