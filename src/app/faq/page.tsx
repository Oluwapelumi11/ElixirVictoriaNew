'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import Head from 'next/head'

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days with an additional $25 fee. Free shipping is included on orders over $200."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return window for unused and unopened items in their original packaging. Return shipping is included, and there are no restocking fees."
  },
  {
    question: "Are your products authentic?",
    answer: "All our products are 100% authentic and sourced directly from authorized manufacturers. We guarantee the authenticity of every item in our collection."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship to select countries. Please contact our customer service team for specific shipping information to your location."
  },
  {
    question: "How can I track my order?",
    answer: "You'll receive a tracking number via email once your order ships. You can also track your order through your account dashboard."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept a comprehensive range of payment methods through Paystack, including: Credit/Debit Cards (Visa, Mastercard, Verve), Bank Transfers, USSD payments, Mobile Money, and other local payment options. All transactions are secure and encrypted for your protection."
  },
  {
    question: "Are your products cruelty-free?",
    answer: "Yes, all our products are cruelty-free and we are committed to ethical sourcing and production practices."
  },
  {
    question: "How do I contact customer service?",
    answer: "You can reach us via email at info@elixirvictoria.com, WhatsApp at +234 704 892 8368, or phone at +234 704 892 8368. We typically respond within 24 hours."
  }
]

export default function FAQPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [openFaq, setOpenFaq] = useState<number | null>(null)

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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>
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
                Frequently Asked Questions
              </h1>
              <p className="text-body-lg text-gray-400">
                Find answers to common questions about our products, shipping, returns, and more.
              </p>
            </div>

            {/* FAQ Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800 border border-gray-700 rounded-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors duration-300"
                  >
                    <span className="text-heading-sm font-serif text-white">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp size={20} className="text-yellow-500" />
                    ) : (
                      <ChevronDown size={20} className="text-yellow-500" />
                    )}
                  </button>
                  
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-400 text-body-md leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Section */}
            <motion.div
              variants={itemVariants}
              className="mt-12 text-center"
            >
              <div className="bg-gray-800 border border-gray-700 rounded-sm p-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <HelpCircle size={24} className="text-yellow-500" />
                  <h3 className="text-heading-lg font-serif text-white">Still Have Questions?</h3>
                </div>
                <p className="text-gray-400 text-body-lg mb-6">
                  Can't find what you're looking for? Our customer service team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact"
                    className="btn-luxury"
                  >
                    Email Us
                  </Link>
                  <a 
                    href="https://wa.me/2347048928368"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-ghost"
                  >
                    WhatsApp Support
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  )
} 