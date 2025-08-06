import { Metadata } from 'next'
import { products } from '@/data/products'

interface ProductLayoutProps {
  children: React.ReactNode
  params: { id: string }
}

export async function generateMetadata({ params }: ProductLayoutProps): Promise<Metadata> {
  const productId = parseInt(params.id)
  const product = products.find(p => p.id === productId)

  if (!product) {
    return {
      title: 'Product Not Found - Elixir Victoria',
      description: 'The requested product could not be found.',
    }
  }

  return {
    title: `${product.name} - Elixir Victoria | Luxury Perfume & Fragrance`,
    description: `${product.description} Shop ${product.name} from Elixir Victoria's luxury perfume collection. Premium fragrances crafted with rare ingredients and unparalleled artistry.`,
    keywords: `${product.name}, Elixir Victoria, luxury perfume, premium fragrance, ${product.fragranceFamily || 'perfume'}, buy ${product.name}, ${product.name} perfume, ${product.name} fragrance, luxury ${product.name}, premium ${product.name}, exclusive ${product.name}, bespoke ${product.name}, signature ${product.name}, Victoria Nocturne, luxury beauty, premium cosmetics, artisan perfume, niche fragrance, unisex perfume, long-lasting fragrance, oud perfume, floral perfume, oriental perfume, woody perfume, fruity perfume, luxury gift, wedding perfume, custom fragrance, personalized scent, rare ingredients, luxury brand, premium quality, sophisticated fragrance, elegant perfume, exclusive beauty, luxury lifestyle, high-end perfume, designer fragrance, boutique perfume, luxury shopping, premium beauty products, luxury cosmetics, exclusive collection, signature fragrance, luxury experience, premium shopping, elegant beauty, sophisticated style, luxury market, premium brand, exclusive market, luxury retail, premium retail, boutique shopping, luxury e-commerce, premium e-commerce, exclusive e-commerce, luxury online shopping, premium online shopping, exclusive online shopping, luxury perfume shop, premium fragrance shop, exclusive perfume shop, luxury beauty shop, premium beauty shop, exclusive beauty shop, luxury cosmetics shop, premium cosmetics shop, exclusive cosmetics shop, luxury gift shop, premium gift shop, exclusive gift shop, luxury wedding shop, premium wedding shop, exclusive wedding shop, luxury custom shop, premium custom shop, exclusive custom shop, luxury personalized shop, premium personalized shop, exclusive personalized shop, luxury rare shop, premium rare shop, exclusive rare shop, luxury artisan shop, premium artisan shop, exclusive artisan shop, luxury niche shop, premium niche shop, exclusive niche shop, luxury unisex shop, premium unisex shop, exclusive unisex shop, luxury long-lasting shop, premium long-lasting shop, exclusive long-lasting shop, luxury oud shop, premium oud shop, exclusive oud shop, luxury floral shop, premium floral shop, exclusive floral shop, luxury oriental shop, premium oriental shop, exclusive oriental shop, luxury woody shop, premium woody shop, exclusive woody shop, luxury fruity shop, premium fruity shop, exclusive fruity shop`,
    openGraph: {
      title: `${product.name} - Elixir Victoria`,
      description: product.description,
      url: `https://elixirvictoria.com/product/${product.id}`,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: `${product.name} - Elixir Victoria Luxury Perfume`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Elixir Victoria`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://elixirvictoria.com/product/${product.id}`,
    },
  }
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return children
} 