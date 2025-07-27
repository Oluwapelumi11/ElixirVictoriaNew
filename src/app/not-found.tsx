'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <Logo size="md" />
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-yellow-500 mb-4">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed max-w-md mx-auto">
            The page you're looking for doesn't exist. It may have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury text-lg px-8 py-4 flex items-center space-x-2"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </motion.button>
          </Link>

          <Link href="/collection">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury-ghost text-lg px-8 py-4 flex items-center space-x-2"
            >
              <Search size={20} />
              <span>Browse Collection</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Floating Elements */}
          <div className="absolute left-10 top-1/4 w-2 h-2 bg-yellow-500 rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute right-1/4 bottom-1/3 w-1 h-1 bg-yellow-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute left-1/3 bottom-1/4 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-50 animate-float" style={{ animationDelay: '5s' }} />
          
          {/* Luxury Elements */}
          <div className="absolute right-10 top-1/4 w-32 h-64 opacity-10">
            <div className="w-full h-full bg-gradient-to-b from-yellow-500 to-transparent rounded-full blur-sm" />
          </div>
          <div className="absolute left-20 top-1/3 w-16 h-16 border border-yellow-500/20 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        </motion.div>
      </div>
    </div>
  )
} 