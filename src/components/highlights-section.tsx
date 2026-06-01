'use client'

import SectionWrapper from './section-wrapper'
import { Bus, Eye, MapPin, Shield } from 'lucide-react'

const highlights = [
  {
    icon: Bus,
    title: 'Comfortable Travel',
    description: 'AC vehicles with experienced drivers ensuring a smooth and comfortable journey through the holy Braj region.',
    color: 'bg-braj-teal/10 text-braj-teal',
  },
  {
    icon: Eye,
    title: 'Proper Darshan Planning',
    description: 'Strategic timing for each temple visit so you get peaceful, unhurried darshan without long queues.',
    color: 'bg-braj-gold/10 text-braj-gold',
  },
  {
    icon: MapPin,
    title: 'Local Braj Guides',
    description: 'Knowledgeable local guides who know every temple, every story, and every hidden sacred spot in Braj.',
    color: 'bg-braj-saffron/10 text-braj-saffron',
  },
  {
    icon: Shield,
    title: 'Trusted Vrindavan Experts',
    description: 'Years of experience serving devotees with dedication, honesty, and deep spiritual understanding of Braj Bhoomi.',
    color: 'bg-braj-dark-green/10 text-braj-dark-green',
  },
]

export default function HighlightsSection() {
  return (
    <SectionWrapper id="highlights">
      <div className="text-center mb-12">
        <span className="text-braj-gold font-semibold text-sm tracking-wider uppercase">Why Choose Us</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-braj-dark-green mt-2 mb-4">
          Your Spiritual Journey, Our Expert Care
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We go beyond just travel — we ensure every moment of your Braj Yatra is filled with devotion, comfort, and divine experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 text-center card-hover border border-braj-light-gold shadow-sm"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${item.color}`}>
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-braj-dark-green mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
