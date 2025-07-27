import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem, Product, User } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, size?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getTotal: () => number
}

interface UserStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (userData: { user: User; token: string }) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

interface UIStore {
  isCartOpen: boolean
  isSearchOpen: boolean
  isMobileMenuOpen: boolean
  isNewsletterOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
  toggleMobileMenu: () => void
  openNewsletter: () => void
  closeNewsletter: () => void
  toggleNewsletter: () => void
}

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product, quantity = 1, size?: string) => {
        console.log('Adding to cart:', { product, quantity, size })
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id && item.size === size
          )

          if (existingItem) {
            console.log('Updating existing item quantity')
            return {
              items: state.items.map((item) =>
                item.id === existingItem.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          const newItem: CartItem = {
            id: Math.random().toString(36).substr(2, 9),
            productId: product.id,
            product,
            quantity,
            size,
            addedAt: new Date(),
          }

          console.log('Adding new item to cart:', newItem)
          return {
            items: [...state.items, newItem],
          }
        })
      },
      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }))
      },
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }))
      },
      clearCart: () => {
        set({ items: [] })
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },
      getTotal: () => {
        const subtotal = get().getSubtotal()
        return subtotal
      },
    }),
    {
      name: 'elixir-victoria-cart',
    }
  )
)

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  login: (userData: { user: User; token: string }) => {
    set({ user: userData.user, token: userData.token, isAuthenticated: true })
  },
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false })
  },
  updateUser: (userData: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    }))
  },
}))

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isNewsletterOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  openNewsletter: () => set({ isNewsletterOpen: true }),
  closeNewsletter: () => set({ isNewsletterOpen: false }),
  toggleNewsletter: () => set((state) => ({ isNewsletterOpen: !state.isNewsletterOpen })),
}))

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id)
          if (!exists) {
            return { items: [...state.items, product] }
          }
          return state
        })
      },
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },
      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.id === productId)
      },
      clearWishlist: () => {
        set({ items: [] })
      },
      getTotalItems: () => {
        return get().items.length
      },
    }),
    {
      name: 'elixir-victoria-wishlist',
    }
  )
) 