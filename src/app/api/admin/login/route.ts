import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const DEFAULT_PASSWORD_HASH = btoa(process.env.ADMIN_PASSWORD || 'brajyatra2024')

// Auto-seed admin user if database is empty (happens on fresh Vercel deployment)
async function ensureAdminExists() {
  try {
    const adminCount = await db.adminUser.count({ where: { role: 'admin' } })
    if (adminCount > 0) return

    const adminPassword = process.env.ADMIN_PASSWORD || 'brajyatra2024'
    const passwordHash = btoa(adminPassword)

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
  } catch (error) {
    console.error('Auto-seed failed:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure admin user exists (auto-seed for fresh deployments)
    await ensureAdminExists()

    const body = await request.json()
    const { username, password } = body

    // If username is provided, check against AdminUser table
    if (username) {
      const user = await db.adminUser.findUnique({ where: { username } })
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      const passwordHash = btoa(password)
      if (user.password !== passwordHash) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      // Return user info with permissions
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

    // Legacy: password-only login (check AdminSettings for custom password, fallback to default)
    if (password) {
      const settingsRecord = await db.adminSettings.findUnique({ where: { key: 'admin_password' } })
      const storedHash = settingsRecord?.value || DEFAULT_PASSWORD_HASH
      const passwordHash = btoa(password)

      if (passwordHash === storedHash) {
        // Check if there's a default admin user
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
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Error during login:', error)
    return NextResponse.json({ error: 'Login failed. Database may not be initialized. Please run migrations first.' }, { status: 500 })
  }
}
