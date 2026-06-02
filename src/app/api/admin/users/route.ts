import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'brajyatra2024'

// Simple auth check helper
function checkAuth(password: string | null): boolean {
  return password === ADMIN_PASSWORD
}

// GET - List all admin users (requires auth via header)
export async function GET(request: NextRequest) {
  try {
    const authPassword = request.headers.get('x-admin-password') || request.nextUrl.searchParams.get('password')
    if (!checkAuth(authPassword)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await db.adminUser.findMany({
      orderBy: { createdAt: 'desc' },
    })
    // Don't return password hashes
    const safeUsers = users.map(({ password: _password, ...user }) => user)
    return NextResponse.json(safeUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

// POST - Create a new admin user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password: authPassword, username, password, name, role,
      canEditHero, canEditAbout, canEditHighlights, canEditPackages,
      canEditTestimonials, canEditFAQ, canEditContact, canEditFooter,
      canManageBlogs, canManageGallery, canViewInquiries,
    } = body

    if (!checkAuth(authPassword)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!username || !password || !name) {
      return NextResponse.json({ error: 'Username, password, and name are required' }, { status: 400 })
    }

    // Check if username already exists
    const existing = await db.adminUser.findUnique({ where: { username } })
    if (existing) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
    }

    const passwordHash = btoa(password)

    const user = await db.adminUser.create({
      data: {
        username, password: passwordHash, name, role: role || 'staff',
        canEditHero: canEditHero ?? false, canEditAbout: canEditAbout ?? false,
        canEditHighlights: canEditHighlights ?? false, canEditPackages: canEditPackages ?? false,
        canEditTestimonials: canEditTestimonials ?? false, canEditFAQ: canEditFAQ ?? false,
        canEditContact: canEditContact ?? false, canEditFooter: canEditFooter ?? false,
        canManageBlogs: canManageBlogs ?? false, canManageGallery: canManageGallery ?? false,
        canViewInquiries: canViewInquiries ?? true,
      },
    })

    const { password: _password, ...safeUser } = user
    return NextResponse.json(safeUser, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

// PUT - Update an admin user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { password: authPassword, id, name, role, password, ...permissions } = body

    if (!checkAuth(authPassword)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const existing = await db.adminUser.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (role !== undefined) updateData.role = role
    if (password) updateData.password = btoa(password)

    const permFields = [
      'canEditHero', 'canEditAbout', 'canEditHighlights', 'canEditPackages',
      'canEditTestimonials', 'canEditFAQ', 'canEditContact', 'canEditFooter',
      'canManageBlogs', 'canManageGallery', 'canViewInquiries',
    ]
    for (const field of permFields) {
      if (permissions[field] !== undefined) updateData[field] = permissions[field]
    }

    const user = await db.adminUser.update({ where: { id }, data: updateData })
    const { password: _password, ...safeUser } = user
    return NextResponse.json(safeUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

// DELETE - Delete an admin user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const authPassword = searchParams.get('password') || request.headers.get('x-admin-password')

    if (!checkAuth(authPassword)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const existing = await db.adminUser.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if this is the last admin
    if (existing.role === 'admin') {
      const adminCount = await db.adminUser.count({ where: { role: 'admin' } })
      if (adminCount <= 1) {
        return NextResponse.json({ error: 'Cannot delete the last admin user' }, { status: 400 })
      }
    }

    await db.adminUser.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
