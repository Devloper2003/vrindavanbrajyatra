import type { Metadata } from 'next'
import DestinationsListContent from './destinations-list-content'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Sacred Destinations of Braj',
  description: 'Explore the sacred destinations of Braj Bhoomi — Vrindavan, Mathura, Govardhan, Barsana, Nandgaon & Gokul. Discover the divine places where Lord Krishna performed his eternal pastimes.',
  path: '/destinations',
  keywords: ['Braj destinations', 'Vrindavan', 'Mathura', 'Govardhan', 'Barsana', 'Nandgaon', 'Gokul'],
})

export default function DestinationsPage() {
  return <DestinationsListContent />
}
