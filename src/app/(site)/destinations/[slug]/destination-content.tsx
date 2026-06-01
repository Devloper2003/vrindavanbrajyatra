'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  MapPin,
  Calendar,
  Plane,
  Train,
  Car,
  Sparkles,
  Clock,
  ChevronRight,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Destination } from '@/lib/destinations-data'
import {
  cinematicTransition,
  butteryTransition,
  fadeInUp,
  slideInRight,
  staggerContainer,
  staggerContainerSlow,
  textReveal,
  defaultViewport,
} from '@/lib/animations'
import {
  FloatingOrb,
  RevealLine,
} from '@/components/decorative/motion-elements'

interface Props {
  destination: Destination
}

export default function DestinationContent({ destination }: Props) {
  const {
    name,
    tagline,
    heroImage,
    description,
    significance,
    keyAttractions,
    bestTimeToVisit,
    howToReach,
    festivals,
  } = destination

  const descriptionParagraphs = description.split('\n\n').filter(p => p.trim())

  return (
    <main className="pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="relative py-28 sm:py-44 overflow-hidden min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-braj-dark-green via-braj-dark-green/70 to-braj-dark-green/30" />
        </div>

        <FloatingOrb color="rgba(247, 184, 8, 0.07)" size={350} top="-5%" left="70%" />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
        >
          <motion.span
            className="text-braj-saffron font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 mb-3"
            variants={textReveal}
          >
            <Sparkles className="w-4 h-4" /> Sacred Destination
          </motion.span>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4"
            variants={textReveal}
          >
            {name}
          </motion.h1>
          <motion.p
            className="text-braj-saffron text-lg sm:text-xl font-semibold mb-4"
            variants={fadeInUp}
            transition={{ ...cinematicTransition, delay: 0.2 }}
          >
            {tagline}
          </motion.p>
          <RevealLine className="mx-auto w-24 mb-5" />
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 text-white/80 text-sm"
            variants={fadeInUp}
            transition={{ ...cinematicTransition, delay: 0.4 }}
          >
            <span className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-braj-saffron" /> {keyAttractions.length} Key Attractions
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-braj-saffron" /> {festivals.length} Major Festivals
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Breadcrumb */}
      <motion.div
        className="bg-braj-dark-green/5 border-b border-braj-light-gold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cinematicTransition}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-braj-teal transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/destinations" className="hover:text-braj-teal transition-colors">Destinations</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-braj-dark-green font-medium">{name}</span>
          </nav>
        </div>
      </motion.div>

      {/* Overview Section */}
      <section className="py-16 sm:py-20 bg-braj-cream relative overflow-hidden">
        <FloatingOrb color="rgba(12, 57, 46, 0.04)" size={280} top="20%" left="85%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div className="mb-8" variants={fadeInUp} transition={cinematicTransition}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-braj-dark-green mb-2">
                    About {name}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-braj-dark-green via-braj-gold to-braj-dark-green rounded-full" />
                </motion.div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {descriptionParagraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        ...cinematicTransition,
                        delay: index * 0.1,
                        duration: 0.8,
                      }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* Sidebar - Spiritual Significance */}
              <div className="lg:col-span-1">
                <motion.div
                  className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
                  variants={slideInRight}
                  transition={cinematicTransition}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-braj-saffron/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-braj-saffron" />
                    </div>
                    <h3 className="font-bold text-braj-dark-green text-lg">Spiritual Significance</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {significance}
                  </p>
                  <div className="mt-6 pt-4 border-t border-braj-light-gold">
                    <Link href="/packages">
                      <Button className="w-full bg-braj-dark-green hover:bg-braj-teal text-white font-semibold rounded-full gap-2">
                        Book Your Yatra <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3">
                    <a href="https://wa.me/918923944869" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full border-braj-teal text-braj-teal hover:bg-braj-teal hover:text-white font-semibold rounded-full gap-2">
                        <MessageCircle className="w-4 h-4" /> WhatsApp Us
                      </Button>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Attractions */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <FloatingOrb color="rgba(247, 184, 8, 0.04)" size={300} top="10%" left="-5%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            <motion.span className="text-braj-gold font-medium text-sm tracking-wider uppercase" variants={textReveal}>
              Must Visit
            </motion.span>
            <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-braj-dark-green mt-2" variants={textReveal}>
              Key Attractions in {name}
            </motion.h2>
            <RevealLine className="mx-auto w-20 mt-4" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainerSlow}
          >
            {keyAttractions.map((attraction, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ ...cinematicTransition, delay: index * 0.1 }}
              >
                <article className="rounded-2xl overflow-hidden shadow-md bg-braj-cream h-full hover:shadow-xl transition-shadow duration-500">
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-braj-saffron text-braj-dark-green text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-braj-dark-green text-lg mb-2">{attraction.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {attraction.description}
                    </p>
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Festivals Section */}
      <section className="py-16 sm:py-24 bg-braj-cream relative overflow-hidden">
        <FloatingOrb color="rgba(12, 103, 117, 0.04)" size={250} top="15%" left="90%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            <motion.span className="text-braj-gold font-medium text-sm tracking-wider uppercase" variants={textReveal}>
              Celebrate
            </motion.span>
            <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-braj-dark-green mt-2" variants={textReveal}>
              Festivals of {name}
            </motion.h2>
            <RevealLine className="mx-auto w-20 mt-4" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainerSlow}
          >
            {festivals.map((festival, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ ...cinematicTransition, delay: index * 0.1 }}
              >
                <article className="bg-white rounded-2xl shadow-md p-6 relative overflow-hidden h-full hover:shadow-xl transition-shadow duration-500">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-braj-saffron/10 rounded-bl-full" />
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-braj-saffron to-braj-gold flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-braj-dark-green" />
                    </div>
                    <div>
                      <h3 className="font-bold text-braj-dark-green text-lg">{festival.name}</h3>
                      <span className="text-braj-teal text-sm font-medium">{festival.month}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {festival.description}
                  </p>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Best Time to Visit & How to Reach */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            <motion.span className="text-braj-gold font-medium text-sm tracking-wider uppercase" variants={textReveal}>
              Plan Your Visit
            </motion.span>
            <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-braj-dark-green mt-2" variants={textReveal}>
              When & How to Visit {name}
            </motion.h2>
            <RevealLine className="mx-auto w-20 mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Best Time to Visit */}
            <motion.div
              className="bg-gradient-to-br from-braj-teal/5 to-braj-dark-green/5 rounded-2xl p-6 sm:p-8 border border-braj-light-gold"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ ...cinematicTransition, duration: 1.0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-braj-teal flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-braj-dark-green">Best Time to Visit</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {bestTimeToVisit}
              </p>
            </motion.div>

            {/* How to Reach */}
            <motion.div
              className="bg-gradient-to-br from-braj-saffron/5 to-braj-gold/5 rounded-2xl p-6 sm:p-8 border border-braj-light-gold"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={defaultViewport}
              transition={{ ...cinematicTransition, duration: 1.0, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-braj-saffron flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-braj-dark-green" />
                </div>
                <h3 className="text-xl font-bold text-braj-dark-green">How to Reach {name}</h3>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Plane, label: 'By Air', text: howToReach.byAir, color: 'bg-blue-100 text-blue-600' },
                  { icon: Train, label: 'By Train', text: howToReach.byTrain, color: 'bg-green-100 text-green-600' },
                  { icon: Car, label: 'By Road', text: howToReach.byRoad, color: 'bg-orange-100 text-orange-600' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...cinematicTransition, delay: 0.3 + i * 0.1, duration: 0.8 }}
                  >
                    <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0 mt-0.5`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-braj-dark-green text-sm">{item.label}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-braj-teal via-braj-dark-green to-braj-teal relative overflow-hidden">
        <FloatingOrb color="rgba(247, 184, 8, 0.06)" size={350} top="5%" left="75%" />

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
            Experience the Divinity of {name}
          </motion.h2>
          <RevealLine className="mx-auto w-24 mb-5" />
          <motion.p
            className="text-white/80 text-lg mb-8"
            variants={fadeInUp}
            transition={butteryTransition}
          >
            Let our expert guides take you on a spiritual journey through {name}.
            Book your Braj Yatra package today and create memories of a lifetime.
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
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </Button>
            </a>
          </motion.div>
          <motion.p
            className="text-white/50 text-sm mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...cinematicTransition, delay: 0.6 }}
          >
            Also explore:{' '}
            {destination.slug !== 'vrindavan' && (
              <Link href="/destinations/vrindavan" className="text-braj-saffron hover:underline">Vrindavan</Link>
            )}
            {destination.slug !== 'vrindavan' && destination.slug !== 'mathura' && ' · '}
            {destination.slug !== 'mathura' && (
              <Link href="/destinations/mathura" className="text-braj-saffron hover:underline">Mathura</Link>
            )}
            {destination.slug !== 'govardhan' && (
              <> · <Link href="/destinations/govardhan" className="text-braj-saffron hover:underline">Govardhan</Link></>
            )}
            {destination.slug !== 'barsana' && (
              <> · <Link href="/destinations/barsana" className="text-braj-saffron hover:underline">Barsana</Link></>
            )}
            {destination.slug !== 'nandgaon' && (
              <> · <Link href="/destinations/nandgaon" className="text-braj-saffron hover:underline">Nandgaon</Link></>
            )}
            {destination.slug !== 'gokul' && (
              <> · <Link href="/destinations/gokul" className="text-braj-saffron hover:underline">Gokul</Link></>
            )}
          </motion.p>
        </motion.div>
      </section>
    </main>
  )
}
