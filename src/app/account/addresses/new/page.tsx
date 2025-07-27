'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, MapPin, Save, X } from 'lucide-react'
import { useUserStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

interface AddressForm {
  type: 'shipping' | 'billing'
  address_line1: string
  address_line2: string
  city: string
  state: string
  country: string
  is_default: boolean
}

export default function NewAddressPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { user, isAuthenticated, token } = useUserStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<AddressForm>({
    type: 'shipping',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    country: '',
    is_default: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '/api'
      const response = await fetch(`${backendUrl}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/account')
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to add address')
      }
    } catch (err) {
      setError('Failed to add address. Please try again.')
    } finally {
      setIsSubmitting(false)
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

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="mb-12">
            <Link href="/account" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Back to Account
            </Link>
            <h1 className="text-heading-xl font-serif text-white mb-6">
              Add New Address
            </h1>
            <p className="text-body-lg text-gray-400">
              Add a shipping or billing address to your account for faster checkout.
            </p>
          </div>

          {/* Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
              {error && (
                <motion.div
                  variants={itemVariants}
                  className="bg-red-500/10 border border-red-500/20 rounded-sm p-4 mb-6"
                >
                  <p className="text-red-400 text-body-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Address Type */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label htmlFor="type" className="block text-white text-body-sm font-medium">
                    Address Type *
                  </label>
                  <div className="relative">
                    <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="input-luxury w-full h-14 pl-10"
                    >
                      <option value="shipping">Shipping Address</option>
                      <option value="billing">Billing Address</option>
                    </select>
                  </div>
                </motion.div>

                {/* Address Line 1 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label htmlFor="address_line1" className="block text-white text-body-sm font-medium">
                    Address Line 1 *
                  </label>
                  <div className="relative">
                    <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="address_line1"
                      name="address_line1"
                      value={formData.address_line1}
                      onChange={handleInputChange}
                      required
                      className="input-luxury w-full h-14 pl-10"
                      placeholder="Street address, P.O. box, company name"
                    />
                  </div>
                </motion.div>

                {/* Address Line 2 */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label htmlFor="address_line2" className="block text-white text-body-sm font-medium">
                    Address Line 2
                  </label>
                  <div className="relative">
                    <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="address_line2"
                      name="address_line2"
                      value={formData.address_line2}
                      onChange={handleInputChange}
                      className="input-luxury w-full h-14 pl-10"
                      placeholder="Apartment, suite, unit, etc. (optional)"
                    />
                  </div>
                </motion.div>

                {/* City and State */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="city" className="block text-white text-body-sm font-medium">
                      City *
                    </label>
                    <div className="relative">
                      <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="input-luxury w-full h-14 pl-10"
                        placeholder="City"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="state" className="block text-white text-body-sm font-medium">
                      State/Province *
                    </label>
                    <div className="relative">
                      <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="input-luxury w-full h-14 pl-10"
                        placeholder="State"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Country */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label htmlFor="country" className="block text-white text-body-sm font-medium">
                    Country *
                  </label>
                  <div className="relative">
                    <MapPin size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="input-luxury w-full h-14 pl-10"
                      placeholder="Country"
                    />
                  </div>
                </motion.div>

                {/* Default Address */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="is_default"
                      name="is_default"
                      checked={formData.is_default}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    <label htmlFor="is_default" className="text-white text-body-sm">
                      Set as default {formData.type} address
                    </label>
                  </div>
                </motion.div>

                {/* Submit Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-luxury flex-1 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Adding Address...
                      </>
                    ) : (
                      <>
                        <Save size={20} className="mr-2" />
                        Add Address
                      </>
                    )}
                  </button>
                  <Link href="/account">
                    <button
                      type="button"
                      className="btn-luxury-ghost flex-1 flex items-center justify-center"
                    >
                      <X size={20} className="mr-2" />
                      Cancel
                    </button>
                  </Link>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 