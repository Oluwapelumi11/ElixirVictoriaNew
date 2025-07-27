'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import { useUIStore } from '@/lib/store'

export function MobileCartToast() {
  const { isCartAnimating } = useUIStore()

  return (
    <AnimatePresence>
      {isCartAnimating && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
        >
          <div className="bg-yellow-500 text-black px-4 py-3 rounded-lg shadow-lg border border-yellow-400">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="bg-green-500 rounded-full p-1 flex-shrink-0"
              >
                <Check size={16} className="text-white" />
              </motion.div>
              <div className="flex-1">
                <p className="font-medium text-sm">Added to cart!</p>
                <p className="text-xs opacity-80">Tap the cart icon to view your items</p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex-shrink-0"
              >
                <ShoppingBag size={20} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 