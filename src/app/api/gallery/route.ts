import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'brajyatra2024'

function checkAuth(password: string | null): boolean {
  return password === ADMIN_PASSWORD
}

// GET /api/gallery — Get all gallery images (public)
export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
  }
}

// POST /api/gallery — Add gallery image (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { src, alt, category, password } = body

    if (!checkAuth(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!src || !alt || !category) {
      return NextResponse.json({ error: 'Source, alt text, and category are required' }, { status: 400 })
    }

    const image = await db.galleryImage.create({ data: { src, alt, category } })
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 })
  }
}

// PUT /api/gallery — Update gallery image (admin)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, src, alt, category, password } = body

    if (!checkAuth(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }

    const image = await db.galleryImage.update({
      where: { id },
      data: {
        ...(src !== undefined && { src }),
        ...(alt !== undefined && { alt }),
        ...(category !== undefined && { category }),
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 })
  }
}

// DELETE /api/gallery — Delete gallery image (admin - requires auth)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const authPassword = searchParams.get('password') || request.headers.get('x-admin-password')

    if (!checkAuth(authPassword)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }

    await db.galleryImage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 })
  }
}
