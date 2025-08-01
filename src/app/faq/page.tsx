import { Metadata } from 'next'
import FAQPage from '@/components/pages/FAQPage'

export const metadata: Metadata = {
  title: 'FAQ - Elixir Victoria | #1 Luxury Perfume Brand Questions',
  description: 'Get answers to all your questions about Elixir Victoria luxury perfumes, shipping, returns, and more. The #1 luxury perfume brand in Nigeria.',
  keywords: 'Elixir Victoria FAQ, luxury perfume questions, perfume shipping Nigeria, perfume returns, Victoria Nocturne FAQ, bespoke perfume questions, luxury fragrance FAQ, perfume delivery Nigeria, luxury beauty FAQ, premium perfume questions, exclusive perfume FAQ, luxury brand questions, perfume customer service, luxury fragrance support, premium beauty FAQ, exclusive beauty questions, luxury perfume Nigeria FAQ, premium fragrance Nigeria questions, exclusive perfume Nigeria FAQ, luxury beauty Nigeria questions, premium beauty Nigeria FAQ, exclusive beauty Nigeria questions',
  openGraph: {
    title: 'FAQ - Elixir Victoria | #1 Luxury Perfume Brand Questions',
    description: 'Get answers to all your questions about Elixir Victoria luxury perfumes, shipping, returns, and more.',
    url: 'https://elixirvictoria.com/faq',
    type: 'website',
  },
}

export default function Page() {
  return <FAQPage />
} 