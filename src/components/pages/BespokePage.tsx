'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { ArrowLeft, Star, Users, Gift, Clock, Award, Palette, Droplets, Sparkles, Heart, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export function BespokePage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedService, setSelectedService] = useState<string | null>(null)

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
      id: 'perfume',
      title: 'Custom Signature Perfume',
      description: 'Create your own unique fragrance that tells your story',
      icon: <Droplets size={32} className="text-yellow-500" />,
      priceRange: 'Tailored to your budget',
      duration: '2-4 weeks',
      features: [
        'Personal fragrance consultation',
        'Custom scent blending session',
        'Rare and exotic ingredients',
        'Bespoke packaging with personal monogram',
        'Lifetime refill service',
        'Flexible pricing based on your budget'
      ],
      details: {
        description: 'Our master perfumers work with your budget and desired scent profile to create a truly unique fragrance that captures your essence.',
        process: [
          'Initial consultation to understand your preferences and budget',
          'Scent profiling and ingredient selection',
          'Custom blending session with master perfumer',
          'Multiple iterations to perfect your signature scent',
          'Bespoke packaging and presentation'
        ],
        ingredients: [
          'Rare essential oils from around the world',
          'Exotic floral extracts',
          'Precious woods and resins',
          'Custom base formulations',
          'Long-lasting fixatives'
        ]
      }
    },
    {
      id: 'oil',
      title: 'Custom Essential Oil Blend',
      description: 'Tailored therapeutic and aromatic oil combinations',
      icon: <Palette size={32} className="text-yellow-500" />,
      priceRange: 'Tailored to your budget',
      duration: '1-3 weeks',
      features: [
        'Therapeutic consultation',
        'Custom oil blending',
        'Pure essential oils',
        'Personalized usage guide',
        'Refill and adjustment service',
        'Budget-friendly options available'
      ],
      details: {
        description: 'Create therapeutic oil blends for wellness, relaxation, or specific health benefits, tailored to your needs and budget.',
        process: [
          'Wellness consultation and goal setting',
          'Oil selection based on therapeutic properties',
          'Custom blending with precise ratios',
          'Safety testing and quality assurance',
          'Personalized usage instructions'
        ],
        ingredients: [
          'Pure essential oils',
          'Carrier oils (jojoba, almond, coconut)',
          'Therapeutic grade extracts',
          'Natural preservatives',
          'Custom scent enhancers'
        ]
      }
    }
  ]

  const budgetTiers = [
    {
      range: 'Essential',
      description: 'Quality custom blend with standard ingredients',
      includes: [
        'Basic consultation',
        'Standard ingredient selection',
        'Simple custom packaging',
        'Basic usage guide'
      ]
    },
    {
      range: 'Premium',
      description: 'Enhanced custom creation with rare ingredients',
      includes: [
        'Extended consultation',
        'Rare and exotic ingredients',
        'Luxury packaging',
        'Detailed usage guide',
        'Follow-up consultation'
      ]
    },
    {
      range: 'Ultimate',
      description: 'Master artisan experience with rarest ingredients',
      includes: [
        'Master artisan consultation',
        'Rarest ingredients available',
        'Bespoke packaging design',
        'Lifetime support',
        'VIP client status'
      ]
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <Link href="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mb-6 sm:mb-8">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Link>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6">
              Custom Signature
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
              Create your own unique perfumes and essential oil blends tailored to your budget. We work with your desired flavor profile and budget to craft something truly special. Contact us via WhatsApp for quick consultation or use our contact form for detailed discussions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-24 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 sm:mb-6">
              Choose Your Custom Experience
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto px-4">
              Whether you're looking for a signature perfume or therapeutic oil blend, we create something uniquely yours tailored to your budget.
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {bespokeServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`bg-black border-2 p-6 sm:p-8 rounded-sm transition-all duration-300 cursor-pointer ${
                  selectedService === service.id 
                    ? 'border-yellow-500 bg-gray-900' 
                    : 'border-yellow-500/30 hover:border-yellow-500/50'
                }`}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-center items-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
                    <span className="text-yellow-500 font-semibold">{service.priceRange}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{service.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {selectedService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700"
                  >
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">What's Included:</h4>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{service.details.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <h5 className="text-yellow-500 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Process:</h5>
                        <ul className="space-y-1 text-xs sm:text-sm text-gray-300">
                          {service.details.process.map((step, idx) => (
                            <li key={idx} className="flex items-start space-x-1 sm:space-x-2">
                              <span className="text-yellow-500">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-yellow-500 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Ingredients:</h5>
                        <ul className="space-y-1 text-xs sm:text-sm text-gray-300">
                          {service.details.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="flex items-start space-x-1 sm:space-x-2">
                              <span className="text-yellow-500">•</span>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 sm:mt-8 btn-luxury flex items-center justify-center space-x-2 text-sm sm:text-base py-3 sm:py-4"
                  onClick={() => {
                    const message = `Hi! I'm interested in your ${service.title.toLowerCase()} service. Can you help me get started?`;
                    window.open(`https://wa.me/2347048928368?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                >
                  <MessageCircle size={16} className="sm:w-4 sm:h-4" />
                  <span>WhatsApp Consultation</span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Budget Tiers */}
      <section className="py-16 sm:py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 sm:mb-6">
              Tailored to Your Budget
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto px-4">
              We work with your budget to create something special. No matter your budget, we'll craft something uniquely yours with quality ingredients and expert craftsmanship.
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {budgetTiers.map((tier, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800 border border-gray-700 p-4 sm:p-6 rounded-sm hover:border-yellow-500/50 transition-colors duration-300"
              >
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Sparkles size={20} className="sm:w-6 sm:h-6 text-yellow-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {tier.range}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-1.5 sm:space-y-2">
                  {tier.includes.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-1.5 sm:space-x-2">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 sm:mb-6">
              Your Custom Journey
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto px-4">
              From initial consultation to final delivery, every step is crafted with your vision in mind
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl sm:text-2xl font-bold text-yellow-500">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Consultation</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Discuss your budget, preferences, and desired scent profile
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl sm:text-2xl font-bold text-yellow-500">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Creation</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Expert blending with ingredients that match your budget
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl sm:text-2xl font-bold text-yellow-500">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Refinement</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Adjustments and fine-tuning to perfect your creation
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl sm:text-2xl font-bold text-yellow-500">4</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">Delivery</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Beautiful packaging and ongoing support for your creation
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 sm:mb-6">
              Ready to Create Your Signature?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Let's discuss your vision, budget, and create something uniquely yours. We work with every budget to craft something special just for you.
            </motion.p>
            <motion.p variants={itemVariants} className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              💬 Quick consultation via WhatsApp or detailed discussion through our contact form - choose what works best for you.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="https://wa.me/2347048928368?text=Hi! I'm interested in creating a custom signature perfume/oil blend. Can you help me get started?" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury text-sm sm:text-lg px-6 sm:px-12 py-4 sm:py-6 flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                  <span>WhatsApp Consultation</span>
                </motion.button>
              </a>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury-ghost text-sm sm:text-lg px-6 sm:px-12 py-4 sm:py-6 w-full sm:w-auto"
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