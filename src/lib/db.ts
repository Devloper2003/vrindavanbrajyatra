import { PrismaClient } from '@prisma/client'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // For Vercel/Neon: use the Neon serverless adapter if DATABASE_URL is a Neon connection
  const databaseUrl = process.env.DATABASE_URL || ''

  if (databaseUrl.includes('.neon.tech') || process.env.NEON === '1') {
    // Use Neon serverless driver for better performance on Vercel
    const pool = new Pool({ connectionString: databaseUrl })
    const adapter = new PrismaNeon(pool)
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    })
  }

  // Fallback: standard Prisma client (for local dev with regular PostgreSQL or SQLite)
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
