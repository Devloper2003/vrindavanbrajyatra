'use client'

import Link from 'next/link'
import { Phone, ArrowRight, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  textReveal,
  textSlideUp,
  scaleIn,
  fadeInUp,
  staggerContainerSlow,
  cinematicTransition,
  butteryTransition,
  slowTransition,
  defaultViewport,
} from '@/lib/animations'
import { FloatingOrb, RevealLine } from '@/components/decorative/motion-elements'

export default function CTASection() {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-br from-braj-dark-green via-braj-teal to-braj-dark-green overflow-hidden">
      {/* ── Decorative orb (max 1) ── */}
      <FloatingOrb
        color="rgba(247, 184, 8, 0.10)"
        size={400}
        top="-5%"
        left="5%"
      />

      {/* ── Ambient radial glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-braj-gold/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={scaleIn}
      >
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainerSlow}
        >
          <RevealLine className="w-32 sm:w-48 mb-8" />

          <motion.span
            className="text-braj-saffron font-medium text-sm tracking-[0.2em] uppercase"
            variants={textReveal}
            transition={cinematicTransition}
          >
            ✦ Start Your Journey ✦
          </motion.span>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6 leading-tight"
            variants={textSlideUp}
            transition={butteryTransition}
          >
            Ready to Experience the
            <br />
            <span className="text-braj-gold">Divine Braj Bhoomi?</span>
          </motion.h2>

          <motion.p
            className="text-white/75 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={textReveal}
            transition={slowTransition}
          >
            Book your Braj Yatra today and let devotion guide your path.
            Our team is ready to plan your perfect spiritual journey.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            variants={fadeInUp}
            transition={{ ...cinematicTransition, delay: 0.3 }}
          >
            {/* Primary CTA */}
            <Link href="/contact">
              <div className="relative group">
                <div className="absolute -inset-1 bg-braj-saffron/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Button
                  size="lg"
                  className="relative bg-braj-saffron text-braj-dark-green hover:bg-braj-gold font-bold text-base px-8 py-6 gap-2 rounded-full shadow-lg shadow-braj-saffron/20 overflow-hidden"
                >
                  <span className="relative flex items-center gap-2">
                    Book Your Yatra
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </Link>

            {/* WhatsApp Us */}
            <a href="https://wa.me/918923944689" target="_blank" rel="noopener noreferrer">
              <div className="relative group">
                <div className="absolute -inset-1 bg-green-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Button
                  size="lg"
                  variant="outline"
                  className="relative border-white/25 text-white hover:bg-white/10 hover:border-white/40 font-bold text-base px-8 py-6 gap-2 rounded-full bg-white/5 backdrop-blur-sm"
                >
                  <span className="relative flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </span>
                </Button>
              </div>
            </a>

            {/* Call Now */}
            <a href="tel:+918923944689">
              <div className="relative group">
                <div className="absolute -inset-1 bg-braj-gold/15 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Button
                  size="lg"
                  variant="outline"
                  className="relative border-white/25 text-white hover:bg-white/10 hover:border-white/40 font-bold text-base px-8 py-6 gap-2 rounded-full bg-white/5 backdrop-blur-sm"
                >
                  <span className="relative flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </span>
                </Button>
              </div>
            </a>
          </motion.div>

          <motion.div
            className="mt-12 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...cinematicTransition, delay: 0.6 }}
          >
            <RevealLine className="w-24 mx-auto opacity-40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
