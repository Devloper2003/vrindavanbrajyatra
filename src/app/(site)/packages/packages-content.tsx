'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, X, ArrowRight, Clock, MapPin, Users, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { DEFAULT_SECTION_CONTENT, IMAGES } from '@/lib/default-content'
import {
  cinematicTransition,
  butteryTransition,
  slowTransition,
  springTransition,
  fadeInUp,
  fadeIn,
  fadeInDown,
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

interface Package {
  id: string
  name: string
  price: string
  pricePer: string
  duration: string
  places: string[]
  inclusions: string[]
  exclusions: string[]
  idealFor: string
  popular: boolean
  color: string
}

function getDefaultPackages(): Package[] {
  return [
    {
      id: 'one-day', name: 'Same Day Braj Darshan', price: '₹1,499', pricePer: 'per person', duration: '1 Day',
      places: ['Vrindavan Temple Tour', 'Banke Bihari Darshan', 'ISKCON Temple', 'Prem Mandir', 'Mathura (if time permits)'],
      inclusions: ['AC Vehicle', 'Pickup & Drop', 'Driver cum Guide', 'Toll & Parking', 'Water Bottle'],
      exclusions: ['Meals', 'Pooja Samagri', 'Accommodation', 'Entry Tickets'],
      idealFor: 'Devotees with limited time wanting a quick Braj darshan', popular: false, color: 'braj-teal',
    },
    {
      id: 'two-day', name: '2-Day Braj Yatra', price: '₹3,499', pricePer: 'per person', duration: '2 Days / 1 Night',
      places: ['Day 1: Vrindavan Temples', 'Banke Bihari, ISKCON, Prem Mandir', 'Yamuna Aarti at Keshi Ghat', 'Day 2: Mathura — Krishna Janmabhoomi, Dwarkadhish', 'Govardhan Parikrama'],
      inclusions: ['AC Vehicle', '1 Night Stay', 'Breakfast', 'Driver cum Guide', 'Toll & Parking', 'Pickup & Drop'],
      exclusions: ['Lunch & Dinner', 'Pooja Samagri', 'Entry Tickets'],
      idealFor: 'Devotees wanting a complete Braj experience at comfortable pace', popular: true, color: 'braj-dark-green',
    },
    {
      id: 'three-day', name: '3-Day Complete Braj Yatra', price: '₹5,999', pricePer: 'per person', duration: '3 Days / 2 Nights',
      places: ['Day 1: Vrindavan — All Major Temples', 'Day 2: Mathura, Govardhan Parikrama, Radha Kund', 'Day 3: Barsana, Nandgaon, Gokul'],
      inclusions: ['AC Vehicle', '2 Nights Stay', 'Daily Breakfast', 'Driver cum Guide', 'Toll & Parking', 'Pickup & Drop', 'Evening Aarti Experience'],
      exclusions: ['Lunch & Dinner', 'Pooja Samagri', 'Entry Tickets'],
      idealFor: 'Families and devotees wanting the most complete Braj experience', popular: false, color: 'braj-gold',
    },
    {
      id: 'custom', name: 'Custom Braj Yatra', price: 'Contact Us', pricePer: 'for pricing', duration: 'Flexible',
      places: ['Customized itinerary', 'Choose your own destinations', 'Flexible duration', 'Special pooja arrangements', 'Group discounts available'],
      inclusions: ['Fully Customizable', 'AC Vehicle', 'Accommodation', 'Meals as per plan', 'Dedicated Guide', 'Special Darshan Assistance'],
      exclusions: ['Varies as per plan'],
      idealFor: 'Large groups, special occasions, senior citizens, or specific spiritual needs', popular: false, color: 'braj-saffron',
    },
  ]
}

export default function PackagesContent() {
  const [sectionData, setSectionData] = useState(DEFAULT_SECTION_CONTENT.packages)
  const [packages, setPackages] = useState<Package[]>(getDefaultPackages)

  useEffect(() => {
    fetch('/api/section-content?section=packages')
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setSectionData(data)
          if (data.content) {
            try {
              const parsed = JSON.parse(data.content)
              if (parsed.packages) setPackages(parsed.packages)
            } catch { /* keep default */ }
          }
        }
      })
      .catch(() => {})
  }, [])

  const colorClasses: Record<string, { bg: string; text: string; border: string; badge: string; gradient: string }> = {
    'braj-teal': { bg: 'bg-braj-teal', text: 'text-braj-teal', border: 'border-braj-teal', badge: 'bg-braj-teal text-white', gradient: 'from-braj-teal to-braj-dark-green' },
    'braj-dark-green': { bg: 'bg-braj-dark-green', text: 'text-braj-dark-green', border: 'border-braj-dark-green', badge: 'bg-braj-dark-green text-white', gradient: 'from-braj-dark-green to-braj-teal' },
    'braj-gold': { bg: 'bg-braj-gold', text: 'text-braj-gold', border: 'border-braj-gold', badge: 'bg-braj-gold text-white', gradient: 'from-braj-gold to-braj-saffron' },
    'braj-saffron': { bg: 'bg-braj-saffron', text: 'text-braj-saffron', border: 'border-braj-saffron', badge: 'bg-braj-saffron text-braj-dark-green', gradient: 'from-braj-saffron to-braj-gold' },
  }

  return (
    <main className="pt-16 sm:pt-20">
      {/* ═══ Hero Banner ═══ */}
      <section className="relative py-24 sm:py-40 bg-braj-dark-green overflow-hidden" aria-label="Packages hero">
        <div className="absolute inset-0">
          <img src={IMAGES.templesReflection} alt="Vrindavan Temples" className="w-full h-full object-cover opacity-20" loading="lazy" />
        </div>
        <FloatingOrb color="rgba(247, 184, 8, 0.07)" size={380} top="-8%" left="55%" />

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
            Our Packages
          </motion.span>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6"
            variants={textSlideUp}
            transition={slowTransition}
          >
            {sectionData.title || 'Choose Your Divine Journey'}
          </motion.h1>
          <motion.p
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={butteryTransition}
          >
            {sectionData.subtitle || 'Tailored Braj Yatra packages for every devotee\'s needs and budget'}
          </motion.p>
          <RevealLine className="mt-8 mx-auto max-w-xs" />
        </motion.div>
      </section>

      {/* ═══ Packages Grid ═══ */}
      <section className="py-20 sm:py-28 bg-braj-cream relative overflow-hidden" aria-label="Yatra packages">
        <FloatingOrb color="rgba(12, 57, 46, 0.04)" size={400} top="15%" left="-8%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainerSlow}
          >
            {packages.map((pkg, pkgIndex) => {
              const colors = colorClasses[pkg.color] || colorClasses['braj-dark-green']
              return (
                <motion.div
                  key={pkg.id}
                  variants={fadeInUp}
                  transition={{ ...cinematicTransition, delay: pkgIndex * 0.1 }}
                  className="group"
                >
                  <article className={`bg-white rounded-2xl overflow-hidden relative h-full shadow-md hover:shadow-xl transition-shadow duration-500 ${pkg.popular ? 'ring-2 ring-braj-saffron' : ''}`} id={pkg.id}>
                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-braj-saffron text-braj-dark-green text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-braj-saffron/30">
                          <Star className="w-3.5 h-3.5 fill-current" /> Most Popular
                        </div>
                      </div>
                    )}

                    {/* Package Header */}
                    <div className={`${colors.bg} p-6 sm:p-8 text-white relative overflow-hidden`}>
                      <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3">{pkg.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {pkg.duration}</span>
                          <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {pkg.pricePer}</span>
                        </div>
                        <div className="mt-4 inline-block">
                          <span className="text-3xl sm:text-4xl font-bold" style={{
                            textShadow: pkg.popular
                              ? '0 0 20px rgba(247, 184, 8, 0.4), 0 0 40px rgba(247, 184, 8, 0.2)'
                              : 'none',
                          }}>
                            {pkg.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Package Body */}
                    <div className="p-6 sm:p-8">
                      {/* Places Covered */}
                      <div className="mb-6">
                        <h4 className="font-bold text-braj-dark-green mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4" /> Places Covered
                        </h4>
                        <ul className="space-y-2">
                          {pkg.places.map((place, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-braj-teal mt-0.5">•</span>
                              {place}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Inclusions */}
                      <div className="mb-6">
                        <h4 className="font-bold text-braj-dark-green mb-3">✓ Inclusions</h4>
                        <ul className="space-y-2">
                          {pkg.inclusions.map((item, i) => (
                            <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                              <Check className="w-4 h-4 mt-0.5 shrink-0 text-green-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Exclusions */}
                      <div className="mb-6">
                        <h4 className="font-bold text-braj-dark-green mb-3">✗ Exclusions</h4>
                        <ul className="space-y-2">
                          {pkg.exclusions.map((item, i) => (
                            <li key={i} className="text-sm text-red-600 flex items-start gap-2">
                              <X className="w-4 h-4 mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Ideal For */}
                      <div className="mb-6 p-4 bg-braj-light-gold/50 rounded-xl">
                        <p className="text-sm text-braj-dark-green">
                          <span className="font-semibold">Ideal for:</span> {pkg.idealFor}
                        </p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <Link href="/contact" className="block">
                            <Button className={`w-full ${colors.bg} hover:opacity-90 text-white font-semibold rounded-full py-5`}>
                              Book Now
                            </Button>
                          </Link>
                        </div>
                        <div className="flex-1">
                          <a href="https://wa.me/918923944869" target="_blank" rel="noopener noreferrer" className="block">
                            <Button variant="outline" className={`w-full ${colors.text} border-current font-semibold rounded-full py-5`}>
                              WhatsApp
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ Comparison Table ═══ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden" aria-label="Package comparison">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Compare
            </motion.span>
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-braj-dark-green mt-3"
              variants={textSlideUp}
              transition={slowTransition}
            >
              Package Comparison
            </motion.h2>
            <RevealLine className="mt-6 mx-auto max-w-xs" />
          </motion.div>

          <motion.div
            className="overflow-x-auto rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={slowTransition}
          >
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="bg-braj-dark-green text-white">
                  <th className="px-4 py-4 text-left font-semibold">Feature</th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className="px-4 py-4 text-center font-semibold">{pkg.name.split(' ').slice(0, 2).join(' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-braj-light-gold">
                {[
                  { feature: 'Price', values: packages.map(p => p.price) },
                  { feature: 'Duration', values: packages.map(p => p.duration) },
                  { feature: 'AC Vehicle', values: packages.map(() => '✓') },
                  { feature: 'Accommodation', values: ['✗', '1 Night', '2 Nights', 'Custom'] },
                  { feature: 'Breakfast', values: ['✗', '✓', '✓', 'Custom'] },
                  { feature: 'Guide', values: packages.map(() => '✓') },
                  { feature: 'Vrindavan', values: packages.map(() => '✓') },
                  { feature: 'Mathura', values: ['If Time', '✓', '✓', 'Custom'] },
                  { feature: 'Govardhan', values: ['✗', '✓', '✓', 'Custom'] },
                  { feature: 'Barsana', values: ['✗', '✗', '✓', 'Custom'] },
                  { feature: 'Nandgaon/Gokul', values: ['✗', '✗', '✓', 'Custom'] },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? 'bg-braj-cream/50' : 'bg-white'}
                  >
                    <td className="px-4 py-3 font-medium text-braj-dark-green">{row.feature}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className="px-4 py-3 text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══ Custom Package CTA ═══ */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-braj-teal via-braj-dark-green to-braj-teal relative overflow-hidden" aria-label="Custom package call to action">
        <FloatingOrb color="rgba(247, 184, 8, 0.08)" size={420} top="-12%" left="15%" />

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
            Need a Custom Package?
          </motion.h2>
          <RevealLine className="mb-6 mx-auto max-w-xs" />
          <motion.p
            className="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={butteryTransition}
          >
            We can create a personalized Braj Yatra just for you. Tell us your preferences and we&apos;ll design the perfect spiritual journey.
          </motion.p>
          <motion.div variants={scaleIn} transition={springTransition}>
            <Link href="/contact">
              <Button size="lg" className="bg-braj-saffron text-braj-dark-green hover:bg-braj-gold font-bold px-8 py-6 gap-2 rounded-full text-base group">
                Get Custom Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
