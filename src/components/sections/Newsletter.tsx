'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'

export function Newsletter() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (honeypot) {
      setError('Bot detected. Submission blocked.')
      return
    }
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      if (response.ok && data.success !== false) {
        setIsSubscribed(true)
        setEmail('')
        setTimeout(() => setIsSubscribed(false), 3000)
      } else if (data.message && data.message.includes('already subscribed')) {
        setError('This email is already subscribed to our newsletter.')
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <section className="py-24 bg-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-champagne-gold/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-soft-gold/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>

          {/* Content */}
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="mb-8">
              <div className="w-16 h-16 bg-champagne-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={32} className="text-champagne-gold" />
              </div>
              <h2 className="text-h1 text-pearl-white mb-6">
                Join the Elixir Family
              </h2>
              <p className="text-body text-subtle-gray max-w-2xl mx-auto leading-relaxed">
                Be the first to discover our latest creations, exclusive events, and behind-the-scenes stories. 
                Join our community of luxury wellness connoisseurs and receive early access to limited editions.
              </p>
            </div>

            {/* Newsletter Form */}
            <motion.div
              variants={itemVariants}
              className="max-w-md mx-auto"
            >
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from users) */}
                  <div style={{ display: 'none' }}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={honeypot}
                      onChange={e => setHoneypot(e.target.value)}
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-luxury-black border border-divider-gray text-pearl-white px-6 py-4 text-center focus:border-champagne-gold focus:outline-none transition-colors duration-300 placeholder:text-subtle-gray"
                    />
                  </div>
                  {error && (
                    <div className="text-red-400 text-sm text-center">{error}</div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full btn-luxury flex items-center justify-center space-x-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-champagne-gold/10 border border-champagne-gold p-6 rounded-sm"
                >
                  <p className="text-pearl-white font-medium">
                    Thank you for subscribing! Welcome to the Elixir Victoria family.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Benefits */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-champagne-gold/20 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-champagne-gold text-lg font-bold">1</div>
                </div>
                <h4 className="text-lg font-semibold text-pearl-white">
                  Early Access
                </h4>
                <p className="text-sm text-subtle-gray">
                  Be the first to discover new fragrances and limited editions
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-champagne-gold/20 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-champagne-gold text-lg font-bold">2</div>
                </div>
                <h4 className="text-lg font-semibold text-pearl-white">
                  Exclusive Events
                </h4>
                <p className="text-sm text-subtle-gray">
                  Invitations to private launches and bespoke consultations
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-champagne-gold/20 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-champagne-gold text-lg font-bold">3</div>
                </div>
                <h4 className="text-lg font-semibold text-pearl-white">
                  Behind the Scenes
                </h4>
                <p className="text-sm text-subtle-gray">
                  Stories from our master artisans and rare ingredient sourcing
                </p>
              </div>
            </motion.div>

            {/* Privacy Note */}
            <motion.div
              variants={itemVariants}
              className="mt-8"
            >
              <p className="text-xs text-subtle-gray">
                We respect your privacy. Unsubscribe at any time. View our{' '}
                <a href="/privacy" className="text-champagne-gold hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 