import type { Metadata } from 'next'
import AboutContent from './about-content'
import { generatePageMetadata, generateLocalBusinessJsonLd } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about Vrindavan Braj Yatra — your trusted companion for divine pilgrimage experiences in Braj Bhoomi. Discover our story, mission, and why thousands of devotees choose us.',
  path: '/about',
  keywords: ['about Vrindavan Braj Yatra', 'Braj Yatra story', 'pilgrimage service'],
})

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessJsonLd()),
        }}
      />
      <AboutContent />
    </>
  )
}
