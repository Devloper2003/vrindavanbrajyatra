import type { Metadata } from 'next'
import PackagesContent from './packages-content'
import { generatePageMetadata, generateProductJsonLd } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Braj Yatra Packages',
  description: 'Choose from our carefully designed Braj Yatra packages — Same Day, 2-Day, 3-Day, and Custom options. Affordable pilgrimage tours for Vrindavan, Mathura, Govardhan, Barsana & more.',
  path: '/packages',
  keywords: ['Braj Yatra packages', 'Vrindavan tour package', 'Mathura tour price', 'Braj Yatra cost'],
})

export default function PackagesPage() {
  const packagesJsonLd = [
    generateProductJsonLd({ name: 'Same Day Braj Darshan', description: 'Quick Braj darshan package', price: '1499', url: 'https://vrindavanbrajyatra.in/packages#one-day' }),
    generateProductJsonLd({ name: '2-Day Braj Yatra', description: 'Complete 2-day Braj experience', price: '3499', url: 'https://vrindavanbrajyatra.in/packages#two-day' }),
    generateProductJsonLd({ name: '3-Day Complete Braj Yatra', description: 'Most complete Braj experience', price: '5999', url: 'https://vrindavanbrajyatra.in/packages#three-day' }),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(packagesJsonLd),
        }}
      />
      <PackagesContent />
    </>
  )
}
