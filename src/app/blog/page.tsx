import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Elixir Victoria Blog - #1 Luxury Perfume Tips & Trends',
  description: 'Discover luxury perfume tips, fragrance trends, and exclusive beauty insights from Elixir Victoria - The #1 luxury perfume brand in Nigeria.',
  keywords: 'luxury perfume blog, fragrance tips, perfume trends, beauty blog, luxury beauty tips, perfume guide, fragrance education, luxury lifestyle blog, beauty trends, perfume reviews, fragrance family guide, luxury perfume Nigeria, premium beauty blog, exclusive beauty tips, luxury fragrance blog, perfume advice, beauty education, luxury lifestyle tips, premium beauty trends, exclusive fragrance blog',
  openGraph: {
    title: 'Elixir Victoria Blog - #1 Luxury Perfume Tips & Trends',
    description: 'Discover luxury perfume tips, fragrance trends, and exclusive beauty insights from Elixir Victoria.',
    url: 'https://elixirvictoria.com/blog',
    type: 'website',
  },
}

const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Perfect Luxury Perfume: Complete Guide',
    excerpt: 'Master the art of selecting your signature scent with our comprehensive guide to luxury perfumes. Learn about fragrance families, longevity, and finding your perfect match.',
    slug: 'how-to-choose-perfect-luxury-perfume',
    image: '/images/products/victoria-nocturne.png',
    author: 'Elixir Victoria',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Perfume Guide',
    featured: true
  },
  {
    id: 2,
    title: 'Victoria Nocturne: The Story Behind Our #1 Luxury Fragrance',
    excerpt: 'Discover the inspiration, rare ingredients, and craftsmanship behind Victoria Nocturne - the fragrance that defines luxury in Nigeria.',
    slug: 'victoria-nocturne-story-luxury-fragrance',
    image: '/images/products/victoria-nocturne.png',
    author: 'Elixir Victoria',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Brand Story',
    featured: true
  },
  {
    id: 3,
    title: 'Luxury Perfume Trends 2024: What\'s Hot in Premium Fragrances',
    excerpt: 'Stay ahead of the curve with the latest luxury perfume trends for 2024. From niche fragrances to sustainable luxury, discover what\'s defining premium beauty.',
    slug: 'luxury-perfume-trends-2024',
    image: '/images/products/oil.png',
    author: 'Elixir Victoria',
    date: '2024-01-05',
    readTime: '7 min read',
    category: 'Trends',
    featured: false
  },
  {
    id: 4,
    title: 'Bespoke Perfumes: Creating Your Signature Scent with Elixir Victoria',
    excerpt: 'Experience the ultimate luxury with our bespoke perfume service. Learn how we create one-of-a-kind fragrances that capture your unique personality.',
    slug: 'bespoke-perfumes-signature-scent',
    image: '/images/products/oil.png',
    author: 'Elixir Victoria',
    date: '2024-01-01',
    readTime: '10 min read',
    category: 'Bespoke Service',
    featured: false
  },
  {
    id: 5,
    title: 'Luxury Beauty Routine: How to Layer Fragrances Like a Pro',
    excerpt: 'Master the art of fragrance layering with our expert tips. Create complex, long-lasting scent combinations that reflect your sophisticated style.',
    slug: 'luxury-beauty-routine-layer-fragrances',
    image: '/images/products/white-gloss.png',
    author: 'Elixir Victoria',
    date: '2023-12-28',
    readTime: '9 min read',
    category: 'Beauty Tips',
    featured: false
  },
  {
    id: 6,
    title: 'Why Elixir Victoria is the #1 Luxury Perfume Brand in Nigeria',
    excerpt: 'Discover what makes Elixir Victoria the leading luxury perfume brand in Nigeria. From rare ingredients to unparalleled craftsmanship.',
    slug: 'why-elixir-victoria-number-one-luxury-perfume',
    image: '/images/products/victoria-nocturne.png',
    author: 'Elixir Victoria',
    date: '2023-12-25',
    readTime: '5 min read',
    category: 'Brand Story',
    featured: false
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-heading-xl font-serif text-white mb-6">
            Elixir Victoria Blog
          </h1>
          <p className="text-body-lg text-gray-400 max-w-3xl mx-auto">
            Discover luxury perfume tips, fragrance trends, and exclusive beauty insights from The #1 luxury perfume brand in Nigeria.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map(post => (
          <div key={post.id} className="mb-16">
            <Link href={`/blog/${post.slug}`} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-[4/3] bg-gray-800 rounded-sm overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-black px-3 py-1 text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-heading-lg font-serif text-white group-hover:text-yellow-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-body-lg text-gray-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-yellow-500 group-hover:text-yellow-400 transition-colors">
                    <span className="font-medium">Read More</span>
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map(post => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[4/3] bg-gray-800 rounded-sm overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="text-heading-md font-serif text-white group-hover:text-yellow-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center text-yellow-500 group-hover:text-yellow-400 transition-colors">
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
} 