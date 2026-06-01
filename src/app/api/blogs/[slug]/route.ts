import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/blogs/[slug] — Get single blog by slug or id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    // Try finding by slug first, then by id
    let blog = await db.blog.findUnique({ where: { slug } })
    if (!blog) {
      blog = await db.blog.findUnique({ where: { id: slug } })
    }

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT /api/blogs/[slug] — Update blog (admin), slug param is the blog id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: id } = await params
    const body = await request.json()
    const { password, ...data } = body

    if (password !== (process.env.ADMIN_PASSWORD || 'brajyatra2024')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const blog = await db.blog.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || null,
        category: data.category,
        featuredImage: data.featuredImage || null,
        published: data.published,
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE /api/blogs/[slug] — Delete blog (admin), slug param is the blog id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: id } = await params
    const body = await request.json()
    const { password } = body

    if (password !== (process.env.ADMIN_PASSWORD || 'brajyatra2024')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.blog.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
