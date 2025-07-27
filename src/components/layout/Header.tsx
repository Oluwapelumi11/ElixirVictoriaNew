'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, User, Heart, ShoppingBag, ArrowRight, LogOut } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { CartAnimation } from '@/components/ui/CartAnimation'
import { MobileCartToast } from '@/components/ui/MobileCartToast'
import { useCartStore, useWishlistStore, useUserStore, useUIStore } from '@/lib/store'
import { products, convertToProduct } from '@/data/products'

// Fuzzy search function (same as CollectionPage)
const fuzzySearch = (query: string, text: string): boolean => {
  if (!query) return true
  
  const normalizedQuery = query.toLowerCase().trim()
  const normalizedText = text.toLowerCase()
  
  // Exact match
  if (normalizedText.includes(normalizedQuery)) return true
  
  // Partial word match
  const queryWords = normalizedQuery.split(/\s+/)
  return queryWords.every(word => normalizedText.includes(word))
}

// Search function that checks multiple fields
const searchProduct = (product: any, query: string): boolean => {
  if (!query) return true
  
  const searchableFields = [
    product.name,
    product.description,
    product.category,
    ...product.tags,
    product.price.toString(),
    product.originalPrice?.toString() || '',
  ]
  
  return searchableFields.some(field => fuzzySearch(query, field))
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const { getTotalItems: getCartCount } = useCartStore()
  const { getTotalItems: getWishlistCount } = useWishlistStore()
  const { user, isAuthenticated, logout } = useUserStore()
  const { isCartAnimating } = useUIStore()

  const cartCount = getCartCount()
  const wishlistCount = getWishlistCount()

  // Filter products based on search query
  const searchResults = searchQuery
    ? products.filter(product => searchProduct(product, searchQuery)).slice(0, 6) // Limit to 6 results
    : []

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to collection page with search query
      window.location.href = `/collection?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/collection"
              className="text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
            >
              Collection
            </Link>
            <Link
              href="/brand-story"
              className="text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
            >
              Our Story
            </Link>
            <Link
              href="/bespoke"
              className="text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
            >
              Custom Signature
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
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
              className="text-white hover:text-yellow-500 transition-colors duration-300 relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm hidden md:block">
                  Hi, {user?.firstName || user?.email}
                </span>
                <Link
                  href="/account"
                  className="text-white hover:text-yellow-500 transition-colors duration-300"
                  aria-label="Account"
                >
                  <User size={20} />
                </Link>
                <button
                  onClick={logout}
                  className="text-white hover:text-yellow-500 transition-colors duration-300"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-white hover:text-yellow-500 transition-colors duration-300"
                aria-label="Login"
              >
                <User size={20} />
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="text-white hover:text-yellow-500 transition-colors duration-300 relative"
              aria-label="Shopping Cart"
            >
              <motion.div
                animate={isCartAnimating ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <ShoppingBag size={20} />
              </motion.div>
              {cartCount > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  animate={isCartAnimating ? { scale: [1, 1.3, 1], backgroundColor: ['#EAB308', '#FCD34D', '#EAB308'] } : {}}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  {cartCount}
                </motion.span>
              )}
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
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 p-4"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products, descriptions, categories, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
                >
                  <ArrowRight size={20} />
                </button>
              </form>

              {/* Search Results */}
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400 mb-3">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                      </p>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/collection?search=${encodeURIComponent(product.name)}`}
                            onClick={handleSearchClose}
                            className="flex items-center space-x-3 p-3 bg-gray-800 rounded-sm hover:bg-gray-700 transition-colors duration-300"
                          >
                            <div className="w-12 h-12 bg-gray-700 rounded-sm flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium truncate">{product.name}</h4>
                              <p className="text-gray-400 text-sm truncate">{product.category}</p>
                            </div>
                            <div className="text-yellow-500 font-semibold">₦{product.price.toLocaleString()}</div>
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-gray-700">
                        <Link
                          href={`/collection?search=${encodeURIComponent(searchQuery)}`}
                          onClick={handleSearchClose}
                          className="text-yellow-500 hover:text-yellow-400 text-sm font-medium"
                        >
                          View all results →
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-400 text-sm">No products found for "{searchQuery}"</p>
                      <Link
                        href="/collection"
                        onClick={handleSearchClose}
                        className="text-yellow-500 hover:text-yellow-400 text-sm font-medium mt-2 inline-block"
                      >
                        Browse all products
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900 border-t border-gray-800 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Mobile Navigation */}
              <nav className="space-y-4 mb-8">
                <Link
                  href="/collection"
                  className="block text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Collection
                </Link>
                <Link
                  href="/brand-story"
                  className="block text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Story
                </Link>
                <Link
                  href="/bespoke"
                  className="block text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Custom Signature
                </Link>
                <Link
                  href="/contact"
                  className="block text-white hover:text-yellow-500 transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
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
                  className="text-white hover:text-yellow-500 transition-colors duration-300 relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {wishlistCount}
                    </span>
                  )}
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
                  <motion.div
                    animate={isCartAnimating ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <ShoppingBag size={20} />
                  </motion.div>
                  {cartCount > 0 && (
                    <motion.span 
                      className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                      animate={isCartAnimating ? { scale: [1, 1.3, 1], backgroundColor: ['#EAB308', '#FCD34D', '#EAB308'] } : {}}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cart Animation */}
      <CartAnimation />
      <MobileCartToast />
    </header>
  )
} 