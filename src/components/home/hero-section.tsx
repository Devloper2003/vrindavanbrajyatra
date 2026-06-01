'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { DEFAULT_SECTION_CONTENT, IMAGES } from '@/lib/default-content'
import {
  cinematicTransition,
  butteryTransition,
  slowTransition,
  springTransition,
  textReveal,
  fadeInUp,
  staggerContainer,
  staggerContainerSlow,
  defaultViewport,
} from '@/lib/animations'
import FloatingParticles from '@/components/decorative/floating-particles'
import MandalaBg from '@/components/decorative/mandala-bg'
import { FloatingOrb, RevealLine } from '@/components/decorative/motion-elements'

// ─── Simple Stat Card (no mouse tracking) ────────────────────────
function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      className="relative cursor-default"
      variants={fadeInUp}
      transition={{ ...cinematicTransition, delay }}
    >
      <div className="relative px-4 sm:px-6 py-4 sm:py-5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/[0.08]">
        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(247, 184, 8, 0.08), transparent 60%)',
          }}
        />
        <div className="relative">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-braj-saffron tracking-tight">
            {value}
          </div>
          <div className="text-white/60 text-xs sm:text-sm mt-1 font-medium">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── MAIN HERO SECTION ─────────────────────────────────────────
export default function HeroSection() {
  const [content, setContent] = useState(DEFAULT_SECTION_CONTENT.hero)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 1000], [0, 250])
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const contentY = useTransform(scrollY, [0, 500], [0, 100])

  useEffect(() => {
    fetch('/api/section-content?section=hero')
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setContent({
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
          })
        }
      })
      .catch(() => {})
      .finally(() => setIsLoaded(true))
  }, [])

  const parsedContent = content.content ? JSON.parse(content.content) : {}
  const bgImage = parsedContent.backgroundImage || IMAGES.hero

  const stats = [
    { value: '5000+', label: 'Happy Devotees' },
    { value: '4.9★', label: 'Rating' },
    { value: '8+', label: 'Years of Service' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── BACKGROUND IMAGE ── */}
      <motion.div
        className="absolute inset-0 -top-10 -bottom-10"
        style={{ y: bgY }}
      >
        <img
          src={bgImage}
          alt="Vrindavan Braj Bhoomi"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-braj-dark-green/70 via-braj-dark-green/50 to-braj-dark-green/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-braj-dark-green/40 via-transparent to-braj-dark-green/40" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(12, 57, 46, 0.4) 100%)',
          }}
        />
      </motion.div>

      {/* ── Decorative Layer ── */}
      <div className="absolute inset-0 pointer-events-none">
        <MandalaBg />

        {/* ── Floating Orbs (max 2) ── */}
        <FloatingOrb
          color="rgba(247, 184, 8, 0.06)"
          size={400}
          top="5%"
          left="-5%"
        />
        <FloatingOrb
          color="rgba(12, 103, 117, 0.06)"
          size={350}
          top="60%"
          right="-8%"
        />
      </div>

      {/* ── FLOATING PARTICLES ── */}
      <FloatingParticles />

      {/* ── HERO CONTENT ── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-24"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          animate="visible"
        >
          {/* ── Greeting Tag ── */}
          <motion.div
            variants={textReveal}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-braj-saffron text-sm sm:text-base font-medium tracking-[0.2em] uppercase">
              <span className="w-8 h-[1px] bg-braj-saffron/60" />
              🙏 Radhe Radhe 🙏
              <span className="w-8 h-[1px] bg-braj-saffron/60" />
            </span>
          </motion.div>

          {/* ── Reveal Line ── */}
          <motion.div variants={fadeInUp} className="mb-8">
            <RevealLine className="max-w-[120px] mx-auto" />
          </motion.div>

          {/* ── MAIN TITLE ── */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            variants={textReveal}
          >
            {content.title || 'Experience the Divine Essence of Braj Bhoomi'}
          </motion.h1>

          {/* ── SUBTITLE ── */}
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
            variants={textReveal}
          >
            {content.subtitle || 'Embark on a sacred journey through the holy land of Lord Krishna'}
          </motion.p>

          {/* ── CTA BUTTONS ── */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Link href="/packages">
                <Button
                  size="lg"
                  className="bg-braj-saffron text-braj-dark-green hover:bg-braj-gold font-bold text-base px-8 sm:px-10 py-6 sm:py-7 gap-2 rounded-full shadow-lg shadow-braj-saffron/20 hover:shadow-xl hover:shadow-braj-saffron/30 transition-all duration-500"
                >
                  {parsedContent.ctaPrimary || 'Explore Packages'}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <a href="https://wa.me/918923944869" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 hover:border-white/40 font-bold text-base px-8 sm:px-10 py-6 sm:py-7 gap-2 rounded-full bg-white/[0.04] backdrop-blur-sm transition-all duration-500"
                >
                  <Play className="w-5 h-5" />
                  {parsedContent.ctaSecondary || 'Watch Yatra Video'}
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* ── STATS ── */}
          <motion.div
            className="mt-14 sm:mt-20 grid grid-cols-3 gap-3 sm:gap-5 max-w-lg sm:max-w-xl mx-auto"
            variants={staggerContainerSlow}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={i * 0.15}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...butteryTransition, delay: 2.0 }}
      >
        <span className="text-white/40 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-light">
          Scroll
        </span>
        <div
          className="relative w-5 h-8 border border-white/20 rounded-full flex items-start justify-center"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
          }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-braj-saffron/70 mt-1.5"
            animate={{
              y: [0, 12, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="w-4 h-4 text-white/25" />
        </motion.div>
      </motion.div>

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-braj-cream to-transparent z-10 pointer-events-none" />
    </section>
  )
}
