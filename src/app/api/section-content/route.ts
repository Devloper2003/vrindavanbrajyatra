import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/section-content — Get section content, optionally filtered by section
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

    if (section) {
      const content = await db.sectionContent.findUnique({ where: { section } })
      return NextResponse.json(content)
    }

    const allContent = await db.sectionContent.findMany()
    return NextResponse.json(allContent)
  } catch (error) {
    console.error('Error fetching section content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch section content' },
      { status: 500 }
    )
  }
}

// POST /api/section-content — Create or update section content (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, title, subtitle, content, password } = body

    if (password !== (process.env.ADMIN_PASSWORD || 'brajyatra2024')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!section) {
      return NextResponse.json(
        { error: 'Section name is required' },
        { status: 400 }
      )
    }

    // Upsert — create if not exists, update if exists
    const result = await db.sectionContent.upsert({
      where: { section },
      update: {
        title: title ?? null,
        subtitle: subtitle ?? null,
        content: content ?? null,
      },
      create: {
        section,
        title: title ?? null,
        subtitle: subtitle ?? null,
        content: content ?? null,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error saving section content:', error)
    return NextResponse.json(
      { error: 'Failed to save section content' },
      { status: 500 }
    )
  }
}

// PUT /api/section-content — Update section content by id (admin)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, section, title, subtitle, content, password } = body

    if (password !== (process.env.ADMIN_PASSWORD || 'brajyatra2024')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Section content ID is required' },
        { status: 400 }
      )
    }

    const result = await db.sectionContent.update({
      where: { id },
      data: {
        section: section ?? undefined,
        title: title ?? null,
        subtitle: subtitle ?? null,
        content: content ?? null,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating section content:', error)
    return NextResponse.json(
      { error: 'Failed to update section content' },
      { status: 500 }
    )
  }
}

// DELETE /api/section-content — Delete section content (admin)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Section content ID is required' },
        { status: 400 }
      )
    }

    await db.sectionContent.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting section content:', error)
    return NextResponse.json(
      { error: 'Failed to delete section content' },
      { status: 500 }
    )
  }
}
