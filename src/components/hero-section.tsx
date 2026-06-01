'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.png"
          alt="Vrindavan sunrise over the holy Yamuna river"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border-2 border-braj-gold/30 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute bottom-32 right-16 w-16 h-16 border border-braj-saffron/20 rounded-full animate-pulse hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-braj-saffron" />
            <span className="text-braj-saffron font-semibold text-sm tracking-wider uppercase">
              Mathura • Vrindavan • Govardhan • Barsana
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
            Experience the{' '}
            <span className="text-braj-saffron">Divine Essence</span>{' '}
            of Braj Bhoomi
          </h2>

          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Walk the Path of Divine Love with Vrindavan Braj Yatra. Let us guide you through the sacred lands where Lord Krishna performed His divine pastimes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              className="bg-braj-saffron text-braj-dark hover:bg-braj-saffron/90 font-bold text-base px-8 py-6 h-auto"
              onClick={() => document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Braj Yatra
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-braj-teal text-white bg-braj-teal/20 hover:bg-braj-teal/40 font-semibold text-base px-8 py-6 h-auto"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Custom Itinerary
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-[#25D366] text-white hover:bg-[#25D366]/90 font-semibold text-base px-8 py-6 h-auto"
            >
              <a
                href="https://wa.me/918923944689?text=Hare%20Krishna!%20I%20want%20to%20know%20about%20Braj%20Yatra%20packages"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Now
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-braj-saffron rounded-full" />
              500+ Happy Devotees
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-braj-saffron rounded-full" />
              Local Braj Experts
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-braj-saffron rounded-full" />
              AC Comfort Travel
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="#FFF8E7" />
        </svg>
      </div>
    </section>
  )
}
