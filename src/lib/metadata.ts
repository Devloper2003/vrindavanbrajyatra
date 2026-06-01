import { Metadata } from 'next'

const BASE_URL = 'https://vrindavanbrajyatra.in'
const SITE_NAME = 'Vrindavan Braj Yatra'
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1657089975754-c93bde43b01e?w=1200&q=80'

interface MetadataOptions {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  keywords?: string[]
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords = [],
}: MetadataOptions): Metadata {
  const url = `${BASE_URL}${path}`
  const fullTitle = path ? `${title} | ${SITE_NAME}` : title

  return {
    title: fullTitle,
    description,
    keywords: [
      'Braj Yatra', 'Vrindavan Darshan', 'Mathura Vrindavan Tour',
      'Braj Bhoomi', 'Pilgrimage Tour', ...keywords,
    ],
    authors: [{ name: SITE_NAME }],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

// JSON-LD helpers
export function generateArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  authorName = SITE_NAME,
}: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  authorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image,
    datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
  }
}

export function generateProductJsonLd({
  name,
  description,
  price,
  priceCurrency = 'INR',
  url,
}: {
  name: string
  description: string
  price: string
  priceCurrency?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    offers: {
      '@type': 'Offer',
      price: price.replace(/[^0-9.]/g, ''),
      priceCurrency,
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'TravelAgency',
      name: SITE_NAME,
    },
  }
}

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_NAME,
    description: 'Best pilgrimage tour packages for Braj Bhoomi - Vrindavan, Mathura, Govardhan, Barsana, Nandgaon & Gokul',
    url: BASE_URL,
    telephone: '+918923944869',
    email: 'tour@vrindavanbrajyatra.in',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Infront of Kailash Nagar, Near Shani Dev Mandir, Mathura Vrindavan Road',
      addressLocality: 'Vrindavan',
      addressRegion: 'Uttar Pradesh',
      postalCode: '281121',
      addressCountry: 'IN',
    },
    image: DEFAULT_OG_IMAGE,
    priceRange: '₹1,499 - ₹9,999+',
    sameAs: ['https://www.instagram.com/vrindavanbrajyatra/'],
    openingHours: ['Mo-Sa 06:00-21:00', 'Su 07:00-18:00'],
  }
}

export function generatePlaceJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string
  description: string
  url: string
  image: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name,
    description,
    url,
    image,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
  }
}
