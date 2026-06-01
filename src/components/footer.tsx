'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, cinematicTransition, slowTransition } from '@/lib/animations'
import { RevealLine } from '@/components/decorative/motion-elements'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/about', label: 'About Us' },
  { href: '/packages', label: 'Packages' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const packageLinks = [
  { href: '/packages#one-day', label: 'Same Day Darshan' },
  { href: '/packages#two-day', label: '2-Day Braj Yatra' },
  { href: '/packages#three-day', label: '3-Day Complete Yatra' },
  { href: '/packages#custom', label: 'Custom Yatra' },
]

const destinationLinks = [
  { href: '/destinations/vrindavan', label: 'Vrindavan' },
  { href: '/destinations/mathura', label: 'Mathura' },
  { href: '/destinations/govardhan', label: 'Govardhan' },
  { href: '/destinations/barsana', label: 'Barsana' },
  { href: '/destinations/nandgaon', label: 'Nandgaon' },
  { href: '/destinations/gokul', label: 'Gokul' },
]

export default function Footer() {
  return (
    <footer className="bg-braj-dark-green text-white relative overflow-hidden">
      {/* Top ornamental line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-braj-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {/* Brand */}
          <motion.div className="sm:col-span-2 lg:col-span-2" variants={fadeInUp} transition={cinematicTransition}>
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <img
                  src="/logo.png"
                  alt="Vrindavan Braj Yatra"
                  width={48}
                  height={48}
                  className="rounded-full shadow-md group-hover:shadow-braj-gold/20 transition-shadow duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-braj-saffron transition-colors duration-500">Vrindavan Braj Yatra</h3>
                <p className="text-braj-saffron text-xs font-medium">Divine Pilgrimage Tours</p>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Your trusted companion for divine pilgrimage experiences in the holy land of Braj Bhoomi.
              We offer authentic, comfortable, and affordable Braj Yatra packages with local expertise.
            </p>
            <a
              href="https://www.instagram.com/vrindavanbrajyatra/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-braj-saffron hover:text-braj-gold transition-colors duration-500 text-sm group"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              Follow us on Instagram
            </a>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} transition={{ ...cinematicTransition, delay: 0.1 }}>
            <h4 className="font-bold text-braj-saffron mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-braj-saffron hover:pl-1 transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Destinations */}
          <motion.div variants={fadeInUp} transition={{ ...cinematicTransition, delay: 0.15 }}>
            <h4 className="font-bold text-braj-saffron mb-5 text-sm uppercase tracking-wider">Destinations</h4>
            <ul className="space-y-2.5">
              {destinationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-braj-saffron hover:pl-1 transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Packages & Contact */}
          <motion.div variants={fadeInUp} transition={{ ...cinematicTransition, delay: 0.2 }}>
            <h4 className="font-bold text-braj-saffron mb-5 text-sm uppercase tracking-wider">Our Packages</h4>
            <ul className="space-y-2.5 mb-6">
              {packageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-braj-saffron hover:pl-1 transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-braj-saffron mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+918923944689" className="flex items-start gap-2 text-white/70 hover:text-braj-saffron transition-colors duration-300 text-sm group">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span>+91 89239 44689</span>
                </a>
              </li>
              <li>
                <a href="mailto:tour@vrindavanbrajyatra.in" className="flex items-start gap-2 text-white/70 hover:text-braj-saffron transition-colors duration-300 text-sm group">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span>tour@vrindavanbrajyatra.in</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Infront of Kailash Nagar, Near Shani Dev Mandir, Mathura Vrindavan Road, Vrindavan - 281121</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <RevealLine className="mt-10 mb-6" />

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...slowTransition, delay: 0.3 }}
        >
          <p className="text-white/50 text-xs text-center sm:text-left flex items-center gap-1">
            &copy; 2024 Vrindavan Braj Yatra. All rights reserved. Made with
            <Heart className="w-3 h-3 text-braj-saffron inline" />
            in Vrindavan
          </p>
          <Link href="/admin" className="text-white/30 hover:text-white/50 text-xs transition-colors duration-300">
            Admin Panel
          </Link>
        </motion.div>
      </div>
    </footer>
  )
}
