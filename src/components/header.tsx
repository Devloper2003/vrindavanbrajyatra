'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cinematicTransition } from '@/lib/animations'

const destinationLinks = [
  { href: '/destinations/vrindavan', label: 'Vrindavan' },
  { href: '/destinations/mathura', label: 'Mathura' },
  { href: '/destinations/govardhan', label: 'Govardhan' },
  { href: '/destinations/barsana', label: 'Barsana' },
  { href: '/destinations/nandgaon', label: 'Nandgaon' },
  { href: '/destinations/gokul', label: 'Gokul' },
]

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations/vrindavan', label: 'Destinations', hasDropdown: true },
  { href: '/packages', label: 'Packages' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileDestOpen, setIsMobileDestOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsMobileDestOpen(false)
    setIsDropdownOpen(false)
  }

  const isDestinationsActive = pathname.startsWith('/destinations')

  const headerBg = isHome && !isScrolled && !isMobileMenuOpen
    ? 'bg-transparent'
    : 'bg-braj-dark-green/95 backdrop-blur-xl shadow-lg shadow-braj-dark-green/10'

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${headerBg}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Golden accent line at top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-braj-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group" onClick={closeMobileMenu}>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/logo.png"
                alt="Vrindavan Braj Yatra"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md group-hover:shadow-braj-gold/20 transition-shadow duration-500"
              />
              <div className="absolute inset-0 rounded-full bg-braj-gold/0 group-hover:bg-braj-gold/10 transition-colors duration-500" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-lg leading-tight text-white group-hover:text-braj-saffron transition-colors duration-500">
                Vrindavan Braj Yatra
              </span>
              <span className="text-braj-saffron/80 text-[10px] sm:text-xs font-medium hidden sm:block">
                Divine Pilgrimage Tours
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.href} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 flex items-center gap-1 ${
                        isDestinationsActive
                          ? 'bg-braj-saffron text-braj-dark-green'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                      <motion.span
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          onMouseLeave={() => setIsDropdownOpen(false)}
                          className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl shadow-braj-dark-green/10 border border-braj-light-gold/50 overflow-hidden z-50"
                          initial={{ opacity: 0, y: -15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="py-1">
                            <Link
                              href="/destinations"
                              className="block px-4 py-3 text-sm font-semibold text-braj-dark-green hover:bg-braj-cream/80 transition-colors duration-300 border-b border-braj-light-gold/50"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              All Destinations
                            </Link>
                            {destinationLinks.map((dest, i) => (
                              <motion.div
                                key={dest.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              >
                                <Link
                                  href={dest.href}
                                  className="block px-4 py-2.5 text-sm text-muted-foreground hover:bg-braj-cream/80 hover:text-braj-dark-green transition-colors duration-300"
                                  onClick={() => setIsDropdownOpen(false)}
                                >
                                  {dest.label}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 relative ${
                    pathname === link.href
                      ? 'bg-braj-saffron text-braj-dark-green'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-braj-dark-green rounded-full"
                      layoutId="activeTab"
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.a
              href="tel:+918923944869"
              className="hidden sm:flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Button size="sm" className="bg-braj-saffron text-braj-dark-green hover:bg-braj-gold font-semibold gap-1.5 btn-cinematic rounded-full">
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </Button>
            </motion.a>
            <a href="tel:+918923944869" className="sm:hidden">
              <Button size="sm" className="bg-braj-saffron text-braj-dark-green hover:bg-braj-gold p-2 rounded-full">
                <Phone className="w-4 h-4" />
              </Button>
            </a>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-braj-dark-green/98 backdrop-blur-xl border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                if (link.hasDropdown) {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        onClick={() => setIsMobileDestOpen(!isMobileDestOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          isDestinationsActive
                            ? 'bg-braj-saffron text-braj-dark-green'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: isMobileDestOpen ? 180 : 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {isMobileDestOpen && (
                          <motion.div
                            className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-braj-saffron/30 pl-4 overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <Link
                              href="/destinations"
                              onClick={closeMobileMenu}
                              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-braj-saffron hover:bg-white/10 transition-colors"
                            >
                              All Destinations
                            </Link>
                            {destinationLinks.map((dest) => (
                              <Link
                                key={dest.href}
                                href={dest.href}
                                onClick={closeMobileMenu}
                                className="px-4 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                              >
                                {dest.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-colors block ${
                        pathname === link.href
                          ? 'bg-braj-saffron text-braj-dark-green'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
