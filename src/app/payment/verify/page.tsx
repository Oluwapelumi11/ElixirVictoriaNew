'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2, ShoppingBag } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useCartStore } from '@/lib/store'

function PaymentVerifyContent() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const searchParams = useSearchParams()
  const { clearCart } = useCartStore()
  
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [error, setError] = useState('')
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    const reference = searchParams.get('reference')
    const trxref = searchParams.get('trxref')

    const paymentRef = reference || trxref
    if (paymentRef) {
      verifyPayment(paymentRef)
    } else {
      setVerificationStatus('failed')
      setError('No payment reference found')
    }
  }, [searchParams])

  const verifyPayment = async (reference: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '/api'
      const response = await fetch(`${backendUrl}/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference }),
      })

      const data = await response.json()

      if (response.ok) {
        setVerificationStatus('success')
        setOrderDetails(data)
        clearCart() // Clear cart after successful payment
      } else {
        setVerificationStatus('failed')
        setError(data.message || 'Payment verification failed')
      }
    } catch (err) {
      setVerificationStatus('failed')
      setError('Network error. Please check your connection and try again.')
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
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="bg-gray-800 border border-gray-700 rounded-sm p-10 text-center">
              {verificationStatus === 'loading' && (
                <motion.div variants={itemVariants}>
                  <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 size={40} className="text-yellow-500 animate-spin" />
                  </div>
                  <h2 className="text-heading-lg font-serif text-white mb-4">
                    Verifying Payment
                  </h2>
                  <p className="text-gray-400 text-body-md">
                    Please wait while we verify your payment...
                  </p>
                </motion.div>
              )}

              {verificationStatus === 'success' && (
                <motion.div variants={itemVariants}>
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h2 className="text-heading-lg font-serif text-white mb-4">
                    Payment Successful!
                  </h2>
                  <p className="text-gray-400 text-body-md mb-6">
                    Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                  </p>
                  
                  {orderDetails?.transaction && (
                    <div className="bg-gray-700 rounded-sm p-4 mb-6">
                      <p className="text-white text-sm mb-2">Transaction Details:</p>
                      <p className="text-gray-400 text-sm">Amount: ₦{orderDetails.transaction.amount.toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">Transaction ID: {orderDetails.transaction.id}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Link
                      href="/account"
                      className="btn-luxury w-full flex items-center justify-center"
                    >
                      <ShoppingBag size={20} className="mr-2" />
                      View Orders
                    </Link>
                    <Link
                      href="/collection"
                      className="btn-luxury-ghost w-full flex items-center justify-center"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </motion.div>
              )}

              {verificationStatus === 'failed' && (
                <motion.div variants={itemVariants}>
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle size={40} className="text-red-500" />
                  </div>
                  <h2 className="text-heading-lg font-serif text-white mb-4">
                    Payment Failed
                  </h2>
                  <p className="text-gray-400 text-body-md mb-6">
                    {error || 'There was an issue with your payment. Please try again.'}
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      className="btn-luxury w-full flex items-center justify-center"
                    >
                      Try Again
                    </Link>
                    <Link
                      href="/cart"
                      className="btn-luxury-ghost w-full flex items-center justify-center"
                    >
                      Back to Cart
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function PaymentVerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <PaymentVerifyContent />
    </Suspense>
  )
} 