export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  tags: string[]
  isNew: boolean
  isFeatured: boolean
  isAvailable: boolean
  stockQuantity: number
  sku: string
  fragranceNotes: FragranceNote[]
  size: string
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface FragranceNote {
  id: string
  name: string
  type: 'top' | 'middle' | 'base'
  description: string
  icon?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: Date
  addresses: Address[]
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  type: 'billing' | 'shipping'
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface UserPreferences {
  newsletter: boolean
  marketing: boolean
  orderUpdates: boolean
  productRecommendations: boolean
  language: string
  currency: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  size?: string
  addedAt: Date
}

export interface Cart {
  id: string
  userId?: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  billingAddress: Address
  shippingAddress: Address
  paymentMethod: PaymentMethod
  trackingNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product: Product
  quantity: number
  price: number
  size?: string
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface PaymentMethod {
  id: string
  type: 'card' | 'paypal'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
  addedAt: Date
}

export interface Review {
  id: string
  userId: string
  productId: string
  orderId: string
  rating: number
  title: string
  comment: string
  isVerified: boolean
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  image?: string
  parentId?: string
  children?: Category[]
  productCount: number
  isActive: boolean
  sortOrder: number
}

export interface NewsletterSubscription {
  id: string
  email: string
  isActive: boolean
  preferences: {
    newProducts: boolean
    exclusiveOffers: boolean
    events: boolean
    behindTheScenes: boolean
  }
  subscribedAt: Date
  unsubscribedAt?: Date
}

export interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: AdminRole
  permissions: Permission[]
  isActive: boolean
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type AdminRole = 'super_admin' | 'admin' | 'manager' | 'support'

export type Permission = 
  | 'products:read'
  | 'products:write'
  | 'orders:read'
  | 'orders:write'
  | 'customers:read'
  | 'customers:write'
  | 'analytics:read'
  | 'settings:read'
  | 'settings:write'

export interface Analytics {
  revenue: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: number
  }
  orders: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: number
  }
  customers: {
    total: number
    newThisMonth: number
    growth: number
  }
  products: {
    total: number
    active: number
    lowStock: number
  }
}

export interface SearchFilters {
  category?: string
  priceRange?: {
    min: number
    max: number
  }
  fragranceNotes?: string[]
  size?: string
  availability?: 'in_stock' | 'out_of_stock' | 'pre_order'
  sortBy?: 'name' | 'price' | 'newest' | 'popular'
  sortOrder?: 'asc' | 'desc'
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
} 