'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlistStore, useCartStore } from '@/lib/store'

export default function WishlistPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <div className="mb-8">
              <Heart size={64} className="mx-auto text-gray-600 mb-4" />
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4">
                Your Wishlist is Empty
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Start building your wishlist by adding products you love from our collection.
              </p>
            </div>
            
            <Link href="/collection">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-luxury text-lg px-12 py-6"
              >
                Explore Collection
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
              Continue Shopping
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4">
              Your Wishlist
            </h1>
            <p className="text-lg text-gray-400">
              {items.length} item{items.length !== 1 ? 's' : ''} in your wishlist
            </p>
          </div>

          {/* Wishlist Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {items.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group relative bg-gray-800 border border-gray-700 rounded-sm overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-800 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product)}
                      className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                      title="Add to cart"
                    >
                      <ShoppingBag size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(product.id)}
                      className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors duration-300"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>

                  {/* Wishlist Badge */}
                  <div className="absolute top-4 right-4">
                    <Heart size={20} className="text-red-500 fill-current" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col h-full">
                  {/* Category */}
                  <p className="text-sm text-yellow-500 font-medium mb-2">
                    {product.category}
                  </p>

                  {/* Product Name */}
                  <h3 className="text-xl font-serif font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300 mb-2">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-4">
                    {product.shortDescription}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-semibold text-white">₦{product.price.toLocaleString()}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product)}
                      className="bg-yellow-500 text-black px-4 py-2 text-sm font-medium hover:bg-yellow-400 transition-colors duration-300"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collection">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury text-lg px-12 py-6"
                >
                  Continue Shopping
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearWishlist}
                className="bg-transparent border border-gray-600 text-white px-12 py-6 text-lg font-medium hover:bg-gray-700 transition-colors duration-300"
              >
                Clear Wishlist
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 