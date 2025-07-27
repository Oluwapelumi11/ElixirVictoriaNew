'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, Package, Clock, CheckCircle, Truck, Home } from 'lucide-react'
import Image from 'next/image'

interface Order {
  id: number
  order_number: string
  customer_name: string
  customer_email: string
  status: string
  total: number
  created_at: string
  items: any[]
  status_history: any[]
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock size={20} className="text-yellow-500" />
    case 'paid':
      return <CheckCircle size={20} className="text-green-500" />
    case 'processing':
      return <Package size={20} className="text-blue-500" />
    case 'shipped':
      return <Truck size={20} className="text-purple-500" />
    case 'delivered':
      return <Home size={20} className="text-green-500" />
    default:
      return <Package size={20} className="text-gray-500" />
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Payment Pending'
    case 'paid':
      return 'Payment Confirmed'
    case 'processing':
      return 'Processing Order'
    case 'shipped':
      return 'Shipped'
    case 'delivered':
      return 'Delivered'
    case 'cancelled':
      return 'Cancelled'
    case 'refunded':
      return 'Refunded'
    default:
      return status
  }
}

export default function TrackOrderPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError('')
    setHasSearched(true)

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '/api'
      const response = await fetch(`${backendUrl}/orders/email/${encodeURIComponent(email.trim())}`)

      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to find orders')
        setOrders([])
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      setOrders([])
    } finally {
      setIsLoading(false)
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
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-heading-xl font-serif text-white mb-6">
              Track Your Order
            </h1>
            <p className="text-body-lg text-gray-400 max-w-2xl mx-auto">
              Enter your email address to track your orders and view their current status.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-white text-body-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-luxury w-full h-14 pl-10"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-luxury w-full h-14 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={22} className="mr-3" />
                      Track Orders
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Results */}
          {hasSearched && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {error && (
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-6">
                    <p className="text-red-400 text-body-md">{error}</p>
                  </div>
                </motion.div>
              )}

              {orders.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h2 className="text-heading-lg font-serif text-white mb-6">
                    Your Orders ({orders.length})
                  </h2>
                  
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <motion.div
                        key={order.id}
                        variants={itemVariants}
                        className="bg-gray-800 border border-gray-700 rounded-sm p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-white font-medium text-lg">
                              Order #{order.order_number}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Placed on {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-yellow-500 font-medium text-lg">
                              ₦{order.total.toLocaleString()}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              {getStatusIcon(order.status)}
                              <span className="text-gray-400 text-sm">
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status Timeline */}
                        <div className="border-t border-gray-700 pt-4">
                          <h4 className="text-white font-medium mb-3">Order Timeline</h4>
                          <div className="space-y-2">
                            {order.status_history?.map((status, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <div>
                                  <p className="text-white text-sm">{status.status}</p>
                                  <p className="text-gray-400 text-xs">
                                    {new Date(status.created_at).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {!error && orders.length === 0 && hasSearched && (
                <motion.div variants={itemVariants}>
                  <div className="bg-gray-800 border border-gray-700 rounded-sm p-8 text-center">
                    <Package size={64} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-white font-medium text-lg mb-2">No Orders Found</h3>
                    <p className="text-gray-400 text-body-md">
                      No orders found for this email address. Please check your email or contact support.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 