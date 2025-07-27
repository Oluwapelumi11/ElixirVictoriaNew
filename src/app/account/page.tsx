'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, User, MapPin, Plus, Edit, Trash2, LogOut } from 'lucide-react'
import { useUserStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

interface Address {
  id: string
  type: 'shipping' | 'billing'
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
}

export default function AccountPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { user, isAuthenticated, logout, token } = useUserStore()
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Load user addresses
  useEffect(() => {
    if (isAuthenticated && user) {
      loadAddresses()
    }
  }, [isAuthenticated, user])

  const loadAddresses = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
      const response = await fetch(`${backendUrl}/api/addresses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAddresses(data.addresses)
      }
    } catch (error) {
      console.error('Failed to load addresses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!isAuthenticated) {
    return null
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
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-heading-xl font-serif text-white mb-6">
              My Account
            </h1>
            <p className="text-body-lg text-gray-400">
              Manage your profile, addresses, and preferences.
            </p>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Profile Section */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <User size={24} className="text-yellow-500" />
                  <h2 className="text-heading-lg font-serif text-white">Profile Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-body-sm mb-1">Name</label>
                    <p className="text-white text-body-md">{user?.firstName} {user?.lastName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-body-sm mb-1">Email</label>
                    <p className="text-white text-body-md">{user?.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-body-sm mb-1">Member Since</label>
                    <p className="text-white text-body-md">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="btn-luxury-ghost w-full flex items-center justify-center"
                  >
                    <LogOut size={20} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Addresses Section */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <MapPin size={24} className="text-yellow-500" />
                    <h2 className="text-heading-lg font-serif text-white">Saved Addresses</h2>
                  </div>
                  <Link
                    href="/account/addresses/new"
                    className="btn-luxury flex items-center"
                  >
                    <Plus size={20} className="mr-2" />
                    Add Address
                  </Link>
                </div>

                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
                    <p className="text-gray-400 mt-2">Loading addresses...</p>
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border border-gray-700 rounded-sm p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-yellow-500 text-xs font-medium uppercase">
                                {address.type}
                              </span>
                              {address.is_default && (
                                <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-white text-body-sm">
                              {address.address_line1}
                              {address.address_line2 && (
                                <span className="block text-gray-400">{address.address_line2}</span>
                              )}
                            </p>
                            <p className="text-gray-400 text-body-sm">
                              {address.city}, {address.state} {address.postal_code}
                            </p>
                            <p className="text-gray-400 text-body-sm">{address.country}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-yellow-500 transition-colors duration-300">
                              <Edit size={16} />
                            </button>
                            <button className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-body-md mb-4">
                      No saved addresses yet
                    </p>
                    <Link
                      href="/account/addresses/new"
                      className="btn-luxury"
                    >
                      Add Your First Address
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 