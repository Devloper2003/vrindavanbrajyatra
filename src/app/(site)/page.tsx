import HeroSection from '@/components/home/hero-section'
import HighlightsSection from '@/components/home/highlights-section'
import TestimonialsPreview from '@/components/home/testimonials-preview'
import InstagramFeed from '@/components/home/instagram-feed'
import CTASection from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HighlightsSection />
      <TestimonialsPreview />
      <InstagramFeed />
      <CTASection />
    </main>
  )
}
