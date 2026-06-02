import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'brajyatra2024'

function checkAuth(password: string | null): boolean {
  return password === ADMIN_PASSWORD
}

// GET - Get admin settings (requires auth - hides password values)
export async function GET(request: NextRequest) {
  try {
    const authPassword = request.headers.get('x-admin-password') || request.nextUrl.searchParams.get('password')
    if (!checkAuth(authPassword)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await db.adminSettings.findMany()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// PUT - Update settings (including password change)
export async function PUT(request: NextRequest) {
  try {
    const DEFAULT_PASSWORD_HASH = btoa(ADMIN_PASSWORD)
    const body = await request.json()
    const { currentPassword, newPassword, key, value } = body

    // Password change
    if (currentPassword && newPassword) {
      const settingsRecord = await db.adminSettings.findUnique({ where: { key: 'admin_password' } })
      const storedHash = settingsRecord?.value || DEFAULT_PASSWORD_HASH
      const currentHash = btoa(currentPassword)

      if (currentHash !== storedHash) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
      }

      const newHash = btoa(newPassword)

      // Update AdminSettings
      await db.adminSettings.upsert({
        where: { key: 'admin_password' },
        update: { value: newHash },
        create: { key: 'admin_password', value: newHash },
      })

      // Also update all admin users' passwords
      const adminUsers = await db.adminUser.findMany({ where: { role: 'admin' } })
      for (const user of adminUsers) {
        if (user.password === currentHash) {
          await db.adminUser.update({
            where: { id: user.id },
            data: { password: newHash },
          })
        }
      }

      return NextResponse.json({ success: true, message: 'Password updated successfully' })
    }

    // Generic setting update - requires auth
    if (key && value !== undefined) {
      const authPassword = body.password
      if (!checkAuth(authPassword)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      await db.adminSettings.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
