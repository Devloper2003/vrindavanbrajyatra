import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const DEFAULT_PASSWORD_HASH = btoa(process.env.ADMIN_PASSWORD || 'brajyatra2024')

// SQL statements split into individual queries for Prisma $executeRawUnsafe
const CREATE_TABLE_QUERIES = [
  `CREATE TABLE IF NOT EXISTS "Blog" (
    "id" TEXT NOT NULL, "title" TEXT NOT NULL, "slug" TEXT NOT NULL, "content" TEXT NOT NULL,
    "excerpt" TEXT, "category" TEXT NOT NULL, "featuredImage" TEXT, "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE TABLE IF NOT EXISTS "Inquiry" (
    "id" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT NOT NULL, "phone" TEXT,
    "message" TEXT NOT NULL, "package" TEXT, "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE TABLE IF NOT EXISTS "GalleryImage" (
    "id" TEXT NOT NULL, "src" TEXT NOT NULL, "alt" TEXT NOT NULL, "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE TABLE IF NOT EXISTS "SectionContent" (
    "id" TEXT NOT NULL, "section" TEXT NOT NULL, "title" TEXT, "subtitle" TEXT, "content" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SectionContent_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE TABLE IF NOT EXISTS "AdminSettings" (
    "id" TEXT NOT NULL, "key" TEXT NOT NULL, "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminSettings_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT NOT NULL, "username" TEXT NOT NULL, "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'staff', "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canEditHero" BOOLEAN NOT NULL DEFAULT false, "canEditAbout" BOOLEAN NOT NULL DEFAULT false,
    "canEditHighlights" BOOLEAN NOT NULL DEFAULT false, "canEditPackages" BOOLEAN NOT NULL DEFAULT false,
    "canEditTestimonials" BOOLEAN NOT NULL DEFAULT false, "canEditFAQ" BOOLEAN NOT NULL DEFAULT false,
    "canEditContact" BOOLEAN NOT NULL DEFAULT false, "canEditFooter" BOOLEAN NOT NULL DEFAULT false,
    "canManageBlogs" BOOLEAN NOT NULL DEFAULT false, "canManageGallery" BOOLEAN NOT NULL DEFAULT false,
    "canViewInquiries" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Blog_slug_key" ON "Blog"("slug")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "SectionContent_section_key" ON "SectionContent"("section")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "AdminSettings_key_key" ON "AdminSettings"("key")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_username_key" ON "AdminUser"("username")`,
]

