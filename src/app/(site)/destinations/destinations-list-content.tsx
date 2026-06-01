'use client'

import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { destinations } from '@/lib/destinations-data'
import {
  cinematicTransition,
  butteryTransition,
  fadeInUp,
  staggerContainerSlow,
  textReveal,
  defaultViewport,
} from '@/lib/animations'
import {
  FloatingOrb,
  RevealLine,
} from '@/components/decorative/motion-elements'

export default function DestinationsListContent() {
  return (
    <main className="pt-16 sm:pt-20">
      {/* Hero Banner */}
      <section className="relative py-24 sm:py-40 bg-braj-dark-green overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-braj-dark-green/90 via-braj-teal/70 to-braj-dark-green/90" />

        <FloatingOrb color="rgba(247, 184, 8, 0.07)" size={400} top="-15%" left="-10%" />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
        >
          <motion.span
            className="text-braj-saffron font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2"
            variants={textReveal}
          >
            <Sparkles className="w-4 h-4" /> Sacred Destinations
          </motion.span>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mt-4 mb-5"
            variants={textReveal}
          >
            Explore the Divine Braj Bhoomi
          </motion.h1>
          <RevealLine className="mx-auto w-24 mb-5" />
          <motion.p
            className="text-white/80 text-lg max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={butteryTransition}
          >
            Discover the six sacred destinations where Lord Krishna performed his eternal pastimes.
            Each place resonates with divine love and spiritual significance.
          </motion.p>
        </motion.div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 sm:py-24 bg-braj-cream relative overflow-hidden">
        <FloatingOrb color="rgba(12, 57, 46, 0.04)" size={300} top="30%" left="90%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainerSlow}
          >
            {destinations.map((dest) => (
              <motion.div
                key={dest.slug}
                variants={fadeInUp}
              >
                <Link href={`/destinations/${dest.slug}`} className="group block h-full">
                  <article className="rounded-2xl overflow-hidden bg-white shadow-md h-full flex flex-col hover:shadow-xl transition-shadow duration-500">
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-braj-dark-green/80 via-braj-dark-green/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="text-2xl font-bold text-white mb-1">{dest.name}</h2>
                        <p className="text-braj-saffron text-sm font-medium">{dest.tagline}</p>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                        {dest.significance.substring(0, 180)}...
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {dest.keyAttractions.length} Attractions
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {dest.festivals.length} Festivals
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-braj-teal font-medium text-sm group-hover:gap-2 transition-all duration-300">
                          Explore <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-braj-teal via-braj-dark-green to-braj-teal relative overflow-hidden">
        <FloatingOrb color="rgba(247, 184, 8, 0.06)" size={300} top="10%" left="70%" />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainerSlow}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            variants={textReveal}
          >
            Ready to Embark on Your Braj Yatra?
          </motion.h2>
          <RevealLine className="mx-auto w-20 mb-5" />
          <motion.p
            className="text-white/80 text-lg mb-8"
            variants={fadeInUp}
            transition={butteryTransition}
          >
            Let us plan your perfect pilgrimage to these sacred destinations.
            Our expert guides will ensure a deeply spiritual and comfortable experience.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeInUp}
            transition={{ ...cinematicTransition, delay: 0.3 }}
          >
            <Link href="/packages">
              <Button size="lg" className="bg-braj-saffron text-braj-dark-green hover:bg-braj-gold font-bold px-8 gap-2 rounded-full">
                View Packages <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="https://wa.me/918923944869" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 gap-2 rounded-full">
                Chat on WhatsApp
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
