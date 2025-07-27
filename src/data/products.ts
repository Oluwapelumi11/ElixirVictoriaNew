import type { Product } from '@/types'

// Simplified product data for current implementation
export interface SimpleProduct {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  category: string
  tags: string[]
  isNew: boolean
  isFeatured: boolean
  rating: number
  reviews: number
  inStock: boolean
}

export const products: SimpleProduct[] = [
  {
    id: 1,
    name: 'Victoria Nocturne',
    description: 'A mysterious blend of oud, vanilla, and rare spices that evokes the magic of midnight',
    price: 850,
    originalPrice: 950,
    image: '/images/products/victoria-nocturne.png',
    category: 'Fragrance',
    tags: ['Evening', 'Oriental', 'Luxury'],
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviews: 12,
    inStock: true,
  },
  {
    id: 2,
    name: 'Honey and Sugar Body Scrub',
    description: 'Exfoliating scrub with Himalayan salt and essential oils for silky smooth skin',
    price: 120,
    originalPrice: 140,
    image: '/images/products/luxury-body-scrub.jpg',
    category: 'Body Care',
    tags: ['Exfoliating', 'Wellness', 'Natural'],
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviews: 8,
    inStock: true,
  },
  {
    id: 3,
    name: 'Elixir Royal',
    description: 'Regal rose and jasmine with hints of amber - fit for royalty',
    price: 1200,
    originalPrice: 1200,
    image: '/images/products/elixir-royal.jpg',
    category: 'Fragrance',
    tags: ['Royal', 'Floral', 'Luxury'],
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviews: 15,
    inStock: true,
  },
  {
    id: 4,
    name: 'Silk Body Oil',
    description: 'Nourishing body oil with argan and jojoba for ultimate hydration',
    price: 95,
    originalPrice: 110,
    image: '/images/products/silk-body-oil.jpg',
    category: 'Body Care',
    tags: ['Hydrating', 'Natural', 'Wellness'],
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    reviews: 6,
    inStock: true,
  },
  {
    id: 5,
    name: 'Champagne Dreams',
    description: 'Effervescent bergamot and champagne with white flowers',
    price: 650,
    originalPrice: 750,
    image: '/images/products/champagne-dreams.jpg',
    category: 'Fragrance',
    tags: ['Day', 'Fresh', 'Luxury'],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    reviews: 10,
    inStock: true,
  },
  {
    id: 6,
    name: 'Wellness Bath Salts',
    description: 'Therapeutic bath salts with lavender and eucalyptus for ultimate relaxation',
    price: 85,
    originalPrice: 100,
    image: '/images/products/wellness-bath-salts.jpg',
    category: 'Body Care',
    tags: ['Relaxing', 'Wellness', 'Natural'],
    isNew: true,
    isFeatured: false,
    rating: 4.9,
    reviews: 4,
    inStock: true,
  },
]

// Helper functions
export const getFeaturedProducts = () => products.filter(product => product.isFeatured)

export const getProductsByCategory = (category: string) => 
  products.filter(product => product.category === category)

export const getNewProducts = () => products.filter(product => product.isNew)

export const getProductsByTag = (tag: string) => 
  products.filter(product => product.tags.includes(tag))

export const searchProducts = (query: string) => 
  products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  ) 