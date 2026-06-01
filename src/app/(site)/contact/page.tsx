import type { Metadata } from 'next'
import ContactContent from './contact-content'
import { generatePageMetadata, generateLocalBusinessJsonLd } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us — Plan Your Braj Yatra',
  description: 'Contact Vrindavan Braj Yatra to plan your divine pilgrimage. Call +91 89239 44869, WhatsApp, or fill out our enquiry form. Located in Vrindavan, Mathura.',
  path: '/contact',
  keywords: ['contact Braj Yatra', 'Vrindavan tour booking', 'Braj Yatra enquiry'],
})

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessJsonLd()),
        }}
      />
      <ContactContent />
    </>
  )
}
