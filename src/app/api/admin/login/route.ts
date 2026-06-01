import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'brajyatra2024'
const DEFAULT_PASSWORD_HASH = btoa(DEFAULT_PASSWORD)

// Auto-seed admin user if database is empty (happens on fresh Vercel deployment)
async function ensureAdminExists(): Promise<{ seeded: boolean; error?: string }> {
  try {
    const adminCount = await db.adminUser.count({ where: { role: 'admin' } })
    if (adminCount > 0) return { seeded: false }

    const passwordHash = btoa(DEFAULT_PASSWORD)

    await db.adminUser.create({
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

    // Store password in AdminSettings for legacy login support
    await db.adminSettings.upsert({
      where: { key: 'admin_password' },
      update: { value: passwordHash },
      create: { key: 'admin_password', value: passwordHash },
    })

    console.log('✅ Auto-seed: Admin user created during login')
    return { seeded: true }
  } catch (error) {
    console.error('Auto-seed failed:', error)
    return { seeded: false, error: String(error) }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Step 1: Ensure admin user exists (auto-seed for fresh deployments)
    const seedResult = await ensureAdminExists()
    if (seedResult.error) {
      console.error('Seed error:', seedResult.error)
    }

    const body = await request.json()
    const { username, password } = body

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    const passwordHash = btoa(password)

    // Step 2: If username is provided, check against AdminUser table
    if (username) {
      const user = await db.adminUser.findUnique({ where: { username } })
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      if (user.password !== passwordHash) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      return NextResponse.json({
        success: true,
        token: `braj-admin-token-${user.id}`,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          canEditHero: user.canEditHero,
          canEditAbout: user.canEditAbout,
          canEditHighlights: user.canEditHighlights,
          canEditPackages: user.canEditPackages,
          canEditTestimonials: user.canEditTestimonials,
          canEditFAQ: user.canEditFAQ,
          canEditContact: user.canEditContact,
          canEditFooter: user.canEditFooter,
          canManageBlogs: user.canManageBlogs,
          canManageGallery: user.canManageGallery,
          canViewInquiries: user.canViewInquiries,
        },
      })
    }

    // Step 3: Legacy password-only login
    // Check AdminSettings for stored password hash, fallback to env default
    let storedHash = DEFAULT_PASSWORD_HASH
    try {
      const settingsRecord = await db.adminSettings.findUnique({ where: { key: 'admin_password' } })
      if (settingsRecord?.value) {
        storedHash = settingsRecord.value
      }
    } catch {
      // Table might not exist yet, use default
    }

    if (passwordHash === storedHash) {
      // Find admin user for permissions
      try {
        const adminUser = await db.adminUser.findFirst({ where: { role: 'admin' } })
        if (adminUser) {
          return NextResponse.json({
            success: true,
            token: `braj-admin-token-${adminUser.id}`,
            user: {
              id: adminUser.id,
              username: adminUser.username,
              name: adminUser.name,
              role: adminUser.role,
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
        }
      } catch {
        // AdminUser table might not exist
      }

      // Fallback: no admin user in DB yet, return default admin permissions
      return NextResponse.json({
        success: true,
        token: 'braj-admin-token-default',
        user: {
          id: 'default',
          username: 'admin',
          name: 'Admin',
          role: 'admin',
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
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      error: 'Login failed',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    }, { status: 500 })
  }
}
