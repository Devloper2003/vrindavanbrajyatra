'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Heart, Eye, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { DEFAULT_SECTION_CONTENT, IMAGES } from '@/lib/default-content'
import {
  cinematicTransition,
  butteryTransition,
  slowTransition,
  springTransition,
  fadeInUp,
  scaleIn,
  staggerContainer,
  staggerContainerSlow,
  textReveal,
  textSlideUp,
  defaultViewport,
} from '@/lib/animations'
import {
  FloatingOrb,
  RevealLine,
} from '@/components/decorative/motion-elements'

interface WhyChooseUs {
  title: string
  desc: string
}

function getDefaultParsedContent() {
  try {
    return JSON.parse(DEFAULT_SECTION_CONTENT.about.content || '{}')
  } catch {
    return {
      story: 'Vrindavan Braj Yatra was born from a deep love for the sacred land of Braj.',
      mission: 'To make the sacred Braj Yatra accessible, comfortable, and deeply spiritual for every devotee.',
      vision: 'To be the most trusted and beloved Braj Yatra service.',
      whyChooseUs: [],
      image: IMAGES.iskconDeities,
    }
  }
}

export default function AboutContent() {
  const [sectionData, setSectionData] = useState(DEFAULT_SECTION_CONTENT.about)
  const [parsedContent, setParsedContent] = useState(getDefaultParsedContent)

  useEffect(() => {
    fetch('/api/section-content?section=about')
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setSectionData(data)
          if (data.content) {
            try {
              setParsedContent(JSON.parse(data.content))
            } catch { /* keep default */ }
          }
        }
      })
      .catch(() => {})
  }, [])

  const content = parsedContent || getDefaultParsedContent()

  const iconMap = [
    <Sparkles key="0" className="w-6 h-6" />,
    <Heart key="1" className="w-6 h-6" />,
    <CheckCircle key="2" className="w-6 h-6" />,
    <ArrowRight key="3" className="w-6 h-6" />,
    <Eye key="4" className="w-6 h-6" />,
    <Sparkles key="5" className="w-6 h-6" />,
  ]

  return (
    <main className="pt-16 sm:pt-20">
      {/* ═══ Hero Banner ═══ */}
      <section className="relative py-24 sm:py-40 bg-braj-dark-green overflow-hidden" aria-label="About page hero">
        <div className="absolute inset-0">
          <img src={IMAGES.vrindavanOverview} alt="Vrindavan panorama" className="w-full h-full object-cover opacity-20" loading="lazy" />
        </div>
        <FloatingOrb color="rgba(247, 184, 8, 0.06)" size={350} top="-5%" left="60%" />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
        >
          <motion.span
            className="text-braj-saffron font-medium text-sm tracking-wider uppercase"
            variants={textReveal}
            transition={cinematicTransition}
          >
            About Us
          </motion.span>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6"
            variants={textSlideUp}
            transition={slowTransition}
          >
            {sectionData.title || 'About Vrindavan Braj Yatra'}
          </motion.h1>
          <motion.p
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={butteryTransition}
          >
            {sectionData.subtitle || 'Your trusted companion for divine pilgrimage experiences in Braj Bhoomi'}
          </motion.p>
          <RevealLine className="mt-8 mx-auto max-w-xs" />
        </motion.div>
      </section>

      {/* ═══ Story Section ═══ */}
      <section className="py-20 sm:py-28 bg-braj-cream relative overflow-hidden" aria-label="Our story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainerSlow}
            >
              <motion.span
                className="text-braj-gold font-medium text-sm tracking-wider uppercase"
                variants={textReveal}
                transition={cinematicTransition}
              >
                Our Story
              </motion.span>
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-braj-dark-green mt-3 mb-8"
                variants={textSlideUp}
                transition={slowTransition}
              >
                The Story Behind Vrindavan Braj Yatra
              </motion.h2>
              <RevealLine className="mb-8 max-w-[120px]" />
              <motion.p
                className="text-muted-foreground leading-relaxed text-base sm:text-lg"
                variants={fadeInUp}
                transition={butteryTransition}
              >
                {content.story}
              </motion.p>
            </motion.div>

            <motion.div
              className="rounded-2xl overflow-hidden shadow-2xl relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={slowTransition}
            >
              <img
                src={content.image}
                alt="Radha Krishna Darshan"
                className="w-full h-72 sm:h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-braj-dark-green/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Mission & Vision ═══ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden" aria-label="Mission and Vision">
        <FloatingOrb color="rgba(247, 184, 8, 0.05)" size={300} top="10%" right="-5%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainerSlow}
          >
            <motion.span
              className="text-braj-gold font-medium text-sm tracking-wider uppercase"
              variants={textReveal}
              transition={cinematicTransition}
            >
              Our Purpose
            </motion.span>
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-braj-dark-green mt-3"
              variants={textSlideUp}
              transition={slowTransition}
            >
              Mission &amp; Vision
            </motion.h2>
            <RevealLine className="mt-6 mx-auto max-w-xs" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainerSlow}
          >
            {/* Mission Card */}
            <motion.div
              variants={fadeInUp}
              transition={cinematicTransition}
            >
              <article className="bg-gradient-to-br from-braj-dark-green to-braj-teal rounded-2xl p-8 sm:p-10 text-white h-full relative overflow-hidden hover:shadow-xl transition-shadow duration-500">
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-braj-saffron/20 rounded-xl flex items-center justify-center mb-5">
                    <Heart className="w-7 h-7 text-braj-saffron" />
                  </div>
                  <h3 className="text-2xl font-bold mb-5">Our Mission</h3>
                  <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                    {content.mission}
                  </p>
                </div>
              </article>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={fadeInUp}
              transition={{ ...cinematicTransition, delay: 0.15 }}
            >
              <article className="bg-gradient-to-br from-braj-teal to-braj-dark-green rounded-2xl p-8 sm:p-10 text-white h-full relative overflow-hidden hover:shadow-xl transition-shadow duration-500">
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-braj-saffron/20 rounded-xl flex items-center justify-center mb-5">
                    <Eye className="w-7 h-7 text-braj-saffron" />
                  </div>
                  <h3 className="text-2xl font-bold mb-5">Our Vision</h3>
                  <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                    {content.vision}
                  </p>
                </div>
              </article>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Why Choose Us ═══ */}
      <section className="py-20 sm:py-28 bg-braj-cream relative overflow-hidden" aria-label="Why Choose Us">
        <FloatingOrb color="rgba(12, 57, 46, 0.05)" size={350} top="5%" left="50%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainerSlow}
          >
            <motion.span
              className="text-braj-gold font-medium text-sm tracking-wider uppercase"
              variants={textReveal}
              transition={cinematicTransition}
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-braj-dark-green mt-3"
              variants={textSlideUp}
              transition={slowTransition}
            >
              What Makes Us Different
            </motion.h2>
            <RevealLine className="mt-6 mx-auto max-w-xs" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainerSlow}
          >
            {content.whyChooseUs.map((item: WhyChooseUs, index: number) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ ...cinematicTransition, delay: index * 0.08 }}
              >
                <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-md h-full relative overflow-hidden group hover:shadow-xl transition-shadow duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-braj-dark-green/[0.02] to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-braj-dark-green/10 rounded-xl flex items-center justify-center mb-5 text-braj-dark-green group-hover:scale-110 transition-transform duration-500">
                      {iconMap[index] || <CheckCircle className="w-6 h-6" />}
                    </div>
                    <h3 className="font-bold text-braj-dark-green text-lg mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA Section ═══ */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-braj-teal via-braj-dark-green to-braj-teal relative overflow-hidden" aria-label="Call to action">
        <FloatingOrb color="rgba(247, 184, 8, 0.08)" size={400} top="-10%" left="20%" />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainerSlow}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6"
            variants={textSlideUp}
            transition={slowTransition}
          >
            Ready to Begin Your Sacred Journey?
          </motion.h2>
          <RevealLine className="mb-6 mx-auto max-w-xs" />
          <motion.p
            className="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={butteryTransition}
          >
            Let us plan your perfect Braj Yatra. Contact us today and take the first step towards a divine experience.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={scaleIn}
            transition={springTransition}
          >
            <Link href="/packages">
              <Button size="lg" className="bg-braj-saffron text-braj-dark-green hover:bg-braj-gold font-bold px-8 py-6 gap-2 rounded-full text-base group">
                Explore Packages <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-bold px-8 py-6 rounded-full bg-transparent text-base">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
