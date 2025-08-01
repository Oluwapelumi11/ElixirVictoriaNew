"use client"

import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: "What makes Elixir Victoria the #1 luxury perfume brand in Nigeria?",
    answer: "Elixir Victoria stands as the #1 luxury perfume brand in Nigeria through our commitment to exceptional quality, rare ingredients, and unparalleled craftsmanship. Our Victoria Nocturne fragrance, crafted with premium oud, rare florals, and exclusive ingredients, represents the pinnacle of luxury perfumery. We offer bespoke services, personalized consultations, and a curated collection that defines sophistication and exclusivity in the Nigerian luxury market."
  },
  {
    question: "How do I choose the perfect luxury perfume for me?",
    answer: "Choosing the perfect luxury perfume involves understanding your preferences and lifestyle. Start by identifying your preferred fragrance families - floral, oriental, woody, or fresh. Consider your skin chemistry, as perfumes react differently on each person. Test fragrances on your skin and wear them for a few hours to experience the full development. Our expert consultants can guide you through this process, helping you find your signature scent that reflects your personality and lifestyle."
  },
  {
    question: "What is Victoria Nocturne and why is it so special?",
    answer: "Victoria Nocturne is our flagship luxury fragrance that embodies sophistication and sensuality. This exceptional perfume features a complex blend of rare ingredients including premium oud, jasmine sambac, and sandalwood. The fragrance opens with vibrant citrus notes, evolves into elegant florals, and settles into a warm, sensual base. With 18-hour longevity and exceptional sillage, Victoria Nocturne represents the ultimate luxury experience, making it the most sought-after fragrance in Nigeria."
  },
  {
    question: "How does your bespoke perfume service work?",
    answer: "Our bespoke perfume service is the ultimate luxury experience. It begins with a comprehensive consultation where we explore your personality, preferences, and lifestyle. Our master perfumers then create a unique fragrance using rare and premium ingredients. The process includes multiple iterations to perfect your signature scent, ensuring it's truly one-of-a-kind. This exclusive service typically takes 4-6 weeks and includes a personalized presentation box and detailed fragrance notes."
  },
  {
    question: "Do you ship nationwide in Nigeria?",
    answer: "Yes, we offer nationwide shipping across Nigeria with secure, tracked delivery. Our premium packaging ensures your luxury fragrances arrive in perfect condition. We provide free shipping on orders above ₦50,000, and standard delivery takes 2-5 business days. For urgent orders, we offer express delivery options. All packages are fully insured and require signature confirmation for your security."
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We offer a 30-day return policy for all unopened and unused products in their original packaging. Due to the personal nature of fragrances, we cannot accept returns on opened products for hygiene reasons. However, if you're unsatisfied with your purchase, we offer fragrance consultations and exchanges for alternative scents. Our customer service team is dedicated to ensuring your complete satisfaction with every Elixir Victoria experience."
  },
  {
    question: "How long do your luxury perfumes last?",
    answer: "Our luxury perfumes are formulated for exceptional longevity. Victoria Nocturne lasts up to 18 hours on the skin, while our other fragrances provide 8-12 hours of wear. The longevity depends on factors like skin type, climate, and application method. We recommend applying to pulse points and using our matching body products to enhance longevity. Our fragrances are designed to evolve beautifully throughout the day, maintaining their sophisticated character."
  },
  {
    question: "Are your perfumes suitable for sensitive skin?",
    answer: "Yes, all Elixir Victoria fragrances are formulated with skin-friendly ingredients and undergo rigorous testing for sensitivity. We use high-quality, hypoallergenic ingredients and avoid common irritants. However, we recommend testing on a small area first if you have very sensitive skin. Our fragrances are alcohol-based but contain moisturizing agents to prevent dryness. We also offer fragrance-free alternatives for those with extreme sensitivities."
  },
  {
    question: "Can I layer different Elixir Victoria fragrances?",
    answer: "Absolutely! Fragrance layering is an art that we encourage. Our fragrances are designed to complement each other beautifully. You can layer Victoria Nocturne with our body care products for enhanced longevity, or combine different fragrances to create your unique scent profile. We recommend starting with lighter fragrances as a base and adding stronger notes on top. Our expert consultants can guide you through the perfect layering combinations for your style."
  },
  {
    question: "Do you offer gift wrapping and personalization?",
    answer: "Yes, we provide exquisite gift wrapping and personalization services. Our luxury gift boxes feature premium materials and elegant design, perfect for special occasions. We offer personalized messages, custom packaging, and even bespoke gift experiences. For corporate clients, we provide branded packaging and bulk gift solutions. Our gift service includes complimentary samples and care instructions to enhance the luxury experience."
  },
  {
    question: "How can I become a VIP customer?",
    answer: "Our VIP program offers exclusive benefits including early access to new collections, private consultations, bespoke services, and exclusive events. VIP members receive personalized fragrance recommendations, priority customer service, and invitations to luxury events. To become a VIP, you can apply through our website or be invited based on your purchase history and engagement with our brand. VIP membership includes complimentary consultations and exclusive product previews."
  },
  {
    question: "What makes your luxury body care products special?",
    answer: "Our luxury body care products are formulated with the same attention to detail as our fragrances. We use premium ingredients like honey, sugar, and rare botanical extracts. Our products are designed to complement our fragrances, creating a complete luxury experience. Each product is crafted in small batches to ensure quality and freshness. Our body care range includes scrubs, lotions, and oils that enhance fragrance longevity while providing exceptional skincare benefits."
  }
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors"
      >
        <h3 className="text-white font-medium text-body-lg">{question}</h3>
        {isOpen ? (
          <Minus size={24} className="text-yellow-500 flex-shrink-0" />
        ) : (
          <Plus size={24} className="text-yellow-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-heading-xl font-serif text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-body-lg text-gray-400 max-w-2xl mx-auto">
            Get answers to all your questions about Elixir Victoria luxury perfumes, shipping, returns, and more.
          </p>
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            })
          }}
        />

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-heading-lg font-serif text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-body-lg text-gray-400 mb-8">
            Our luxury fragrance experts are here to help you find your perfect scent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/2347048928368"
              className="btn-luxury inline-flex items-center justify-center"
            >
              Contact via WhatsApp
            </a>
            <a
              href="mailto:info@elixirvictoria.com"
              className="btn-luxury-outline inline-flex items-center justify-center"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 