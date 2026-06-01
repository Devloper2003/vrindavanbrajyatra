import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDestinationBySlug, getAllDestinationSlugs } from '@/lib/destinations-data'
import { generatePageMetadata, generatePlaceJsonLd } from '@/lib/metadata'
import DestinationContent from './destination-content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)

  if (!destination) {
    return { title: 'Destination Not Found' }
  }

  return generatePageMetadata({
    title: `${destination.name} — ${destination.tagline}`,
    description: destination.significance.substring(0, 160),
    path: `/destinations/${slug}`,
    image: destination.heroImage,
    keywords: [destination.name, destination.tagline, 'Braj Bhoomi destination'],
  })
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)

  if (!destination) {
    notFound()
  }

  const placeJsonLd = generatePlaceJsonLd({
    name: destination.name,
    description: destination.significance,
    url: `https://vrindavanbrajyatra.in/destinations/${slug}`,
    image: destination.heroImage,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(placeJsonLd),
        }}
      />
      <DestinationContent destination={destination} />
    </>
  )
}
