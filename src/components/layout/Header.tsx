'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Heart,
  ChevronDown 
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigation = [
    { name: 'Collection', href: '/collection' },
    { name: 'Brand Story', href: '/brand-story' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          <Link href="/" className="flex  justify-start items-start flex-shrink-0">
            <Logo size="md" className="w-full  h-full"/>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-8 mx-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-yellow-500 transition-colors duration-300 font-medium tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions - Right side */}
          <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-yellow-500 transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="text-white hover:text-yellow-500 transition-colors duration-300"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="text-white hover:text-yellow-500 transition-colors duration-300"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="text-white hover:text-yellow-500 transition-colors duration-300 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button - Right side */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-yellow-500 transition-colors duration-300 flex-shrink-0 ml-auto"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 bg-gray-800 border-b border-gray-600 p-4"
          >
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search our collection..."
                  className="w-full bg-black border border-gray-600 text-white px-12 py-3 focus:border-yellow-500 focus:outline-none transition-colors duration-300"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden bg-gray-800 border-b border-gray-600 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Navigation */}
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="flex items-center space-x-6 pt-6 border-t border-gray-600">
                <button
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen)
                    setIsMenuOpen(false)
                  }}
                  className="text-white hover:text-yellow-500 transition-colors duration-300"
                >
                  <Search size={20} />
                </button>
                <Link
                  href="/wishlist"
                  className="text-white hover:text-yellow-500 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={20} />
                </Link>
                <Link
                  href="/account"
                  className="text-white hover:text-yellow-500 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                </Link>
                <Link
                  href="/cart"
                  className="text-white hover:text-yellow-500 transition-colors duration-300 relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag size={20} />
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    0
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 