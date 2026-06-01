'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
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

const packages = ['Same Day Braj Darshan', '2-Day Braj Yatra', '3-Day Complete Yatra', 'Custom Yatra', 'Not Sure Yet']

// ── Floating Label Input ──
function FloatingLabelInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute left-3 transition-all pointer-events-none origin-left z-10"
        style={{
          top: isActive ? -10 : 12,
          fontSize: isActive ? '12px' : '14px',
          color: focused ? '#0C392E' : '#6b7280',
          backgroundColor: isActive ? '#ffffff' : 'transparent',
          paddingLeft: isActive ? 4 : 0,
          paddingRight: isActive ? 4 : 0,
        }}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isActive ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="pt-5 pb-2 transition-all duration-300"
        required={required}
      />
    </div>
  )
}

// ── Floating Label Textarea ──
function FloatingLabelTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  id: string
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute left-3 transition-all pointer-events-none origin-left z-10"
        style={{
          top: isActive ? -10 : 12,
          fontSize: isActive ? '12px' : '14px',
          color: focused ? '#0C392E' : '#6b7280',
          backgroundColor: isActive ? '#ffffff' : 'transparent',
          paddingLeft: isActive ? 4 : 0,
          paddingRight: isActive ? 4 : 0,
        }}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isActive ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="pt-5 pb-2 min-h-[120px] transition-all duration-300"
        required={required}
      />
    </div>
  )
}

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast.success('🙏 Thank you! Your enquiry has been submitted. We\'ll contact you soon.')
        setFormData({ name: '', email: '', phone: '', package: '', message: '' })
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const contactCards = [
    { icon: Phone, title: 'Call Us', content: '+91 89239 44689', href: 'tel:+918923944689', color: 'bg-braj-dark-green/10', iconColor: 'text-braj-dark-green' },
    { icon: MessageCircle, title: 'WhatsApp', content: 'Chat on WhatsApp', href: 'https://wa.me/918923944689', color: 'bg-green-500/10', iconColor: 'text-green-600', linkProps: { target: '_blank', rel: 'noopener noreferrer' } },
    { icon: Mail, title: 'Email', content: 'tour@vrindavanbrajyatra.in', href: 'mailto:tour@vrindavanbrajyatra.in', color: 'bg-braj-gold/10', iconColor: 'text-braj-gold' },
    { icon: MapPin, title: 'Our Location', content: 'Infront of Kailash Nagar, Near Shani Dev Mandir, Mathura Vrindavan Road, Vrindavan - 281121', color: 'bg-braj-saffron/10', iconColor: 'text-braj-saffron', noLink: true },
    { icon: Clock, title: 'Business Hours', content: 'Monday - Saturday: 6:00 AM - 9:00 PM\nSunday: 7:00 AM - 6:00 PM', color: 'bg-braj-teal/10', iconColor: 'text-braj-teal', noLink: true },
  ]

  return (
    <main className="pt-16 sm:pt-20">
      {/* ── Hero Banner ── */}
      <section className="relative py-20 sm:py-32 bg-braj-dark-green overflow-hidden" aria-labelledby="contact-heading">
        <FloatingOrb color="rgba(247, 184, 8, 0.06)" size={400} top="-5%" left="70%" />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            variants={fadeInDown}
            transition={cinematicTransition}
          >
            <Sparkles className="w-4 h-4 text-braj-saffron" />
            <span className="text-braj-saffron font-medium text-sm tracking-wider uppercase">
              Contact Us
            </span>
            <Sparkles className="w-4 h-4 text-braj-saffron" />
          </motion.div>

          <motion.h1
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6"
            variants={textSlideUp}
            transition={slowTransition}
          >
            Plan Your <span className="text-braj-gold">Divine Journey</span> Today
          </motion.h1>

          <motion.p
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto"
            variants={textReveal}
            transition={butteryTransition}
          >
            Let us help you plan your perfect Braj Yatra. Fill out the form below or contact us directly.
          </motion.p>

          <motion.div className="mt-8" variants={fadeIn} transition={cinematicTransition}>
            <RevealLine className="max-w-xs mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Contact Content ── */}
      <section className="relative py-16 sm:py-24 bg-braj-cream overflow-hidden" aria-label="Contact information and form">
        <FloatingOrb color="rgba(12, 57, 46, 0.04)" size={300} top="15%" left="-5%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ── Quick CTA: WhatsApp & Phone ── */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            <motion.a
              href="https://wa.me/918923944689"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg shadow-green-600/30 transition-colors"
              variants={scaleIn}
              transition={springTransition}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href="tel:+918923944689"
              className="inline-flex items-center gap-3 px-8 py-4 bg-braj-dark-green hover:bg-braj-teal text-white font-semibold rounded-full shadow-lg shadow-braj-dark-green/30 transition-colors"
              variants={scaleIn}
              transition={springTransition}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ── Contact Form ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeInUp}
              transition={cinematicTransition}
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-braj-light-gold">
                <motion.h2
                  className="text-xl sm:text-2xl font-bold text-braj-dark-green mb-2"
                  variants={textReveal}
                  transition={cinematicTransition}
                >
                  Send Us an Enquiry
                </motion.h2>
                <motion.p
                  className="text-muted-foreground text-sm mb-8"
                  variants={fadeIn}
                  transition={butteryTransition}
                >
                  Fill in the details and we&apos;ll get back to you within 24 hours
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={fadeInUp} transition={cinematicTransition}>
                    <FloatingLabelInput
                      id="name"
                      label="Name"
                      value={formData.name}
                      onChange={(val) => setFormData({ ...formData, name: val })}
                      placeholder="Your full name"
                      required
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} transition={cinematicTransition}>
                    <FloatingLabelInput
                      id="email"
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(val) => setFormData({ ...formData, email: val })}
                      placeholder="your@email.com"
                      required
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} transition={cinematicTransition}>
                    <FloatingLabelInput
                      id="phone"
                      label="Phone / WhatsApp"
                      type="tel"
                      value={formData.phone}
                      onChange={(val) => setFormData({ ...formData, phone: val })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} transition={cinematicTransition}>
                    <Label htmlFor="package" className="text-sm text-muted-foreground mb-1.5 block">
                      Preferred Package
                    </Label>
                    <select
                      id="package"
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-300 focus:border-braj-dark-green focus:ring-1 focus:ring-braj-dark-green/20"
                    >
                      <option value="">Select a package</option>
                      {packages.map(pkg => (
                        <option key={pkg} value={pkg}>{pkg}</option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={fadeInUp} transition={cinematicTransition}>
                    <FloatingLabelTextarea
                      id="message"
                      label="Message"
                      value={formData.message}
                      onChange={(val) => setFormData({ ...formData, message: val })}
                      placeholder="Tell us about your yatra plans, group size, preferred dates, etc."
                      required
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} transition={cinematicTransition}>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-braj-dark-green hover:bg-braj-teal text-white font-semibold py-6 rounded-full gap-2 transition-all duration-500 group"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          Send Enquiry
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* ── Contact Info Cards ── */}
            <motion.div
              className="space-y-5"
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainerSlow}
            >
              {contactCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeInUp}
                  transition={{ ...cinematicTransition, delay: i * 0.1 }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-500">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center shrink-0`}>
                        <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-braj-dark-green mb-1">{card.title}</h3>
                        {card.noLink ? (
                          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{card.content}</p>
                        ) : (
                          <a
                            href={card.href}
                            {...(card.linkProps || {})}
                            className="text-braj-teal hover:text-braj-dark-green hover:underline text-lg font-medium transition-colors duration-300 inline-flex items-center gap-1 group"
                          >
                            {card.content}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Map Section ── */}
          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainerSlow}
          >
            <motion.div className="text-center mb-8" variants={fadeInUp} transition={cinematicTransition}>
              <h2 className="text-2xl sm:text-3xl font-bold text-braj-dark-green mb-2">Find Us in Vrindavan</h2>
              <p className="text-muted-foreground">Visit our office for personalized yatra planning</p>
              <RevealLine className="max-w-xs mx-auto mt-4" />
            </motion.div>

            <motion.div
              className="overflow-hidden rounded-2xl shadow-lg border border-braj-light-gold"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={cinematicTransition}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.56789!2d77.6935!3d27.5796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3973711c43e4b1b7%3A0x8b0b0b0b0b0b0b0b!2sVrindavan%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vrindavan Braj Yatra Location"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
