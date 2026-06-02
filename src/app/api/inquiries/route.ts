import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'brajyatra2024'

function checkAuth(password: string | null): boolean {
  return password === ADMIN_PASSWORD
}

// GET /api/inquiries — Get all inquiries (public for admin panel, but should be protected)
export async function GET(request: NextRequest) {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

// PUT /api/inquiries — Update inquiry (mark as read/unread) - admin
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, read, password } = body

    if (!checkAuth(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 })
    }

    const inquiry = await db.inquiry.update({
      where: { id },
      data: { read: read ?? true },
    })

    return NextResponse.json(inquiry)
  } catch (error) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 })
  }
}

// DELETE /api/inquiries — Delete inquiry (admin - requires auth)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const authPassword = searchParams.get('password') || request.headers.get('x-admin-password')

    if (!checkAuth(authPassword)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 })
    }

    await db.inquiry.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 })
  }
}
