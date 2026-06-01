import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Auto-seed endpoint - called by login when DB is empty
// This ensures the admin user exists after fresh deployment
export async function POST() {
  try {
    // Check if any admin user exists
    const adminCount = await db.adminUser.count({ where: { role: 'admin' } })

    if (adminCount > 0) {
      return NextResponse.json({ message: 'Database already seeded', seeded: false })
    }

    const adminPassword = process.env.ADMIN_PASSWORD || 'brajyatra2024'
    const passwordHash = btoa(adminPassword)

    // Create default admin user
    const admin = await db.adminUser.create({
      data: {
        username: 'admin',
        password: passwordHash,
        role: 'admin',
        name: 'Admin',
        canEditHero: true,
        canEditAbout: true,
        canEditHighlights: true,
        canEditPackages: true,
        canEditTestimonials: true,
        canEditFAQ: true,
        canEditContact: true,
        canEditFooter: true,
        canManageBlogs: true,
        canManageGallery: true,
        canViewInquiries: true,
      },
    })

    // Also store password hash in AdminSettings for legacy login
    await db.adminSettings.upsert({
      where: { key: 'admin_password' },
      update: { value: passwordHash },
      create: { key: 'admin_password', value: passwordHash },
    })

    console.log('✅ Auto-seed: Admin user created successfully')

    return NextResponse.json({
      message: 'Database seeded successfully',
      seeded: true,
      adminUsername: admin.username,
    })
  } catch (error) {
    console.error('Auto-seed error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', details: String(error) },
      { status: 500 }
    )
  }
}

// GET - Check if database is seeded
export async function GET() {
  try {
    const adminCount = await db.adminUser.count({ where: { role: 'admin' } })
    return NextResponse.json({
      seeded: adminCount > 0,
      adminCount,
    })
  } catch (error) {
    console.error('Seed check error:', error)
    return NextResponse.json(
      { seeded: false, error: String(error) },
      { status: 500 }
    )
  }
}
