'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Search, Filter, Heart, Eye, ShoppingBag, Star } from 'lucide-react'
import { products, type SimpleProduct, convertToProduct } from '@/data/products'
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store'
import { useSearchParams } from 'next/navigation'

const categories = [
  { name: 'All Products', value: 'all' },
  { name: 'Fragrances', value: 'Fragrance' },
  { name: 'Body Care', value: 'Body Care' },
]

// Fuzzy search function
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
const searchProduct = (product: SimpleProduct, query: string): boolean => {
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

export function CollectionPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const searchParams = useSearchParams()
  const urlSearchQuery = searchParams.get('search')

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery || '')
  const [sortBy, setSortBy] = useState('featured')

  // Update search query when URL parameter changes
  useEffect(() => {
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery)
    }
  }, [urlSearchQuery])

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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
        const matchesSearch = searchProduct(product, searchQuery)
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'name':
            return a.name.localeCompare(b.name)
          case 'newest':
            return b.isNew ? 1 : -1
          default:
            return b.isFeatured ? 1 : -1
        }
      })
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Back Button */}
            <Link href="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mb-8">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>

            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-6">
              Our Collection
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              Discover our complete range of luxury fragrances and body care products, each crafted with the finest ingredients and unparalleled attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products, descriptions, categories, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
              />
              {searchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors duration-300"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </motion.div>

          {/* Search Results Info */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-gray-400"
            >
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <div className="text-gray-400 text-lg mb-4">
                {searchQuery ? `No products found for "${searchQuery}"` : 'No products found'}
              </div>
              <p className="text-gray-500 mb-6">
                {searchQuery ? 'Try adjusting your search terms or browse all categories' : 'Try adjusting your search or filter criteria'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Discover More
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Explore our complete range of luxury beauty and wellness products, each crafted with the finest ingredients and unparalleled attention to detail.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/brand-story">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury text-lg px-12 py-6"
                >
                  Our Story
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury-ghost text-lg px-12 py-6"
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

interface ProductCardProps {
  product: SimpleProduct
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { openCart } = useUIStore()

  const productData = convertToProduct(product)
  const isInWishlistItem = isInWishlist(productData.id)

  const handleAddToCart = () => {
    addToCart(productData)
    openCart()
    console.log(`Added ${product.name} to cart`)
  }

  const handleWishlistToggle = () => {
    if (isInWishlistItem) {
      removeFromWishlist(productData.id)
      console.log(`Removed ${product.name} from wishlist`)
    } else {
      addToWishlist(productData)
      console.log(`Added ${product.name} to wishlist`)
    }
  }

  const handleViewZoom = () => {
    setIsZoomed(!isZoomed)
    console.log(`${isZoomed ? 'Zoomed out' : 'Zoomed in'} on ${product.name}`)
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
    <motion.div
      variants={itemVariants}
      className="group relative bg-gray-800 border border-gray-700 rounded-sm overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-yellow-500/20 to-yellow-200/10 overflow-hidden">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-125' : 'scale-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {product.isNew && (
            <span className="bg-yellow-500 text-black text-xs font-medium px-2 py-1">NEW</span>
          )}
          {product.isFeatured && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1">FEATURED</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <Link href={`/product/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-colors duration-300"
              title="View Details"
            >
              <Eye size={20} />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className={`p-3 rounded-full transition-colors duration-300 ${
              isInWishlistItem 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-yellow-500 text-black hover:bg-yellow-400'
            }`}
            title={isInWishlistItem ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={20} className={isInWishlistItem ? 'fill-current' : ''} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-colors duration-300"
            title="Add to cart"
          >
            <ShoppingBag size={20} />
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-yellow-500 text-sm font-medium">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-500 fill-current" />
              <span className="text-sm text-gray-400">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
          </div>
          <h3 className="text-xl font-serif font-semibold text-white mb-2 group-hover:text-yellow-500 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-semibold text-white">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-yellow-500 text-black px-4 py-2 text-sm font-medium hover:bg-yellow-400 transition-colors duration-300"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
} 