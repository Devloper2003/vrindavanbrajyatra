'use client'

import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { IMAGES } from '@/lib/default-content'
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
  earlyViewport,
} from '@/lib/animations'
import {
  FloatingOrb,
  RevealLine,
} from '@/components/decorative/motion-elements'

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

const defaultGallery: GalleryImage[] = [
  { id: 'd1', src: IMAGES.premMandirNight, alt: 'Prem Mandir Vrindavan at Night', category: 'Temples' },
  { id: 'd2', src: IMAGES.bankeBihari, alt: 'Banke Bihari Temple', category: 'Temples' },
  { id: 'd3', src: IMAGES.bankeBihariGate, alt: 'Banke Bihari Temple Main Gate', category: 'Temples' },
  { id: 'd4', src: IMAGES.iskcon, alt: 'ISKCON Vrindavan Temple', category: 'Temples' },
  { id: 'd5', src: IMAGES.premMandirDay, alt: 'Prem Mandir Day View', category: 'Temples' },
  { id: 'd6', src: IMAGES.dwarkadhish, alt: 'Dwarkadhish Temple Mathura', category: 'Temples' },
  { id: 'd7', src: IMAGES.govardhanHill, alt: 'Govardhan Hill', category: 'Temples' },
  { id: 'd8', src: IMAGES.govardhanParikrama, alt: 'Govardhan Parikrama', category: 'Yatra Groups' },
  { id: 'd9', src: IMAGES.radhaRaniTemple, alt: 'Shri Radha Rani Temple Barsana', category: 'Temples' },
  { id: 'd10', src: IMAGES.yamunaAarti, alt: 'Yamuna Aarti', category: 'Darshan' },
  { id: 'd11', src: IMAGES.keshiGhat, alt: 'Keshi Ghat Vrindavan', category: 'Darshan' },
  { id: 'd12', src: IMAGES.yamunaRiver, alt: 'Yamuna River Vrindavan', category: 'Darshan' },
  { id: 'd13', src: IMAGES.holiColors, alt: 'Holi Festival Colors', category: 'Festivals' },
  { id: 'd14', src: IMAGES.holiCelebration, alt: 'Holi Celebration in Braj', category: 'Festivals' },
  { id: 'd15', src: IMAGES.lathmarHoli, alt: 'Lathmar Holi Nandgaon', category: 'Festivals' },
  { id: 'd16', src: IMAGES.barsanaHoli, alt: 'Holi in Barsana', category: 'Festivals' },
  { id: 'd17', src: IMAGES.pilgrimsWalking, alt: 'Pilgrims on Braj Yatra', category: 'Yatra Groups' },
  { id: 'd18', src: IMAGES.devoteesTemple, alt: 'Devotees at Temple', category: 'Darshan' },
  { id: 'd19', src: IMAGES.gokulTemple, alt: 'Radha Krishna Temple Gokul', category: 'Temples' },
  { id: 'd20', src: IMAGES.nandgaon, alt: 'Nandgaon Village', category: 'Temples' },
  { id: 'd21', src: IMAGES.iskconDeities, alt: 'Radha Krishna at ISKCON Vrindavan', category: 'Darshan' },
  { id: 'd22', src: IMAGES.radhakrishnaDarshan, alt: 'Radhakrishna Darshan', category: 'Darshan' },
  { id: 'd23', src: IMAGES.vrindavanOverview, alt: 'Vrindavan Overview', category: 'Temples' },
  { id: 'd24', src: IMAGES.mathuraCity, alt: 'Mathura City View', category: 'Temples' },
  { id: 'd25', src: IMAGES.templesReflection, alt: 'Temples Reflection', category: 'Temples' },
]

const categories = ['All', 'Temples', 'Darshan', 'Yatra Groups', 'Festivals']

export default function GalleryContent() {
  const [images, setImages] = useState<GalleryImage[]>(defaultGallery)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setImages([...data, ...defaultGallery])
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)
    }
  }
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
    }
  }

  return (
    <main className="pt-16 sm:pt-20">
      {/* ── Hero Banner ── */}
      <section className="relative py-20 sm:py-32 bg-braj-dark-green overflow-hidden" aria-labelledby="gallery-heading">
        <FloatingOrb color="rgba(247, 184, 8, 0.06)" size={400} top="-10%" left="60%" />

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
            <Camera className="w-4 h-4 text-braj-saffron" />
            <span className="text-braj-saffron font-medium text-sm tracking-wider uppercase">
              Photo Gallery
            </span>
            <Camera className="w-4 h-4 text-braj-saffron" />
          </motion.div>

          <motion.h1
            id="gallery-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6"
            variants={textSlideUp}
            transition={slowTransition}
          >
            Divine Moments from{' '}
            <span className="text-braj-gold">Braj Bhoomi</span>
          </motion.h1>

          <motion.p
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto"
            variants={textReveal}
            transition={butteryTransition}
          >
            Explore the beauty and spirituality of Braj through our curated photo collection
          </motion.p>

          <motion.div className="mt-8" variants={fadeIn} transition={cinematicTransition}>
            <RevealLine className="max-w-xs mx-auto" />
          </motion.div>

          <motion.div
            className="mt-6 flex items-center justify-center gap-2 text-white/50 text-sm"
            variants={fadeInUp}
            transition={cinematicTransition}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{images.length} divine photographs</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Gallery Content ── */}
      <section className="relative py-16 sm:py-24 bg-braj-cream overflow-hidden" aria-label="Gallery images">
        <FloatingOrb color="rgba(12, 57, 46, 0.04)" size={300} top="20%" left="-5%" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ── Category Filters ── */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-braj-dark-green text-white shadow-lg shadow-braj-dark-green/25'
                    : 'bg-white text-muted-foreground hover:bg-braj-light-gold/40 shadow-sm'
                }`}
                variants={fadeInUp}
                transition={{ ...cinematicTransition, delay: i * 0.1 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* ── Masonry Grid ── */}
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div
                  key={i}
                  className="animate-pulse bg-braj-light-gold/50 rounded-xl"
                  style={{ height: `${200 + (i % 3) * 80}px` }}
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={earlyViewport}
              variants={staggerContainerSlow}
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((img, index) => (
                  <motion.button
                    key={img.id}
                    onClick={() => openLightbox(index)}
                    className="gallery-item relative rounded-xl overflow-hidden w-full break-inside-avoid group cursor-pointer"
                    variants={fadeInUp}
                    transition={{ ...cinematicTransition, delay: (index % 8) * 0.1 }}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-braj-dark-green/80 via-braj-dark-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-semibold">{img.alt}</p>
                        <span className="inline-block mt-1 text-xs text-braj-gold/90 px-2 py-0.5 rounded-full bg-braj-dark-green/60">
                          {img.category}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {filteredImages.length === 0 && !loading && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={cinematicTransition}
            >
              <Camera className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No images found in this category</p>
              <p className="text-muted-foreground/60 text-sm mt-2">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/50 hover:text-white z-20 rounded-full p-2 hover:bg-white/10 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-20 rounded-full p-3 hover:bg-white/10 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-20 rounded-full p-3 hover:bg-white/10 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image container */}
            <div
              className="max-w-5xl max-h-[85vh] px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={lightboxIndex}
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              />

              {/* Caption */}
              <div className="text-center mt-6">
                <p className="text-white/80 text-sm font-medium">{filteredImages[lightboxIndex].alt}</p>
                <p className="text-braj-gold/60 text-xs mt-1">
                  {lightboxIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
