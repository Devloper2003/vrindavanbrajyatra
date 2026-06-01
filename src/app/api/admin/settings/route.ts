import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const DEFAULT_PASSWORD_HASH = btoa(process.env.ADMIN_PASSWORD || 'brajyatra2024')

// GET - Get admin settings
export async function GET() {
  try {
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

    // Generic setting update
    if (key && value !== undefined) {
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
