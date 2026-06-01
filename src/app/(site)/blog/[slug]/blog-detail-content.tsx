'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Tag, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, LinkIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { IMAGES } from '@/lib/default-content'
import {
  cinematicTransition,
  fadeInUp,
  staggerContainer,
  textReveal,
  defaultViewport,
} from '@/lib/animations'
import {
  FloatingOrb,
  RevealLine,
} from '@/components/decorative/motion-elements'

interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  category: string
  featuredImage: string | null
  published: boolean
  createdAt: string
}

interface RelatedBlog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string
  featuredImage: string | null
  createdAt: string
}

export default function BlogDetailContent() {
  const params = useParams()
  const slug = params.slug as string
  const [blog, setBlog] = useState<Blog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/blogs/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) setBlog(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))

    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRelatedBlogs(data.filter((b: RelatedBlog) => b.slug !== slug).slice(0, 3))
        }
      })
      .catch(() => {})
  }, [slug])

  if (loading) {
    return (
      <main className="pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-braj-light-gold rounded w-3/4 mb-4" />
            <div className="h-64 bg-braj-light-gold rounded mb-8" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-4 bg-braj-light-gold rounded" />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!blog) {
    return (
      <main className="pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.h1
            className="text-2xl font-bold text-braj-dark-green mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cinematicTransition}
          >
            Blog Post Not Found
          </motion.h1>
          <motion.p
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...cinematicTransition, delay: 0.2 }}
          >
            The blog post you&apos;re looking for doesn&apos;t exist.
          </motion.p>
          <Link href="/blog">
            <Button className="bg-braj-dark-green hover:bg-braj-teal text-white rounded-full gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = blog.title

  return (
    <main className="pt-16 sm:pt-20">
      {/* Blog Header */}
      <section className="relative py-24 sm:py-36 bg-braj-dark-green overflow-hidden min-h-[50vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={blog.featuredImage || IMAGES.vrindavanOverview}
            alt={blog.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-braj-dark-green via-braj-dark-green/70 to-braj-dark-green/30" />
        </div>

        <FloatingOrb color="rgba(247, 184, 8, 0.06)" size={300} top="5%" left="75%" />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} transition={cinematicTransition}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-braj-saffron hover:text-braj-gold transition-colors text-sm mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 mb-5"
            variants={fadeInUp}
            transition={{ ...cinematicTransition, delay: 0.1 }}
          >
            <span className="bg-braj-saffron text-braj-dark-green text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
              <Tag className="w-3 h-3" /> {blog.category}
            </span>
            <span className="text-white/60 text-sm flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </span>
          </motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight"
            variants={textReveal}
          >
            {blog.title}
          </motion.h1>

          <RevealLine className="mt-5 w-20" />
        </motion.div>
      </section>

      {/* Blog Content */}
      <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Featured Image */}
          {blog.featuredImage && (
            <motion.div
              className="rounded-2xl overflow-hidden shadow-lg mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ ...cinematicTransition, duration: 1.0 }}
            >
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-64 sm:h-96 object-cover"
                loading="lazy"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="prose prose-lg max-w-none prose-headings:text-braj-dark-green prose-a:text-braj-teal prose-strong:text-braj-dark-green"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>

          {/* Share & CTA */}
          <motion.div
            className="mt-12 pt-8 border-t border-braj-light-gold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={cinematicTransition}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share this article</span>
                <div className="flex items-center gap-2 ml-2">
                  {[
                    {
                      icon: Facebook,
                      label: 'Facebook',
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                      color: 'hover:bg-blue-600 hover:text-white',
                    },
                    {
                      icon: Twitter,
                      label: 'Twitter',
                      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
                      color: 'hover:bg-sky-500 hover:text-white',
                    },
                    {
                      icon: LinkIcon,
                      label: 'Copy Link',
                      href: '#',
                      color: 'hover:bg-braj-teal hover:text-white',
                      onClick: () => {
                        navigator.clipboard.writeText(shareUrl)
                      },
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.label !== 'Copy Link' ? '_blank' : undefined}
                      rel={social.label !== 'Copy Link' ? 'noopener noreferrer' : undefined}
                      onClick={social.onClick}
                      className={`w-9 h-9 rounded-full bg-braj-cream flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color}`}
                      aria-label={`Share on ${social.label}`}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
              <Link href="/contact">
                <Button className="bg-braj-saffron text-braj-dark-green hover:bg-braj-gold font-bold rounded-full gap-2">
                  Book Your Braj Yatra <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 sm:py-24 bg-braj-cream relative overflow-hidden">
          <FloatingOrb color="rgba(12, 103, 117, 0.05)" size={250} top="10%" left="85%" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
            >
              <motion.span className="text-braj-saffron font-medium text-sm tracking-wider uppercase" variants={textReveal}>
                Continue Reading
              </motion.span>
              <motion.h2 className="text-2xl sm:text-3xl font-bold text-braj-dark-green mt-2" variants={textReveal}>
                Related Articles
              </motion.h2>
              <RevealLine className="mx-auto w-20 mt-3" />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
            >
              {relatedBlogs.map(rb => (
                <motion.div key={rb.id} variants={fadeInUp}>
                  <Link href={`/blog/${rb.slug}`} className="group">
                    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={rb.featuredImage || IMAGES.vrindavanOverview}
                          alt={rb.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-braj-dark-green text-sm group-hover:text-braj-teal transition-colors duration-300 line-clamp-2">{rb.title}</h3>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </main>
  )
}