// Ensure database tables exist and admin user is seeded
async function ensureDatabaseReady() {
  try {
    // Try using Prisma - if tables exist, this will work
    const adminCount = await db.adminUser.count({ where: { role: 'admin' } })
    if (adminCount > 0) return true

    // Tables exist but no admin user - create one via Prisma
    const adminPassword = process.env.ADMIN_PASSWORD || 'brajyatra2024'
    const passwordHash = btoa(adminPassword)

    await db.adminUser.create({
      data: {
        username: 'admin', password: passwordHash, role: 'admin', name: 'Admin',
        canEditHero: true, canEditAbout: true, canEditHighlights: true,
        canEditPackages: true, canEditTestimonials: true, canEditFAQ: true,
        canEditContact: true, canEditFooter: true, canManageBlogs: true,
        canManageGallery: true, canViewInquiries: true,
      },
    })

    await db.adminSettings.upsert({
      where: { key: 'admin_password' },
      update: { value: passwordHash },
      create: { key: 'admin_password', value: passwordHash },
    })

    console.log('✅ Auto-seed: Admin user created during login')
    return true
  } catch (error: any) {
    // If error indicates tables don't exist, create them via Prisma raw SQL
    const errorMsg = String(error?.message || error || '')
    if (errorMsg.includes('does not exist') || errorMsg.includes('relation') || errorMsg.includes('not found') || errorMsg.includes('table')) {
      console.log('⚠️ Tables do not exist, creating via Prisma raw SQL...')
      try {
        // Create all tables
        for (const query of CREATE_TABLE_QUERIES) {
          await db.$executeRawUnsafe(query)
        }

        // Create admin user via raw SQL
        const adminPassword = process.env.ADMIN_PASSWORD || 'brajyatra2024'
        const passwordHash = btoa(adminPassword)
        const adminId = `cl${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`

        await db.$executeRawUnsafe(
          `INSERT INTO "AdminUser" (id, username, password, role, name, "canEditHero", "canEditAbout", "canEditHighlights", "canEditPackages", "canEditTestimonials", "canEditFAQ", "canEditContact", "canEditFooter", "canManageBlogs", "canManageGallery", "canViewInquiries") VALUES ('${adminId}', 'admin', '${passwordHash}', 'admin', 'Admin', true, true, true, true, true, true, true, true, true, true, true)`
        )

        const settingsId = `cl${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
        await db.$executeRawUnsafe(
          `INSERT INTO "AdminSettings" (id, key, value) VALUES ('${settingsId}', 'admin_password', '${passwordHash}') ON CONFLICT (key) DO UPDATE SET value = '${passwordHash}', "updatedAt" = CURRENT_TIMESTAMP`
        )

        console.log('✅ Tables created and admin user seeded via raw SQL')
        return true
      } catch (sqlError) {
        console.error('Failed to create tables via SQL:', sqlError)
        return false
      }
    }

    console.error('Unexpected error in ensureDatabaseReady:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure database is ready (tables exist + admin user seeded)
    const dbReady = await ensureDatabaseReady()

    if (!dbReady) {
      return NextResponse.json({
        error: 'Database initialization failed. Please check your DATABASE_URL environment variable. You can also visit /api/init-db to initialize manually.',
      }, { status: 500 })
    }

    const body = await request.json()
    const { username, password } = body

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    const passwordHash = btoa(password)

    // If username is provided, check against AdminUser table
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
          id: user.id, username: user.username, name: user.name, role: user.role,
          canEditHero: user.canEditHero, canEditAbout: user.canEditAbout,
          canEditHighlights: user.canEditHighlights, canEditPackages: user.canEditPackages,
          canEditTestimonials: user.canEditTestimonials, canEditFAQ: user.canEditFAQ,
          canEditContact: user.canEditContact, canEditFooter: user.canEditFooter,
          canManageBlogs: user.canManageBlogs, canManageGallery: user.canManageGallery,
          canViewInquiries: user.canViewInquiries,
        },
      })
    }

    // Legacy: password-only login
    if (password) {
      let storedHash = DEFAULT_PASSWORD_HASH
      try {
        const settingsRecord = await db.adminSettings.findUnique({ where: { key: 'admin_password' } })
        if (settingsRecord?.value) storedHash = settingsRecord.value
      } catch {
        // Table might not exist yet, use default
      }

      if (passwordHash === storedHash) {
        try {
          const adminUser = await db.adminUser.findFirst({ where: { role: 'admin' } })
          if (adminUser) {
            return NextResponse.json({
              success: true,
              token: `braj-admin-token-${adminUser.id}`,
              user: {
                id: adminUser.id, username: adminUser.username, name: adminUser.name, role: adminUser.role,
                canEditHero: true, canEditAbout: true, canEditHighlights: true,
                canEditPackages: true, canEditTestimonials: true, canEditFAQ: true,
                canEditContact: true, canEditFooter: true, canManageBlogs: true,
                canManageGallery: true, canViewInquiries: true,
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
            id: 'default', username: 'admin', name: 'Admin', role: 'admin',
            canEditHero: true, canEditAbout: true, canEditHighlights: true,
            canEditPackages: true, canEditTestimonials: true, canEditFAQ: true,
            canEditContact: true, canEditFooter: true, canManageBlogs: true,
            canManageGallery: true, canViewInquiries: true,
          },
        })
      }
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({
      error: 'Login failed. Database may not be initialized. Visit /api/init-db to set up the database.',
    }, { status: 500 })
  }
}
