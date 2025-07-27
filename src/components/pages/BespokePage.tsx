'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, Star, Users, Gift, Clock, Award } from 'lucide-react'

export function BespokePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const bespokeServices = [
    {
      title: 'Signature Scent Creation',
      description: 'Create your own unique fragrance with rare ingredients from around the world',
      price: 'From $2,500',
      duration: '3-4 weeks',
      features: [
        'Personal consultation with master artisans',
        'Custom fragrance blending session',
        'Exclusive access to rare ingredients',
        'Bespoke packaging with personal monogram',
        'Lifetime refill service'
      ]
    },
    {
      title: 'Complete Wellness Journey',
      description: 'A comprehensive beauty and wellness experience tailored to your lifestyle',
      price: 'From $3,500',
      duration: '4-6 weeks',
      features: [
        'Personalized beauty routine consultation',
        'Custom body care product creation',
        'Signature fragrance + matching body products',
        'Luxury packaging and presentation',
        'Ongoing wellness support'
      ]
    },
    {
      title: 'Launch Day Exclusive',
      description: 'Limited edition bespoke experience available only during our launch period',
      price: 'From $5,000',
      duration: '6-8 weeks',
      features: [
        'Founder consultation with Victoria Elixir',
        'Exclusive ingredients not in regular collection',
        'Commemorative launch day packaging',
        'Private launch event invitation',
        'Lifetime VIP status'
      ]
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Link href="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mb-8">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Link>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
              Bespoke Services
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Experience the ultimate in luxury customization. Create products that are uniquely yours, crafted with the rarest ingredients and unparalleled artistry.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Exclusive Customization
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-3xl mx-auto">
              Each bespoke experience is a journey of discovery, creativity, and luxury. Limited availability ensures the highest level of personal attention.
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {bespokeServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-black border border-yellow-500/30 p-8 rounded-sm hover:border-yellow-500/50 transition-colors duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {index === 0 && <Star size={32} className="text-yellow-500" />}
                    {index === 1 && <Users size={32} className="text-yellow-500" />}
                    {index === 2 && <Award size={32} className="text-yellow-500" />}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-center items-center space-x-4 text-sm">
                    <span className="text-yellow-500 font-semibold">{service.price}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{service.duration}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-8 btn-luxury"
                >
                  Begin Consultation
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              The Bespoke Journey
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-3xl mx-auto">
              From initial consultation to final delivery, every step is crafted with precision and care
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-yellow-500">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Consultation</h3>
              <p className="text-gray-400 text-sm">
                Personal meeting to understand your preferences, lifestyle, and vision
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-yellow-500">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Creation</h3>
              <p className="text-gray-400 text-sm">
                Master artisans craft your unique product using rare ingredients
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-yellow-500">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Refinement</h3>
              <p className="text-gray-400 text-sm">
                Multiple iterations to perfect your bespoke creation
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-yellow-500">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Delivery</h3>
              <p className="text-gray-400 text-sm">
                Luxurious presentation and ongoing support for your creation
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Ready to Begin Your Journey?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Limited availability ensures the highest level of personal attention. Book your consultation today.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-luxury text-lg px-12 py-6"
              >
                Book Consultation
              </motion.button>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury-ghost text-lg px-12 py-6"
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 