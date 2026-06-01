'use client'

import { useEffect, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEFAULT_SECTION_CONTENT } from '@/lib/default-content'
import {
  cinematicTransition,
  butteryTransition,
  staggerContainerSlow,
  textReveal,
  fadeInUp,
  defaultViewport,
} from '@/lib/animations'
import {
  FloatingOrb,
  RevealLine,
} from '@/components/decorative/motion-elements'

interface Testimonial {
  name: string
  location: string
  quote: string
  rating: number
  package: string
}

function getDefaultTestimonials(): Testimonial[] {
  try {
    return JSON.parse(DEFAULT_SECTION_CONTENT.testimonials.content || '[]')
  } catch {
    return []
  }
}

export default function TestimonialsPreview() {
  const [sectionData, setSectionData] = useState(DEFAULT_SECTION_CONTENT.testimonials)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getDefaultTestimonials)

  useEffect(() => {
    fetch('/api/section-content?section=testimonials')
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setSectionData(data)
          if (data.content) {
            try {
              const parsed = JSON.parse(data.content)
              if (Array.isArray(parsed) && parsed.length > 0) setTestimonials(parsed)
            } catch { /* keep default */ }
          }
        }
      })
      .catch(() => {})
  }, [])

  const displayTestimonials = testimonials.slice(0, 3)

  return (
    <section className="py-20 sm:py-28 bg-braj-dark-green relative overflow-hidden">
      {/* Decorative elements */}
      <FloatingOrb
        color="rgba(247, 184, 8, 0.06)"
        size={350}
        top="0%"
        left="-5%"
      />

      {/* Static mandala SVGs (no infinite rotation) */}
      <div className="absolute -top-20 -right-20 w-72 h-72 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="#B8A422" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#B8A422" strokeWidth="0.3" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180
            return <line key={i} x1="100" y1="100" x2={100 + 90 * Math.cos(angle)} y2={100 + 90 * Math.sin(angle)} stroke="#B8A422" strokeWidth="0.3" />
          })}
        </svg>
      </div>

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
            className="text-braj-saffron font-medium text-sm tracking-[0.2em] uppercase"
            variants={textReveal}
          >
            Testimonials
          </motion.span>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
            variants={textReveal}
          >
            {sectionData.title || 'Blessed Devotees Share Their Experience'}
          </motion.h2>

          <motion.p
            className="text-white/60 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            variants={textReveal}
          >
            {sectionData.subtitle || 'Hear from pilgrims who experienced the divine Braj Yatra'}
          </motion.p>

          <div className="mt-6 max-w-xs mx-auto">
            <RevealLine className="from-transparent via-braj-saffron to-transparent" />
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainerSlow}
        >
          {displayTestimonials.map((t, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={{ ...cinematicTransition, delay: index * 0.15 }}
            >
              <div className="glass rounded-2xl p-6 sm:p-8 relative group transition-all duration-500 hover:bg-white/12 hover:shadow-xl">
                {/* Accent line at top */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-braj-saffron/30 to-transparent" />

                {/* Quote Icon */}
                <div className="mb-5">
                  <Quote className="w-8 h-8 text-braj-saffron" />
                </div>

                {/* Quote Text */}
                <motion.p
                  className="text-white/85 text-sm sm:text-base leading-relaxed mb-6 italic"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    ...butteryTransition,
                    delay: 0.3 + index * 0.15,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </motion.p>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < t.rating ? 'fill-braj-saffron text-braj-saffron' : 'text-white/20'}`}
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-braj-saffron/20 border border-braj-saffron/30 flex items-center justify-center text-braj-saffron font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.location} &bull; {t.package}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
