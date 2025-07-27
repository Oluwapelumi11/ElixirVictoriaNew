'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '/api'
      const response = await fetch(`${backendUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
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
            <Link href="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-heading-xl font-serif text-white mb-6">
              Contact Us
            </h1>
            <p className="text-body-lg text-gray-400">
              We'd love to hear from you. Reach out to us for any questions, support, or to share your experience.
            </p>
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <h2 className="text-heading-lg font-serif text-white mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-heading-sm font-serif text-white mb-1">Email</h3>
                      <p className="text-gray-400 text-body-md">info@elixirvictoria.com</p>
                      <p className="text-gray-500 text-body-sm">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-heading-sm font-serif text-white mb-1">Phone</h3>
                      <p className="text-gray-400 text-body-md">+234 704 892 8368</p>
                      <p className="text-gray-500 text-body-sm">Available Monday - Friday, 9AM - 6PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-heading-sm font-serif text-white mb-1">Business Hours</h3>
                      <p className="text-gray-400 text-body-md">Monday - Friday: 9AM - 6PM</p>
                      <p className="text-gray-500 text-body-sm">Saturday: 10AM - 4PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <h2 className="text-heading-lg font-serif text-white mb-6">Quick Support</h2>
                <div className="space-y-4">
                  <a 
                    href="https://wa.me/2347048928368"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury w-full justify-center"
                  >
                    WhatsApp Support
                  </a>
                  <a 
                    href="mailto:info@elixirvictoria.com"
                    className="btn-luxury-ghost w-full justify-center"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-10">
                <h2 className="text-heading-lg font-serif text-white mb-8">Send us a Message</h2>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-heading-md font-serif text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-400 text-body-md mb-8">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-luxury px-8 py-4"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-sm p-6">
                        <p className="text-red-400 text-body-sm">{error}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="block text-white text-body-sm font-medium">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="input-luxury w-full h-14 px-6"
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="email" className="block text-white text-body-sm font-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="input-luxury w-full h-14 px-6"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="phone" className="block text-white text-body-sm font-medium">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="input-luxury w-full h-14 px-6"
                          placeholder="+234 704 892 8368"
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="subject" className="block text-white text-body-sm font-medium">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="input-luxury w-full h-14 px-6"
                        >
                          <option value="">Select a subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Product Information">Product Information</option>
                          <option value="Order Support">Order Support</option>
                          <option value="Shipping & Returns">Shipping & Returns</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="message" className="block text-white text-body-sm font-medium">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={8}
                        className="input-luxury w-full resize-none px-6 py-4"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-luxury w-full h-14 flex items-center justify-center text-body-md font-medium"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send size={22} className="mr-3" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 