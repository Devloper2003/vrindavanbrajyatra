import type { Metadata } from 'next'
import BlogContent from './blog-content'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog — Braj Yatra Stories & Guide',
  description: 'Read our latest blogs about Vrindavan, Mathura, Braj Yatra experiences, temple guides, festival celebrations, and spiritual insights from the holy land of Braj Bhoomi.',
  path: '/blog',
  keywords: ['Vrindavan blog', 'Braj Yatra stories', 'temple guide', 'Holi festival blog'],
})

export default function BlogPage() {
  return <BlogContent />
}
