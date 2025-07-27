'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { ArrowLeft, Heart, ShoppingBag, Eye, Star, Clock, Users, Zap, Check, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store'
import { products, convertToProduct } from '@/data/products'
import { useParams, useRouter } from 'next/navigation'
import Head from 'next/head'

export default function ProductDetailPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  const product = products.find(p => p.id === productId)

  const { addItem: addToCart, getTotalItems } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { openCart } = useUIStore()

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  // Redirect WhatsApp-only products to bespoke page
  useEffect(() => {
    if (product?.whatsappOnly) {
      router.push('/bespoke')
    }
  }, [product, router])

  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-heading-xl font-serif text-white mb-6">Product Not Found</h1>
            <Link href="/collection" className="btn-luxury">
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const convertedProduct = convertToProduct(product)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addToCart(convertedProduct, quantity)
    openCart()
    
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
    if (isInWishlist(convertedProduct.id)) {
      removeFromWishlist(convertedProduct.id)
    } else {
      addToWishlist(convertedProduct)
    }
  }

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
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.name,
          image: [product.image],
          description: product.description,
          sku: `ELX-${product.id.toString().padStart(3, '0')}`,
          brand: {
            '@type': 'Brand',
            name: 'Elixir Victoria'
          },
          offers: {
            '@type': 'Offer',
            url: `https://elixirvictoria.com/product/${product.id}`,
            priceCurrency: 'NGN',
            price: product.price,
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviews
          }
        }) }} />
      </Head>
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link href="/collection" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300">
                <ArrowLeft size={20} className="mr-2" />
                Back to Collection
              </Link>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Product Images */}
              <motion.div variants={itemVariants}>
                <div className="relative aspect-square bg-gray-800 rounded-sm overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`Elixir Victoria ${product.name} - Luxury Perfume, Elixir, Fragrance, Scent, Buy Online`}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div variants={itemVariants} className="space-y-8">
                {/* Basic Info */}
                <div>
                  <h1 className="text-heading-xl font-serif text-white mb-4">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-body-sm">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mb-6">
                    {product.whatsappOnly ? (
                      <span className="text-heading-lg font-serif text-yellow-500">
                        Contact for Pricing
                      </span>
                    ) : (
                      <>
                        <span className="text-heading-lg font-serif text-yellow-500">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-gray-400 line-through">
                            ₦{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <p className="text-body-lg text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Product Details */}
                {(product.fragranceFamily || product.ingredients) && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <h2 className="text-heading-lg font-serif text-white">
                      {product.fragranceFamily ? 'Fragrance Details' : 'Product Details'}
                    </h2>
                    
                    {/* Fragrance Details */}
                    {product.fragranceFamily && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Fragrance Family */}
                          <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                            <h3 className="text-white font-medium mb-3">Fragrance Family</h3>
                            <div className="flex flex-wrap gap-2">
                              {product.fragranceFamily.map((family) => (
                                <span
                                  key={family}
                                  className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-sm rounded-full border border-yellow-500/30"
                                >
                                  {family}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Scent Type */}
                          {product.scentType && (
                            <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                              <h3 className="text-white font-medium mb-3">Scent Type</h3>
                              <p className="text-gray-300">{product.scentType}</p>
                            </div>
                          )}
                        </div>

                        {/* Key Notes */}
                        {product.keyNotes && (
                          <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                            <h3 className="text-white font-medium mb-4">Key Notes</h3>
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-yellow-500 font-medium mb-2">Top Notes</h4>
                                <div className="flex flex-wrap gap-2">
                                  {product.keyNotes.top.map((note) => (
                                    <span
                                      key={note}
                                      className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30"
                                    >
                                      {note}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-yellow-500 font-medium mb-2">Middle Notes</h4>
                                <div className="flex flex-wrap gap-2">
                                  {product.keyNotes.middle.map((note) => (
                                    <span
                                      key={note}
                                      className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-500/30"
                                    >
                                      {note}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-yellow-500 font-medium mb-2">Base Notes</h4>
                                <div className="flex flex-wrap gap-2">
                                  {product.keyNotes.base.map((note) => (
                                    <span
                                      key={note}
                                      className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full border border-amber-500/30"
                                    >
                                      {note}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Occasions */}
                        {product.occasion && (
                          <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                            <h3 className="text-white font-medium mb-3">Perfect For</h3>
                            <div className="flex flex-wrap gap-2">
                              {product.occasion.map((occasion) => (
                                <span
                                  key={occasion}
                                  className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                                >
                                  {occasion}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Body Care Details */}
                    {product.ingredients && (
                      <>
                        {/* Ingredients */}
                        <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                          <h3 className="text-white font-medium mb-3">Key Ingredients</h3>
                          <div className="flex flex-wrap gap-2">
                            {product.ingredients.map((ingredient) => (
                              <span
                                key={ingredient}
                                className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Benefits */}
                        {product.benefits && (
                          <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                            <h3 className="text-white font-medium mb-3">Benefits</h3>
                            <div className="flex flex-wrap gap-2">
                              {product.benefits.map((benefit) => (
                                <span
                                  key={benefit}
                                  className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                                >
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skin Type */}
                        {product.skinType && (
                          <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                            <h3 className="text-white font-medium mb-3">Suitable For</h3>
                            <div className="flex flex-wrap gap-2">
                              {product.skinType.map((type) => (
                                <span
                                  key={type}
                                  className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-500/30"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Usage Instructions */}
                        {product.usage && (
                          <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                            <h3 className="text-white font-medium mb-3">How to Use</h3>
                            <p className="text-gray-300 leading-relaxed mb-3">{product.usage}</p>
                            {product.frequency && (
                              <p className="text-gray-400 text-sm">
                                <strong>Frequency:</strong> {product.frequency}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Key Features */}
                        {product.keyFeatures && (
                          <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                            <h3 className="text-white font-medium mb-3">Key Features</h3>
                            <ul className="space-y-2">
                              {product.keyFeatures.map((feature) => (
                                <li key={feature} className="text-gray-300 flex items-start">
                                  <span className="text-yellow-500 mr-2">•</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Results */}
                        {product.results && (
                          <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                            <h3 className="text-white font-medium mb-3">Expected Results</h3>
                            <ul className="space-y-2">
                              {product.results.map((result) => (
                                <li key={result} className="text-gray-300 flex items-start">
                                  <span className="text-green-500 mr-2">✓</span>
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {/* Product Specifications */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {product.volume && (
                        <div className="bg-gray-800 border border-gray-700 rounded-sm p-4 text-center">
                          <h4 className="text-white font-medium mb-2">Volume</h4>
                          <p className="text-gray-300">{product.volume}</p>
                        </div>
                      )}
                      {product.gender && (
                        <div className="bg-gray-800 border border-gray-700 rounded-sm p-4 text-center">
                          <h4 className="text-white font-medium mb-2">Gender</h4>
                          <p className="text-gray-300">{product.gender}</p>
                        </div>
                      )}
                      {product.longevity && (
                        <div className="bg-gray-800 border border-gray-700 rounded-sm p-4 text-center">
                          <h4 className="text-white font-medium mb-2">Longevity</h4>
                          <p className="text-gray-300">{product.longevity}</p>
                        </div>
                      )}
                    </div>

                    {/* Long Description */}
                    {product.longDescription && (
                      <div className="bg-gray-800 border border-gray-700 rounded-sm p-6">
                        <h3 className="text-white font-medium mb-3">
                          {product.fragranceFamily ? 'About This Fragrance' : 'About This Product'}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {product.longDescription}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Add to Cart Section */}
                <motion.div variants={itemVariants} className="space-y-6">
                  {!product.whatsappOnly && product.inStock && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-700 rounded-sm">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2 text-white hover:text-yellow-500 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-white border-x border-gray-700">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2 text-white hover:text-yellow-500 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    {product.whatsappOnly ? (
                      <button
                        onClick={handleWhatsAppClick}
                        className="flex-1 flex items-center justify-center bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 py-4 px-6 rounded-sm"
                      >
                        <MessageCircle size={20} className="mr-2" />
                        Contact via WhatsApp
                      </button>
                    ) : !product.inStock ? (
                      <button
                        disabled
                        className="flex-1 flex items-center justify-center bg-gray-500 text-white cursor-not-allowed py-4 px-6 rounded-sm"
                      >
                        Sold Out
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                        className={`flex-1 flex items-center justify-center ${
                          isAddingToCart 
                            ? 'bg-green-500 text-white cursor-not-allowed' 
                            : 'btn-luxury'
                        }`}
                      >
                        {isAddingToCart ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="flex items-center"
                          >
                            <Check size={20} className="mr-2" />
                            Added!
                          </motion.div>
                        ) : (
                          <>
                            <ShoppingBag size={20} className="mr-2" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    )}
                    <button
                      onClick={handleWishlistToggle}
                      className={`p-4 border rounded-sm transition-colors ${
                        isInWishlist(convertedProduct.id)
                          ? 'border-red-500 text-red-500 hover:bg-red-500/10'
                          : 'border-gray-600 text-gray-400 hover:border-yellow-500 hover:text-yellow-500'
                      }`}
                    >
                      <Heart size={20} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
} 