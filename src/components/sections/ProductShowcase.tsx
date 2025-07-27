'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, ShoppingBag, Check, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { getFeaturedProducts, type SimpleProduct, convertToProduct } from '@/data/products'
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store'

// Get featured products from centralized data
const featuredProducts = getFeaturedProducts()

export function ProductShowcase() {
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
    hidden: { opacity: 0, y: 50 },
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
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-6">
            Curated Collection
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Each piece tells a story of rare ingredients, artisanal craftsmanship, and timeless luxury. Discover products that transcend the ordinary.
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-8 w-full"
        >
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/collection">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury-secondary"
            >
              View Full Collection
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

interface ProductCardProps {
  product: SimpleProduct
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { openCart } = useUIStore()

  const productData = convertToProduct(product)
  const isInWishlistItem = isInWishlist(productData.id)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addToCart(productData)
    openCart()
    console.log(`Added ${product.name} to cart`)
    
    // Reset button state after animation
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in your ${product.name} service. Can you help me get started?`;
    window.open(`https://wa.me/2347048928368?text=${encodeURIComponent(message)}`, '_blank');
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
    hidden: { opacity: 0, y: 50 },
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
      className="group relative flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        minWidth: '300px',
        maxWidth: '400px',
        flex: '1 1 auto'
      }}
    >
      {/* Product Card */}
      <div className="bg-gray-800 border border-gray-700 rounded-sm overflow-hidden hover:border-yellow-500/50 transition-all duration-300 h-full flex flex-col">
        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-yellow-500 text-black text-xs font-medium px-3 py-1">
              NEW
            </span>
          </div>
        )}

        {/* Sold Out Badge */}
        {!product.inStock && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-red-500 text-white text-xs font-medium px-3 py-1">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <div className="w-full h-full bg-gray-800 relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-125' : 'scale-100'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4"
          >
            {product.whatsappOnly ? (
              <Link href="/bespoke">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                  title="View Custom Signature Details"
                >
                  <Eye size={20} />
                </motion.button>
              </Link>
            ) : (
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
            )}
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
            {product.whatsappOnly ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWhatsAppClick}
                className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-300"
                title="Contact via WhatsApp"
              >
                <MessageCircle size={20} />
              </motion.button>
            ) : !product.inStock ? (
              <motion.button
                className="bg-gray-500 text-white p-3 rounded-full cursor-not-allowed"
                title="Sold Out"
                disabled
              >
                <ShoppingBag size={20} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`p-3 rounded-full transition-colors duration-300 ${
                  isAddingToCart 
                    ? 'bg-green-500 text-white cursor-not-allowed' 
                    : 'bg-yellow-500 text-black hover:bg-yellow-400'
                }`}
                title={isAddingToCart ? 'Added to cart!' : 'Add to cart'}
              >
                {isAddingToCart ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Check size={20} />
                  </motion.div>
                ) : (
                  <ShoppingBag size={20} />
                )}
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          {/* Category */}
          <p className="text-sm text-yellow-500 font-medium">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-xl font-serif font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed flex-1">
            {product.description}
          </p>

          {/* Price and Action Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {product.whatsappOnly ? (
                <span className="text-xl font-semibold text-white">Contact for Pricing</span>
              ) : (
                <>
                  <span className="text-xl font-semibold text-white">₦{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                  )}
                </>
              )}
            </div>
            {product.whatsappOnly ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="bg-green-500 text-white px-4 py-2 text-sm font-medium hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </motion.button>
            ) : !product.inStock ? (
              <motion.button
                disabled
                className="bg-gray-500 text-white px-4 py-2 text-sm font-medium cursor-not-allowed"
              >
                Sold Out
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  isAddingToCart 
                    ? 'bg-green-500 text-white cursor-not-allowed' 
                    : 'bg-yellow-500 text-black hover:bg-yellow-400'
                }`}
              >
                {isAddingToCart ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="flex items-center space-x-2"
                  >
                    <Check size={16} />
                    <span>Added!</span>
                  </motion.div>
                ) : (
                  'Add to Cart'
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 