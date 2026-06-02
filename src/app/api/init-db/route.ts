import { NextResponse } from 'next/server'
import { Pool } from '@neondatabase/serverless'

// Raw SQL to create all tables if they don't exist
// This bypasses Prisma migrations entirely and works with any Neon connection (pooled or direct)
const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "category" TEXT NOT NULL,
    "featuredImage" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Inquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "package" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "GalleryImage" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SectionContent" (
    "id" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "title" TEXT,
    "subtitle" TEXT,
    "content" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SectionContent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AdminSettings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'staff',
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canEditHero" BOOLEAN NOT NULL DEFAULT false,
    "canEditAbout" BOOLEAN NOT NULL DEFAULT false,
    "canEditHighlights" BOOLEAN NOT NULL DEFAULT false,
    "canEditPackages" BOOLEAN NOT NULL DEFAULT false,
    "canEditTestimonials" BOOLEAN NOT NULL DEFAULT false,
    "canEditFAQ" BOOLEAN NOT NULL DEFAULT false,
    "canEditContact" BOOLEAN NOT NULL DEFAULT false,
    "canEditFooter" BOOLEAN NOT NULL DEFAULT false,
    "canManageBlogs" BOOLEAN NOT NULL DEFAULT false,
    "canManageGallery" BOOLEAN NOT NULL DEFAULT false,
    "canViewInquiries" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Blog_slug_key" ON "Blog"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "SectionContent_section_key" ON "SectionContent"("section");
CREATE UNIQUE INDEX IF NOT EXISTS "AdminSettings_key_key" ON "AdminSettings"("key");
CREATE UNIQUE INDEX IF NOT EXISTS "AdminUser_username_key" ON "AdminUser"("username");
`

// Track if initialization has been done this cold start
let initialized = false

async function initDatabase(): Promise<{ success: boolean; message: string; details?: string }> {
  if (initialized) {
    return { success: true, message: 'Database already initialized this session' }
  }

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    return { success: false, message: 'DATABASE_URL environment variable is not set' }
  }

  try {
    const pool = new Pool({ connectionString: databaseUrl })

    // Create all tables
    await pool.query(CREATE_TABLES_SQL)

    // Check if admin user exists, if not create one
    const adminPassword = process.env.ADMIN_PASSWORD || 'brajyatra2024'
    const passwordHash = btoa(adminPassword)

    const adminCheck = await pool.query(
      `SELECT id FROM "AdminUser" WHERE role = 'admin' LIMIT 1`
    )

    if (adminCheck.rows.length === 0) {
      // Generate a cuid-like ID
      const adminId = `cl${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`

      await pool.query(
        `INSERT INTO "AdminUser" (id, username, password, role, name, "canEditHero", "canEditAbout", "canEditHighlights", "canEditPackages", "canEditTestimonials", "canEditFAQ", "canEditContact", "canEditFooter", "canManageBlogs", "canManageGallery", "canViewInquiries")
         VALUES ($1, 'admin', $2, 'admin', 'Admin', true, true, true, true, true, true, true, true, true, true, true)`,
        [adminId, passwordHash]
      )

      // Also store password in AdminSettings
      const settingsId = `cl${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
      await pool.query(
        `INSERT INTO "AdminSettings" (id, key, value) VALUES ($1, 'admin_password', $2)
         ON CONFLICT (key) DO UPDATE SET value = $2, "updatedAt" = CURRENT_TIMESTAMP`,
        [settingsId, passwordHash]
      )

      console.log('✅ Init-DB: Admin user created with username "admin"')
    }

    // Clean up pool
    await pool.end()

    initialized = true
    return { success: true, message: 'Database initialized successfully with all tables and default admin user' }
  } catch (error) {
    console.error('Init-DB error:', error)
    return { success: false, message: 'Failed to initialize database', details: String(error) }
  }
}

// GET - Initialize database (called automatically or manually)
export async function GET() {
  const result = await initDatabase()

  if (result.success) {
    return NextResponse.json(result)
  } else {
    return NextResponse.json(result, { status: 500 })
  }
}

// POST - Also support POST for programmatic calls (forces re-init)
export async function POST() {
  // Reset initialized flag to force re-initialization
  initialized = false
  const result = await initDatabase()

  if (result.success) {
    return NextResponse.json(result)
  } else {
    return NextResponse.json(result, { status: 500 })
  }
}
