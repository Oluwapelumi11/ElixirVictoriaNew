import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Calculate two-level tax: first level on product price, then second level on the first tax
 * @param productPrice - The original product price in naira
 * @returns The final tax amount after two levels of calculation
 */
export const calculateTwoLevelTax = (productPrice: number): number => {
  // First level tax: (product price × 1.5%) + ₦100
  const Tax = (productPrice * 0.0155) + 100
  
  
  return Tax
}

/**
 * Calculate total with two-level tax
 * @param productPrice - The original product price in naira
 * @returns The total amount including two-level tax
 */
export const calculateTotalWithTwoLevelTax = (productPrice: number): number => {
  const finalTax = calculateTwoLevelTax(productPrice)
  return productPrice + finalTax
} 