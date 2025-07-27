'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Lock, Users } from 'lucide-react'

export default function PrivacyPage() {
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
              Privacy Policy
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
                <Shield size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Information We Collect</h2>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <p className="text-gray-400 text-body-md leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Personal information (name, email, phone number)</li>
                  <li>• Shipping and billing addresses</li>
                  <li>• Payment information (processed securely)</li>
                  <li>• Order history and preferences</li>
                  <li>• Communication records</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Eye size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">How We Use Your Information</h2>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <ul className="space-y-2 text-gray-400">
                  <li>• Process and fulfill your orders</li>
                  <li>• Provide customer support</li>
                  <li>• Send order confirmations and updates</li>
                  <li>• Improve our products and services</li>
                  <li>• Send marketing communications (with consent)</li>
                  <li>• Comply with legal obligations</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Lock size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Data Security</h2>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <p className="text-gray-400 text-body-md leading-relaxed">
                  We implement industry-standard security measures to protect your personal information. This includes encryption, secure servers, and regular security audits.
                </p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Users size={24} className="text-yellow-500" />
                <h2 className="text-heading-lg font-serif text-white">Your Rights</h2>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                <ul className="space-y-2 text-gray-400">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate data</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Lodge a complaint with authorities</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="text-center">
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <h3 className="text-heading-lg font-serif text-white mb-4">Questions About Privacy?</h3>
                <p className="text-gray-400 text-body-lg mb-6">
                  If you have any questions about our privacy practices, please contact us.
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