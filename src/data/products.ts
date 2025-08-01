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
  whatsappOnly?: boolean
  // Optional fragrance-specific properties
  fragranceFamily?: string[]
  scentType?: string
  keyNotes?: {
    top: string[]
    middle: string[]
    base: string[]
  }
  longDescription?: string
  volume?: string
  gender?: string
  longevity?: string
  occasion?: string[]
  // Optional body care-specific properties
  ingredients?: string[]
  benefits?: string[]
  skinType?: string[]
  usage?: string
  frequency?: string
  keyFeatures?: string[]
  results?: string[]
}

export const products: SimpleProduct[] = [
  {
    id: 1,
    name: 'Elixir Victoria (Unisex) 100ml',
    description: 'A bold yet tender blend that opens with a burst of fruits, blooms into elegant florals, and settles into a sensual oud embrace. Elixir Victoria is a journey of grace, strength, and unforgettable presence.',
    price: 100000,
    originalPrice: 100000,
    image: '/images/products/victoria-nocturne.png',
    category: 'Fragrance',
    tags: ['Evening', 'Oriental', 'Luxury', 'Floral', 'Woody', 'Fruity'],
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviews: 12,
    inStock: true,
    // Additional product details
    fragranceFamily: ['Floral', 'Woody', 'Fruity'],
    scentType: 'Fruity Woody Oriental',
    keyNotes: {
      top: ['Bergamot', 'Fruity'],
      middle: ['Jasmine', 'Rose', 'Peach'],
      base: ['Sandalwood', 'Vanilla','Mandarin']
    },
    longDescription: `Elixir Victoria represents confidence, elegance, and sensuality. This scent is soft but seductive, perfect for date nights or elegant dinners. Inspired by the phrase "Toque real, aire seductor", it denotes A Royal touch with a seductive vibe on a warm evening breeze and golden skin. Stays up to 18 hours without reapplying.`,
    volume: '100ml',
    gender: 'Unisex',
    longevity: '18 hours',
    occasion: ['Date Nights', 'Elegant Dinners', 'Evening Events']
  },
  {
    id: 2,
    name: 'Elixir Custom Signature',
    description: 'Create your own unique fragrance or body care product with our bespoke custom signature service. Our master artisans will work with you to craft a one-of-a-kind scent or product that perfectly captures your personality and preferences.',
    price: 0,
    originalPrice: 0,
    image: '/images/products/oil.png',
    category: 'Custom Service',
    tags: ['Bespoke', 'Custom', 'Luxury', 'Personalized', 'Exclusive'],
    isNew: true,
    isFeatured: true,
    rating: 5.0,
    reviews: 0,
    inStock: true,
    whatsappOnly: true,
    longDescription: `Experience the ultimate in luxury personalization with our Elixir Custom Signature service. This exclusive bespoke offering allows you to create your own unique fragrance or body care product, crafted specifically for you by our master artisans.

Our custom signature service begins with a comprehensive consultation where we explore your preferences, personality, and lifestyle. Whether you're looking for a signature fragrance that captures your essence, a personalized body care product tailored to your skin's needs, or a unique gift for someone special, our artisans will guide you through the entire creative process.

From selecting the finest ingredients to perfecting the final formula, every step is carefully crafted to ensure your custom creation is truly one-of-a-kind. Our master artisans combine traditional techniques with innovative approaches to create products that are as unique as you are.

Perfect for those who seek exclusivity and personalization in their luxury beauty and wellness journey.`,
    keyFeatures: [
      'Personalized consultation with master artisans',
      'One-of-a-kind fragrance or body care creation',
      'Premium ingredients and craftsmanship',
      'Exclusive and bespoke experience',
      'Perfect for gifts or personal use',
      'Luxury packaging and presentation'
    ],
    results: [
      'Unique signature fragrance or product',
      'Personalized luxury experience',
      'Exclusive bespoke creation',
      'Professional consultation and guidance',
      'Luxury packaging and presentation'
    ]
  },
  {
    id: 3,
    name: 'High Class Lip Gloss',
    description: 'A sophisticated white lip gloss that delivers high-shine luxury with a subtle pearl finish. This premium formula provides intense hydration while creating a stunning, high-class appearance.',
    price: 5000,
    originalPrice: 5000,
    image: '/images/products/white-gloss.png',
    category: 'Makeup',
    tags: ['Luxury', 'High-Shine', 'Hydrating', 'Pearl Finish', 'Sophisticated'],
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviews: 14,
    inStock: true,
    // Additional product details
    ingredients: ['Jojoba Oil', 'Vitamin E', 'Pearl Extract', 'Hyaluronic Acid', 'Natural Waxes'],
    benefits: ['Intense Hydration', 'Long-Lasting Shine', 'Plumping Effect', 'Non-Sticky Formula', 'Pearl Luminosity'],
    skinType: ['All Skin Types', 'Sensitive Lips Friendly'],
    usage: 'Apply directly to lips for instant shine and hydration',
    frequency: 'As needed throughout the day',
    volume: '8ml',
    longDescription: `Elevate your beauty routine with High Class Lip Gloss - a sophisticated white lip gloss that embodies luxury and elegance. This premium formula features a unique pearl finish that creates a stunning high-shine effect while delivering intense hydration to your lips.

The carefully crafted formula combines jojoba oil and hyaluronic acid for deep moisturization, while pearl extract provides a subtle luminosity that catches the light beautifully. The non-sticky texture ensures comfortable wear throughout the day, making it perfect for both everyday elegance and special occasions.

High Class Lip Gloss is designed for those who appreciate the finer things in life. The white pearl finish creates a sophisticated, high-class appearance that complements any makeup look. Whether worn alone for a natural glow or layered over lipstick for added dimension, this gloss delivers the luxury experience you deserve.`,
    keyFeatures: [
      'Pearl white finish for sophisticated shine',
      'Intense hydration with jojoba oil',
      'Non-sticky, comfortable formula',
      'Long-lasting shine and moisture',
      'Suitable for all skin tones',
      'Luxurious packaging design'
    ],
    results: [
      'Instant high-shine finish',
      'Deeply hydrated, plump lips',
      'Sophisticated pearl luminosity',
      'Comfortable, non-sticky wear',
      'Long-lasting moisture retention'
    ]
  },
  {
    id: 4,
    name: 'Magic Lip Gloss',
    description: 'A mesmerizing pink lip gloss that creates a magical, enchanting effect. This vibrant formula delivers a stunning pink hue with a high-shine finish that transforms your lips into a work of art.',
    price: 5000,
    originalPrice: 5000,
    image: '/images/products/pink-gloss.png',
    category: 'Makeup',
    tags: ['Vibrant', 'Enchanting', 'High-Shine', 'Pink Hue', 'Magical'],
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviews: 16,
    inStock: true,
    // Additional product details
    ingredients: ['Rosehip Oil', 'Vitamin E', 'Pink Pigments', 'Hyaluronic Acid', 'Natural Waxes'],
    benefits: ['Vibrant Pink Color', 'Intense Hydration', 'Long-Lasting Shine', 'Plumping Effect', 'Magical Glow'],
    skinType: ['All Skin Types', 'Sensitive Lips Friendly'],
    usage: 'Apply directly to lips for instant color and shine',
    frequency: 'As needed throughout the day',
    volume: '8ml',
    longDescription: `Discover the magic of transformation with Magic Lip Gloss - a mesmerizing pink lip gloss that creates an enchanting, magical effect. This vibrant formula delivers a stunning pink hue with a high-shine finish that transforms your lips into a captivating work of art.

The carefully selected pink pigments create a beautiful, buildable color that enhances your natural lip tone while providing a magical glow. Enriched with rosehip oil and hyaluronic acid, this gloss deeply hydrates and plumps your lips, creating a youthful, radiant appearance.

Magic Lip Gloss is perfect for those who want to add a touch of enchantment to their beauty routine. The vibrant pink color creates a magical, eye-catching effect that's perfect for special occasions, date nights, or whenever you want to feel extraordinary. The high-shine finish catches the light beautifully, creating a mesmerizing, magical glow that draws attention to your beautiful smile.`,
    keyFeatures: [
      'Vibrant pink color with magical glow',
      'Intense hydration with rosehip oil',
      'Non-sticky, comfortable formula',
      'Long-lasting color and shine',
      'Buildable pink pigment',
      'Enchanting high-shine finish'
    ],
    results: [
      'Instant vibrant pink color',
      'Deeply hydrated, plump lips',
      'Magical high-shine glow',
      'Comfortable, non-sticky wear',
      'Long-lasting color retention'
    ]
  },
  {
    id: 4,
    name: 'Honey & Sugar Luxury Body Scrub (Large)',
    description: 'A luxurious exfoliating experience that combines the natural sweetness of raw honey with fine sugar crystals to reveal your skin\'s natural radiance. This indulgent scrub gently removes dead skin cells while deeply nourishing and moisturizing.',
    price: 10000,
    originalPrice: 10000,
    image: '/images/products/luxury-body-scrub.png',
    category: 'Body Care',
    tags: ['Exfoliating', 'Wellness', 'Natural', 'Moisturizing', 'Luxury'],
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviews: 8,
    inStock: false,
    // Additional product details
    ingredients: ['Raw Honey', 'Fine Sugar Crystals', 'Coconut Oil', 'Vitamin E', 'Natural Essential Oils'],
    benefits: ['Gentle Exfoliation', 'Deep Moisturization', 'Natural Radiance', 'Smooth Skin Texture', 'Antioxidant Protection'],
    skinType: ['All Skin Types', 'Sensitive Skin Friendly'],
    usage: 'Apply to damp skin in gentle circular motions, then rinse thoroughly',
    frequency: '2-3 times per week',
    volume: '300g',
    longDescription: `Transform your bathing ritual into a luxurious spa experience with our Honey & Sugar Luxury Body Scrub. This carefully crafted formula combines the natural sweetness of raw honey with fine sugar crystals to create a gentle yet effective exfoliating treatment.

The raw honey acts as a natural humectant, drawing moisture to your skin while providing antibacterial properties. Fine sugar crystals gently slough away dead skin cells, revealing the soft, radiant skin beneath. Enriched with coconut oil and vitamin E, this scrub deeply nourishes and moisturizes, leaving your skin silky smooth and beautifully hydrated.

Perfect for those seeking a natural, indulgent skincare experience that delivers visible results. The warm, honey-sweet fragrance creates a sensorial experience that transforms your daily routine into a moment of pure luxury and self-care.`,
    keyFeatures: [
      'Natural raw honey for deep moisturization',
      'Fine sugar crystals for gentle exfoliation',
      'Coconut oil for intense hydration',
      'Vitamin E for antioxidant protection',
      'Suitable for all skin types',
      'Luxurious honey-sweet fragrance'
    ],
    results: [
      'Smoother, softer skin texture',
      'Enhanced natural radiance',
      'Improved skin hydration',
      'Gentle exfoliation without irritation',
      'Long-lasting moisturization'
    ]
  },
  {
    id: 5,
    name: 'Honey & Sugar Luxury Body Scrub (Small)',
    description: 'A luxurious exfoliating experience that combines the natural sweetness of raw honey with fine sugar crystals to reveal your skin\'s natural radiance. This indulgent scrub gently removes dead skin cells while deeply nourishing and moisturizing.',
    price: 5000,
    originalPrice: 5000,
    image: '/images/products/luxury-body-scrub.png',
    category: 'Body Care',
    tags: ['Exfoliating', 'Wellness', 'Natural', 'Moisturizing', 'Luxury'],
    isNew: false,
    isFeatured: false,
    rating: 4.9,
    reviews: 8,
    inStock: false,
    // Additional product details
    ingredients: ['Raw Honey', 'Fine Sugar Crystals', 'Coconut Oil', 'Vitamin E', 'Natural Essential Oils'],
    benefits: ['Gentle Exfoliation', 'Deep Moisturization', 'Natural Radiance', 'Smooth Skin Texture', 'Antioxidant Protection'],
    skinType: ['All Skin Types', 'Sensitive Skin Friendly'],
    usage: 'Apply to damp skin in gentle circular motions, then rinse thoroughly',
    frequency: '2-3 times per week',
    volume: '150g',
    longDescription: `Transform your bathing ritual into a luxurious spa experience with our Honey & Sugar Luxury Body Scrub. This carefully crafted formula combines the natural sweetness of raw honey with fine sugar crystals to create a gentle yet effective exfoliating treatment.

The raw honey acts as a natural humectant, drawing moisture to your skin while providing antibacterial properties. Fine sugar crystals gently slough away dead skin cells, revealing the soft, radiant skin beneath. Enriched with coconut oil and vitamin E, this scrub deeply nourishes and moisturizes, leaving your skin silky smooth and beautifully hydrated.

Perfect for those seeking a natural, indulgent skincare experience that delivers visible results. The warm, honey-sweet fragrance creates a sensorial experience that transforms your daily routine into a moment of pure luxury and self-care.`,
    keyFeatures: [
      'Natural raw honey for deep moisturization',
      'Fine sugar crystals for gentle exfoliation',
      'Coconut oil for intense hydration',
      'Vitamin E for antioxidant protection',
      'Suitable for all skin types',
      'Luxurious honey-sweet fragrance'
    ],
    results: [
      'Smoother, softer skin texture',
      'Enhanced natural radiance',
      'Improved skin hydration',
      'Gentle exfoliation without irritation',
      'Long-lasting moisturization'
    ]
  },
  
 
  // {
  //   id: 4,
  //   name: 'Silk Body Oil',
  //   description: 'Nourishing body oil with argan and jojoba for ultimate hydration',
  //   price: 95,
  //   originalPrice: 110,
  //   image: '/images/products/silk-body-oil.png',
  //   category: 'Body Care',
  //   tags: ['Hydrating', 'Natural', 'Wellness'],
  //   isNew: false,
  //   isFeatured: false,
  //   rating: 4.8,
  //   reviews: 6,
  //   inStock: true,
  // },
  // {
  //   id: 6,
  //   name: 'Wellness Bath Salts',
  //   description: 'Therapeutic bath salts with lavender and eucalyptus for ultimate relaxation',
  //   price: 85,
  //   originalPrice: 100,
  //   image: '/images/products/luxury-body-scrub.png',
  //   category: 'Body Care',
  //   tags: ['Relaxing', 'Wellness', 'Natural'],
  //   isNew: true,
  //   isFeatured: false,
  //   rating: 4.9,
  //   reviews: 4,
  //   inStock: true,
  // },
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

// Utility function to convert SimpleProduct to Product
export const convertToProduct = (simpleProduct: SimpleProduct): Product => {
  return {
    id: simpleProduct.id.toString(),
    name: simpleProduct.name,
    description: simpleProduct.description,
    shortDescription: simpleProduct.description.substring(0, 100) + '...',
    price: simpleProduct.price,
    originalPrice: simpleProduct.originalPrice,
    images: [simpleProduct.image],
    category: simpleProduct.category,
    tags: simpleProduct.tags,
    isNew: simpleProduct.isNew,
    isFeatured: simpleProduct.isFeatured,
    isAvailable: simpleProduct.inStock,
    stockQuantity: simpleProduct.inStock ? 10 : 0, // Default stock quantity
    sku: `ELX-${simpleProduct.id.toString().padStart(3, '0')}`,
    fragranceNotes: [], // Empty for now, can be populated later
    size: simpleProduct.volume || '50ml', // Use volume if available, otherwise default
    weight: 0.05, // Default weight in kg
    dimensions: {
      length: 5,
      width: 5,
      height: 15
    },
    whatsappOnly: simpleProduct.whatsappOnly || false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
} 