'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone, ShoppingBag, CheckCircle, Plus } from 'lucide-react'
import { useCartStore, useUserStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface CheckoutForm {
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address_id?: string
  billing_address_id?: string
  notes: string
  // Shipping address fields for guests
  shipping_address_line1: string
  shipping_address_line2: string
  shipping_city: string
  shipping_state: string
  shipping_country: string
  website?: string // honeypot
}

interface UserAddress {
  id: number
  type: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
}

export default function CheckoutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { items, getSubtotal, getTotal, clearCart } = useCartStore()
  const { user, isAuthenticated, token } = useUserStore()
  const router = useRouter()

  const [formData, setFormData] = useState<CheckoutForm>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: '',
    // Initialize shipping address fields for guests
    shipping_address_line1: '',
    shipping_address_line2: '',
    shipping_city: '',
    shipping_state: '',
    shipping_country: '',
    website: '' // honeypot
  })

  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [orderCreated, setOrderCreated] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState('')
  const [addressesLoaded, setAddressesLoaded] = useState(false)

  const subtotal = getSubtotal()
  const total = subtotal

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  // Pre-fill user details when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        customer_name: `${user.firstName} ${user.lastName}`,
        customer_email: user.email,
        customer_phone: user.phone || ''
      }))
    }
  }, [isAuthenticated, user])

  // Load user addresses if authenticated
  useEffect(() => {
    console.log('Checkout auth state:', { isAuthenticated, user, token })
    if (isAuthenticated && token) {
      loadUserAddresses()
    }
  }, [isAuthenticated, token])

  // Auto-select first shipping address for logged-in users
  useEffect(() => {
    if (isAuthenticated && userAddresses.length > 0 && !formData.shipping_address_id) {
      const firstShippingAddress = userAddresses.find(addr => addr.type === 'shipping')
      if (firstShippingAddress) {
        setFormData(prev => ({
          ...prev,
          shipping_address_id: firstShippingAddress.id.toString()
        }))
      }
    }
  }, [userAddresses, isAuthenticated, formData.shipping_address_id])

  const loadUserAddresses = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '/api'
      const response = await fetch(`${backendUrl}/addresses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      console.log('Address response:', response.status, response.ok)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Address data:', data)
        setUserAddresses(data.addresses || [])
      } else {
        console.log('Address response not ok:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Failed to load addresses:', error)
    } finally {
      setAddressesLoaded(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateOrder = async () => {
    if (formData.website) {
      setError('Bot detected. Submission blocked.')
      return
    }
    // For guests, validate all required fields
    if (!isAuthenticated) {
      if (!formData.customer_name || !formData.customer_email) {
        setError('Please fill in your name and email')
        return
      }

      if (!formData.shipping_address_line1 || !formData.shipping_city || !formData.shipping_state || !formData.shipping_country) {
        setError('Please fill in all required shipping address fields')
        return
      }
    } else {
      // For authenticated users, validate shipping address selection
      if (!formData.shipping_address_id) {
        setError('Please select a shipping address option')
        return
      }

      if (formData.shipping_address_id === 'manual') {
        if (!formData.shipping_address_line1 || !formData.shipping_city || !formData.shipping_state || !formData.shipping_country) {
          setError('Please fill in all required shipping address fields')
          return
        }
      }
    }

    setIsLoading(true)
    setError('')

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '/api'
      const response = await fetch(`${backendUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          customer_email: formData.customer_email,
          customer_name: formData.customer_name,
          customer_phone: formData.customer_phone,
          items: items.map(item => ({
            product: item.product,
            quantity: item.quantity
          })),
          subtotal,
          total,
          shipping_address_id: formData.shipping_address_id,
          billing_address_id: formData.billing_address_id,
          notes: formData.notes,
          // Include shipping address for guests
          shipping_address_line1: formData.shipping_address_line1,
          shipping_address_line2: formData.shipping_address_line2,
          shipping_city: formData.shipping_city,
          shipping_state: formData.shipping_state,
          shipping_country: formData.shipping_country
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Initialize payment
        await initializePayment(data.order.id)
      } else {
        setError(data.message || 'Failed to create order')
      }
    } catch (err) {
      setError('Failed to create order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const initializePayment = async (orderId: number) => {
    setIsProcessing(true)
    setError('')

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '/api'
      const response = await fetch(`${backendUrl}/payments/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          email: formData.customer_email,
          amount: total,
          callback_url: `${window.location.origin}/payment/verify`
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setPaymentUrl(data.authorization_url)
        // Redirect to Paystack
        window.location.href = data.authorization_url
      } else {
        setError(data.message || 'Failed to initialize payment')
      }
    } catch (err) {
      setError('Payment initialization failed. Please try again.')
    } finally {
      setIsProcessing(false)
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

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="mb-12">
            <Link href="/cart" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-heading-xl font-serif text-white mb-6">
              Checkout
            </h1>
            <p className="text-body-lg text-gray-400">
              Complete your purchase with secure payment via Paystack. You'll be contacted for shipping details and fees after order confirmation. No account required - just provide your email to track your order.
            </p>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Order Summary */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <h2 className="text-heading-lg font-serif text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-sm">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.product.name}</h3>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">₦{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t border-gray-700 pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium border-t border-gray-700 pt-3">
                    <span className="text-white">Total</span>
                    <span className="text-yellow-500">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-sm">
                    <p className="text-yellow-500 text-sm text-center">
                      📞 You'll be contacted for shipping details and fees after order confirmation
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Checkout Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <h2 className="text-heading-lg font-serif text-white mb-6">Customer Information</h2>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 mb-6">
                    <p className="text-red-400 text-body-sm">{error}</p>
                  </div>
                )}

                <form className="space-y-6">
                  {/* Customer Information - Only for guests */}
                  {!isAuthenticated ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="customer_name" className="block text-white text-body-sm font-medium">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="customer_name"
                              name="customer_name"
                              value={formData.customer_name}
                              onChange={handleInputChange}
                              required
                              className="input-luxury w-full h-14 pl-10"
                              placeholder="Your full name"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label htmlFor="customer_email" className="block text-white text-body-sm font-medium">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="email"
                              id="customer_email"
                              name="customer_email"
                              value={formData.customer_email}
                              onChange={handleInputChange}
                              required
                              className="input-luxury w-full h-14 pl-10"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="customer_phone" className="block text-white text-body-sm font-medium">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            id="customer_phone"
                            name="customer_phone"
                            value={formData.customer_phone}
                            onChange={handleInputChange}
                            className="input-luxury w-full h-14 pl-10"
                            placeholder="+234 704 892 8368"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-sm">
                      <div className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-green-500" />
                        <div>
                          <p className="text-green-500 text-sm font-medium">
                            Using your saved information
                          </p>
                          <p className="text-gray-400 text-sm">
                            {user?.firstName} {user?.lastName} • {user?.email}
                            {user?.phone && ` • ${user.phone}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Shipping Address Section */}
                  <div className="space-y-3">
                    <label className="block text-white text-body-sm font-medium">
                      Shipping Address *
                    </label>
                    
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        {addressesLoaded && userAddresses.length > 0 ? (
                          <>
                            <div className="space-y-3">
                              {userAddresses.filter(addr => addr.type === 'shipping').map((address) => (
                                <label key={address.id} className="flex items-start space-x-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="shipping_address_id"
                                    value={address.id.toString()}
                                    checked={formData.shipping_address_id === address.id.toString()}
                                    onChange={handleInputChange}
                                    className="mt-1 text-yellow-500 focus:ring-yellow-500"
                                  />
                                  <div className="flex-1 p-3 bg-gray-700 rounded-sm border border-gray-600 hover:border-yellow-500/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-white text-sm font-medium">
                                          {address.address_line1}
                                        </p>
                                        {address.address_line2 && (
                                          <p className="text-gray-400 text-sm">{address.address_line2}</p>
                                        )}
                                        <p className="text-gray-400 text-sm">
                                          {address.city}, {address.state} {address.postal_code}
                                        </p>
                                        <p className="text-gray-400 text-sm">{address.country}</p>
                                      </div>
                                      {address.is_default && (
                                        <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                                          Default
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </label>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="shipping_address_id"
                                value="manual"
                                checked={formData.shipping_address_id === 'manual'}
                                onChange={handleInputChange}
                                className="text-yellow-500 focus:ring-yellow-500"
                              />
                              <span className="text-gray-400 text-sm">Enter new address manually</span>
                            </div>
                          </>
                        ) : (
                          <div className="p-4 bg-gray-700 rounded-sm">
                            <p className="text-gray-400 text-sm mb-3">No saved addresses found</p>
                            <Link href="/account/addresses/new" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 text-sm">
                              <Plus size={16} className="mr-1" />
                              Add new address
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm mb-4">
                        Please enter your shipping address
                      </p>
                    )}

                    {/* Shipping Address Form - Only show if manual entry selected or guest */}
                    {(!isAuthenticated || formData.shipping_address_id === 'manual') && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="relative">
                            <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="shipping_address_line1"
                              name="shipping_address_line1"
                              value={formData.shipping_address_line1}
                              onChange={handleInputChange}
                              required
                              className="input-luxury w-full h-14 pl-10"
                              placeholder="Address Line 1"
                            />
                          </div>
                          <div className="relative">
                            <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="shipping_address_line2"
                              name="shipping_address_line2"
                              value={formData.shipping_address_line2}
                              onChange={handleInputChange}
                              className="input-luxury w-full h-14 pl-10"
                              placeholder="Address Line 2 (optional)"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="relative">
                            <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="shipping_city"
                              name="shipping_city"
                              value={formData.shipping_city}
                              onChange={handleInputChange}
                              required
                              className="input-luxury w-full h-14 pl-10"
                              placeholder="City"
                            />
                          </div>
                          <div className="relative">
                            <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="shipping_state"
                              name="shipping_state"
                              value={formData.shipping_state}
                              onChange={handleInputChange}
                              required
                              className="input-luxury w-full h-14 pl-10"
                              placeholder="State"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="relative">
                            <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              id="shipping_country"
                              name="shipping_country"
                              value={formData.shipping_country}
                              onChange={handleInputChange}
                              required
                              className="input-luxury w-full h-14 pl-10"
                              placeholder="Country"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="notes" className="block text-white text-body-sm font-medium">
                      Order Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="input-luxury w-full resize-none px-6 py-4"
                      placeholder="Any special instructions or notes..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleCreateOrder}
                      disabled={isLoading || isProcessing}
                      className="btn-luxury w-full h-14 flex items-center justify-center text-body-md font-medium"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Creating Order...
                        </>
                      ) : isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard size={22} className="mr-3" />
                          Proceed to Payment
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Payment powered by{' '}
                    <span className="text-yellow-500 font-medium">Paystack</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 