'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Instagram, Phone, Mail, MessageCircle } from 'lucide-react'

export function Footer() {
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
    hidden: { opacity: 0, y: 20 },
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
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-400 text-body-md mb-8 max-w-md">
              Discover the finest luxury fragrances and body care products, crafted with rare ingredients and unparalleled artistry. Each piece tells a story of sophistication and timeless elegance.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Instagram size={20} className="text-yellow-500" />
                <a 
                  href="https://instagram.com/elixirvictoria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  @elixirvictoria
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-yellow-500" />
                <a 
                  href="tel:+2347048928368"
                  className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  +234 704 892 8368
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <MessageCircle size={20} className="text-yellow-500" />
                <a 
                  href="https://wa.me/2347048928368"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  WhatsApp
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-yellow-500" />
                <a 
                  href="mailto:info@elixirvictoria.com"
                  className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
                >
                  info@elixirvictoria.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-heading-sm font-serif text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/collection" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/brand-story" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  Wishlist
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants}>
            <h3 className="text-heading-sm font-serif text-white mb-6">Customer Service</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/care-instructions" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-body-sm">
            © {new Date().getFullYear()} Elixir Victoria. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-body-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 text-body-sm">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 