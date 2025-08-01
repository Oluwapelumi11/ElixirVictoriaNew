'use client'

import { useEffect } from 'react'

interface ProductSchemaProps {
  product: {
    id: number
    name: string
    description: string
    image: string
    price: number
    originalPrice?: number
    inStock: boolean
    rating: number
    reviews: number
    fragranceFamily?: string[]
    volume?: string
    gender?: string
    longevity?: string
  }
}

export function ProductSchema({ product }: ProductSchemaProps) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name,
      image: [
        {
          '@type': 'ImageObject',
          url: product.image,
          width: 800,
          height: 800,
          caption: `${product.name} - Elixir Victoria Luxury Perfume`
        }
      ],
      description: product.description,
      sku: `ELX-${product.id.toString().padStart(3, '0')}`,
      mpn: `ELX-${product.id.toString().padStart(3, '0')}`,
      gtin: `ELX-${product.id.toString().padStart(3, '0')}`,
      brand: {
        '@type': 'Brand',
        name: 'Elixir Victoria',
        url: 'https://elixirvictoria.com'
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'Elixir Victoria',
        url: 'https://elixirvictoria.com'
      },
      offers: {
        '@type': 'Offer',
        url: `https://elixirvictoria.com/product/${product.id}`,
        priceCurrency: 'NGN',
        price: product.price,
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
        availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Elixir Victoria',
          url: 'https://elixirvictoria.com'
        },
        deliveryLeadTime: {
          '@type': 'QuantitativeValue',
          minValue: 1,
          maxValue: 7,
          unitCode: 'DAY'
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: 0,
            currency: 'NGN'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY'
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 5,
              unitCode: 'DAY'
            }
          }
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews,
        bestRating: 5,
        worstRating: 1
      },
      category: product.fragranceFamily?.join(', ') || 'Luxury Perfume',
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Fragrance Family',
          value: product.fragranceFamily?.join(', ') || 'Luxury'
        },
        {
          '@type': 'PropertyValue',
          name: 'Brand',
          value: 'Elixir Victoria'
        },
        {
          '@type': 'PropertyValue',
          name: 'Volume',
          value: product.volume || '100ml'
        },
        {
          '@type': 'PropertyValue',
          name: 'Gender',
          value: product.gender || 'Unisex'
        },
        {
          '@type': 'PropertyValue',
          name: 'Longevity',
          value: product.longevity || '18 hours'
        }
      ],
      // Add review data if available
      review: [
        {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: 'Verified Customer'
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: product.rating,
            bestRating: 5
          },
          reviewBody: 'Exceptional luxury fragrance with long-lasting scent and premium quality.',
          datePublished: new Date().toISOString().split('T')[0]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [product])

  return null
} 