'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

// Mock product data - replace with actual data from API
const featuredProducts = [
  {
    id: 1,
    name: 'Victoria Nocturne',
    description: 'A mysterious blend of oud, vanilla, and rare spices',
    price: 850,
    originalPrice: 950,
    image: '/images/products/victoria-nocturne.jpg',
    category: 'Fragrance',
    isNew: true,
  },
  {
    id: 2,
    name: 'Luxury Body Scrub',
    description: 'Exfoliating scrub with Himalayan salt and essential oils',
    price: 120,
    originalPrice: 140,
    image: '/images/products/luxury-body-scrub.jpg',
    category: 'Body Care',
    isNew: false,
  },
  {
    id: 3,
    name: 'Elixir Royal',
    description: 'Regal rose and jasmine with hints of amber',
    price: 1200,
    originalPrice: 1200,
    image: '/images/products/elixir-royal.jpg',
    category: 'Fragrance',
    isNew: true,
  },
  {
    id: 4,
    name: 'Silk Body Oil',
    description: 'Nourishing body oil with argan and jojoba',
    price: 95,
    originalPrice: 110,
    image: '/images/products/silk-body-oil.jpg',
    category: 'Body Care',
    isNew: false,
  },
]

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
  product: {
    id: number
    name: string
    description: string
    price: number
    originalPrice: number
    image: string
    category: string
    isNew: boolean
  }
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

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
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Card */}
      <div className="card-luxury p-6 hover-lift">
        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-yellow-500 text-black text-xs font-medium px-3 py-1">
              NEW
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative aspect-product mb-6 overflow-hidden">
          <div className="w-full h-full bg-gray-800 rounded-sm">
            {/* Placeholder for product image */}
            <div className="w-full h-full bg-gradient-to-br from-yellow-500/20 to-yellow-200/10 flex items-center justify-center">
              <div className="text-yellow-500 text-4xl font-serif">
                {product.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-colors duration-300"
            >
              <Eye size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-colors duration-300"
            >
              <Heart size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition-colors duration-300"
            >
              <ShoppingBag size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          {/* Category */}
          <p className="text-sm text-yellow-500 font-medium">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-lg font-serif font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-xl font-semibold text-white">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 