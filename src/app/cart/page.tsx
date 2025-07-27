'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag, CreditCard } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function CartPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { items, removeItem, updateQuantity, getSubtotal, getTotal, clearCart } = useCartStore()
  const subtotal = getSubtotal()
  const total = getTotal()
  const shipping = subtotal > 200 ? 0 : 15
  const tax = subtotal * 0.08

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
              <ShoppingBag size={64} className="mx-auto text-gray-600 mb-4" />
              <h1 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Discover our luxury collection and add some exquisite products to your cart.
              </p>
            </div>
            
            <Link href="/collection">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-luxury text-lg px-12 py-6"
              >
                Start Shopping
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
              Shopping Cart
            </h1>
            <p className="text-lg text-gray-400">
              {items.length} item{items.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="space-y-6"
              >
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="bg-gray-800 border border-gray-700 rounded-sm p-6"
                  >
                    <div className="flex items-start space-x-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 bg-gray-700 rounded-sm overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-serif font-semibold text-white mb-2">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {item.product.category}
                        </p>
                        {item.size && (
                          <p className="text-gray-400 text-sm mb-4">
                            Size: {item.size}
                          </p>
                        )}
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-700 text-white rounded-sm hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-white font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-700 text-white rounded-sm hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl font-semibold text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-gray-400 text-sm">
                          ${item.product.price} each
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                variants={itemVariants}
                className="bg-gray-800 border border-gray-700 rounded-sm p-6 sticky top-24"
              >
                <h2 className="text-2xl font-serif font-semibold text-white mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-white font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href="/checkout" className="w-full btn-luxury py-4 flex items-center justify-center">
                    <CreditCard size={20} className="mr-2" />
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full bg-transparent border border-gray-600 text-white px-6 py-4 font-medium hover:bg-gray-700 transition-colors duration-300"
                  >
                    Clear Cart
                  </button>
                </div>

                {subtotal < 200 && (
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-sm">
                    <p className="text-yellow-500 text-sm">
                      Add ${(200 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 