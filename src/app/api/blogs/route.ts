import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/blogs — Get all published blogs
export async function GET() {
  try {
    const blogs = await db.blog.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST /api/blogs — Create a new blog (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, excerpt, category, featuredImage, published, password } = body

    if (password !== (process.env.ADMIN_PASSWORD || 'brajyatra2024')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!title || !slug || !content || !category) {
      return NextResponse.json(
        { error: 'Title, slug, content, and category are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existing = await db.blog.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 409 }
      )
    }

    const blog = await db.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        category,
        featuredImage: featuredImage || null,
        published: published ?? true,
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}
