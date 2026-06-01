'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { DEFAULT_SECTION_CONTENT, IMAGES } from '@/lib/default-content'
import {
  cinematicTransition,
  butteryTransition,
  slowTransition,
  staggerContainerSlow,
  textReveal,
  fadeInUp,
  defaultViewport,
} from '@/lib/animations'
import {
  FloatingOrb,
  RevealLine,
} from '@/components/decorative/motion-elements'

interface Highlight {
  title: string
  description: string
  image: string
  link: string
}

function getDefaultHighlights(): Highlight[] {
  try {
    return JSON.parse(DEFAULT_SECTION_CONTENT.highlights.content || '[]')
  } catch {
    return [
      { title: 'Vrindavan — The Playground of Krishna', description: 'Home to over 5,000 temples', image: IMAGES.premMandirNight, link: '/destinations/vrindavan' },
      { title: 'Mathura — The Birthplace of Lord Krishna', description: 'Birthplace of Lord Krishna', image: IMAGES.dwarkadhish, link: '/destinations/mathura' },
      { title: 'Govardhan — The Sacred Hill', description: 'The Sacred Hill', image: IMAGES.govardhanHill, link: '/destinations/govardhan' },
      { title: 'Barsana — Radha Rani\'s Abode', description: "Radha Rani's Abode", image: IMAGES.radhaRaniTemple, link: '/destinations/barsana' },
    ]
  }
}

export default function HighlightsSection() {
  const [sectionData, setSectionData] = useState(DEFAULT_SECTION_CONTENT.highlights)
  const [highlights, setHighlights] = useState<Highlight[]>(getDefaultHighlights)

  useEffect(() => {
    fetch('/api/section-content?section=highlights')
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setSectionData(data)
          if (data.content) {
            try {
              const parsed = JSON.parse(data.content)
              if (Array.isArray(parsed) && parsed.length > 0) setHighlights(parsed)
            } catch { /* keep default */ }
          }
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-20 sm:py-28 bg-braj-cream relative overflow-hidden">
      {/* Decorative background */}
      <FloatingOrb
        color="rgba(12, 57, 46, 0.06)"
        size={350}
        top="5%"
        left="-5%"
      />
      <FloatingOrb
        color="rgba(184, 164, 34, 0.05)"
        size={280}
        top="60%"
        right="-8%"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainerSlow}
        >
          <motion.span
            className="text-braj-gold font-medium text-sm tracking-[0.2em] uppercase"
            variants={textReveal}
          >
            Sacred Destinations
          </motion.span>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-braj-dark-green mt-4 leading-tight"
            variants={textReveal}
          >
            {sectionData.title || 'Sacred Destinations of Braj'}
          </motion.h2>

          <motion.p
            className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            variants={textReveal}
          >
            {sectionData.subtitle || 'Discover the divine places that await you on your Braj Yatra'}
          </motion.p>

          <div className="mt-6 max-w-xs mx-auto">
            <RevealLine />
          </div>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainerSlow}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={{ ...cinematicTransition, delay: index * 0.1 }}
            >
              <Link href={item.link} className="group block">
                <article className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 bg-white">
                  {/* Image */}
                  <div className="relative h-52 sm:h-60 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-braj-dark-green/80 via-braj-dark-green/20 to-transparent" />

                    {/* Index badge */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xs font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-bold text-braj-dark-green text-lg mb-2 group-hover:text-braj-teal transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-braj-teal font-medium text-sm mt-4 group-hover:gap-3 transition-all duration-500">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="text-center mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ...slowTransition,
            delay: 0.3,
          }}
        >
          <Link href="/destinations">
            <Button
              size="lg"
              className="bg-braj-dark-green hover:bg-braj-teal text-white font-semibold rounded-full px-8 gap-2 shadow-lg shadow-braj-dark-green/20 hover:shadow-braj-teal/30 transition-all duration-500"
            >
              View All Destinations <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/packages">
            <Button
              size="lg"
              variant="outline"
              className="border-braj-dark-green text-braj-dark-green hover:bg-braj-dark-green hover:text-white font-semibold rounded-full px-8 gap-2 transition-all duration-500"
            >
              View Packages <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
