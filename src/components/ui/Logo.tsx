'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-48 h-24',
    md: 'w-64 h-32', 
    lg: 'w-80 h-40',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex items-center justify-start ${className}`}
    >
      <Image
        src="/images/logo.png"
        alt="Elixir Victoria Logo"
        width={160}
        height={80}
        className={`${sizeClasses[size]} object-contain`}
        priority
      />
    </motion.div>
  )
} 