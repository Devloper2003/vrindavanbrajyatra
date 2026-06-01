import type { Metadata } from 'next'
import GalleryContent from './gallery-content'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Gallery — Braj Bhoomi Photos',
  description: 'Browse our collection of beautiful photos from Vrindavan, Mathura, Govardhan, Barsana, and the sacred Braj Bhoomi. Temples, festivals, darshan, and yatra group photos.',
  path: '/gallery',
  keywords: ['Vrindavan photos', 'Braj Bhoomi images', 'temple gallery', 'Holi photos'],
})

export default function GalleryPage() {
  return <GalleryContent />
}
