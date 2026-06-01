'use client'

import { Instagram, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { IMAGES } from '@/lib/default-content'
import {
  fadeInUp,
  staggerContainerSlow,
  cinematicTransition,
  butteryTransition,
  slowTransition,
  textReveal,
  textSlideUp,
  defaultViewport,
} from '@/lib/animations'
import { RevealLine } from '@/components/decorative/motion-elements'

export default function InstagramFeed() {
  const posts = [
    { image: IMAGES.premMandirNight, alt: 'Prem Mandir Vrindavan at night', label: 'Prem Mandir' },
    { image: IMAGES.bankeBihari, alt: 'Banke Bihari Temple', label: 'Banke Bihari' },
    { image: IMAGES.yamunaAarti, alt: 'Yamuna Aarti', label: 'Yamuna Aarti' },
    { image: IMAGES.holiColors, alt: 'Holi Festival in Braj', label: 'Holi Festival' },
    { image: IMAGES.govardhanHill, alt: 'Govardhan Hill', label: 'Govardhan' },
    { image: IMAGES.radhaRaniTemple, alt: 'Radha Rani Temple Barsana', label: 'Radha Rani' },
  ]

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-white via-braj-cream/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ════════ Section Header ════════ */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainerSlow}
        >
          <RevealLine className="w-24 sm:w-36 mx-auto mb-8" />

          <motion.span
            className="text-braj-gold font-medium text-sm tracking-[0.2em] uppercase inline-block"
            variants={textReveal}
            transition={cinematicTransition}
          >
            ✦ Follow Us ✦
          </motion.span>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-braj-dark-green mt-3 leading-tight"
            variants={textSlideUp}
            transition={butteryTransition}
          >
            Divine Moments on Instagram
          </motion.h2>

          <motion.p
            className="text-braj-dark-green/60 text-lg mt-4 max-w-lg mx-auto"
            variants={textReveal}
            transition={slowTransition}
          >
            Glorious glimpses of Braj Bhoomi — temples, festivals & divine grace
          </motion.p>
        </motion.div>

        {/* ════════ Instagram Grid ════════ */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainerSlow}
        >
          {posts.map((post, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              transition={{
                ...cinematicTransition,
                delay: index * 0.1,
              }}
            >
              <a
                href="https://www.instagram.com/vrindavanbrajyatra/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Glass morphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-braj-dark-green/70 via-braj-dark-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-5">
                  <div className="backdrop-blur-md bg-white/15 border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 mb-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Instagram className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-semibold tracking-wide">
                      {post.label}
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* ════════ Follow CTA ════════ */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...slowTransition, delay: 0.4 }}
        >
          <a
            href="https://www.instagram.com/vrindavanbrajyatra/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-braj-teal hover:text-braj-dark-green font-semibold text-lg transition-colors duration-500"
          >
            <Instagram className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            <span>Follow @vrindavanbrajyatra</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <div className="mt-8">
            <RevealLine className="w-20 mx-auto opacity-30" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
