'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Calendar, Tag, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  cinematicTransition,
  butteryTransition,
  fadeInUp,
  staggerContainer,
  staggerContainerSlow,
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
  excerpt: string | null
  category: string
  featuredImage: string | null
  published: boolean
  createdAt: string
}

export default function BlogContent() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(Array.isArray(data) ? data : [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filteredBlogs = blogs.filter(blog => {
    const matchCategory = selectedCategory === 'All' || blog.category === selectedCategory
    const matchSearch = !searchQuery || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCategory && matchSearch
  })

  const blogCategories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))]

  return (
    <main className="pt-16 sm:pt-20">
      {/* Hero Banner */}
      <section className="relative py-24 sm:py-36 bg-braj-dark-green overflow-hidden">
        <FloatingOrb color="rgba(247, 184, 8, 0.06)" size={350} top="-10%" left="-5%" />

        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainerSlow}
        >
          <motion.span
            className="text-braj-saffron font-medium text-sm tracking-wider uppercase"
            variants={textReveal}
          >
            Our Blog
          </motion.span>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mt-4 mb-5"
            variants={fadeInUp}
          >
            Stories & Guides from Braj Bhoomi
          </motion.h1>
          <RevealLine className="mx-auto w-24 mb-5" />
          <motion.p
            className="text-white/80 text-lg max-w-2xl mx-auto"
            variants={fadeInUp}
            transition={butteryTransition}
          >
            Explore temple guides, festival insights, travel tips, and spiritual stories from the holy land of Krishna
          </motion.p>
        </motion.div>
      </section>

      {/* Blog Content */}
      <section className="py-16 sm:py-24 bg-braj-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              {/* Search */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={defaultViewport}
                transition={{ ...cinematicTransition, duration: 0.8 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search blogs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div
                className="bg-white rounded-xl p-4 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={defaultViewport}
                transition={{ ...cinematicTransition, duration: 0.8, delay: 0.1 }}
              >
                <h3 className="font-bold text-braj-dark-green mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Categories
                </h3>
                <div className="space-y-1">
                  {blogCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCategory === cat
                          ? 'bg-braj-dark-green text-white shadow-md'
                          : 'text-muted-foreground hover:bg-braj-light-gold/50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            </aside>

            {/* Blog Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                      <div className="h-48 bg-braj-light-gold" />
                      <div className="p-5">
                        <div className="h-4 bg-braj-light-gold rounded w-1/3 mb-3" />
                        <div className="h-6 bg-braj-light-gold rounded w-3/4 mb-2" />
                        <div className="h-4 bg-braj-light-gold rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredBlogs.length === 0 ? (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={cinematicTransition}
                >
                  <p className="text-muted-foreground text-lg mb-4">No blogs found</p>
                  <p className="text-muted-foreground text-sm">Check back soon for new stories from Braj Bhoomi!</p>
                </motion.div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                  variants={staggerContainerSlow}
                >
                  {filteredBlogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      variants={fadeInUp}
                      transition={{ ...cinematicTransition, delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${blog.slug}`} className="group">
                        <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={blog.featuredImage || 'https://images.unsplash.com/photo-1655885333110-22b955d35667?w=600&q=80'}
                              alt={blog.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-braj-dark-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="absolute top-3 left-3 bg-braj-dark-green/90 text-white text-xs px-3 py-1 rounded-full">
                              {blog.category}
                            </span>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                              <Calendar className="w-3 h-3" />
                              <time dateTime={blog.createdAt}>
                                {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </time>
                            </div>
                            <h3 className="font-bold text-braj-dark-green text-lg mb-2 group-hover:text-braj-teal transition-colors duration-300 line-clamp-2">
                              {blog.title}
                            </h3>
                            {blog.excerpt && (
                              <p className="text-muted-foreground text-sm line-clamp-2">{blog.excerpt}</p>
                            )}
                            <span className="inline-flex items-center gap-1 text-braj-teal font-medium text-sm mt-3 group-hover:gap-2 transition-all duration-300">
                              Read more <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
