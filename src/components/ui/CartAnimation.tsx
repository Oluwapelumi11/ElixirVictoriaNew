'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import { useUIStore } from '@/lib/store'

export function CartAnimation() {
  const { isCartAnimating } = useUIStore()

  return (
    <AnimatePresence>
      {isCartAnimating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-24 right-4 z-50 bg-yellow-500 text-black px-4 py-3 rounded-lg shadow-lg border border-yellow-400"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="bg-green-500 rounded-full p-1"
            >
              <Check size={16} className="text-white" />
            </motion.div>
            <div>
              <p className="font-medium text-sm">Added to cart!</p>
              <p className="text-xs opacity-80">Item successfully added</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 