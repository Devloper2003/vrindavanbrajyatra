import type { Metadata } from 'next'
import BlogDetailContent from './blog-detail-content'
import { generatePageMetadata, generateArticleJsonLd } from '@/lib/metadata'
import { db } from '@/lib/db'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const blog = await db.blog.findUnique({ where: { slug } })
    if (blog) {
      return generatePageMetadata({
        title: blog.title,
        description: blog.excerpt || blog.title,
        path: `/blog/${slug}`,
        image: blog.featuredImage || undefined,
        type: 'article',
        keywords: [blog.category, 'Braj Yatra blog'],
      })
    }
  } catch {
    // fallback
  }

  return generatePageMetadata({
    title: 'Blog Post',
    description: 'Read our latest blog post about Braj Bhoomi, Vrindavan temples, festivals, and spiritual insights.',
    path: `/blog/${slug}`,
    type: 'article',
  })
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let articleJsonLd = null
  try {
    const blog = await db.blog.findUnique({ where: { slug } })
    if (blog) {
      articleJsonLd = generateArticleJsonLd({
        title: blog.title,
        description: blog.excerpt || blog.title,
        url: `https://vrindavanbrajyatra.in/blog/${slug}`,
        image: blog.featuredImage || 'https://vrindavanbrajyatra.in/logo.png',
        datePublished: blog.createdAt.toISOString(),
      })
    }
  } catch {
    // no JSON-LD if DB unavailable
  }

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd),
          }}
        />
      )}
      <BlogDetailContent />
    </>
  )
}
