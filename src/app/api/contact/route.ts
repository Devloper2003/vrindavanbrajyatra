import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, package: pkg } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Save inquiry to database
    const inquiry = await db.inquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        package: pkg || null,
      },
    })

    // Send email via Resend (when API key is configured)
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey && resendApiKey !== 're_xxxxxxxxxx') {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(resendApiKey)

        await resend.emails.send({
          from: 'Vrindavan Braj Yatra <onboarding@resend.dev>',
          to: ['tour@vrindavanbrajyatra.in'],
          subject: `New Yatra Inquiry from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FFF8E7; border: 1px solid #F5E6C8; border-radius: 8px;">
              <div style="background-color: #0C392E; color: white; padding: 16px 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h2 style="margin: 0; color: #F7B808;">🙏 New Braj Yatra Inquiry</h2>
              </div>
              <div style="padding: 24px; background: white; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #0C392E;">Name:</td><td style="padding: 8px 0; color: #4A4A4A;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #0C392E;">Email:</td><td style="padding: 8px 0; color: #4A4A4A;">${email}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #0C392E;">Phone:</td><td style="padding: 8px 0; color: #4A4A4A;">${phone || 'N/A'}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold; color: #0C392E;">Package:</td><td style="padding: 8px 0; color: #4A4A4A;">${pkg || 'Not specified'}</td></tr>
                </table>
                <div style="margin-top: 16px; padding: 12px; background: #FFF8E7; border-radius: 6px;">
                  <p style="font-weight: bold; color: #0C392E; margin: 0 0 8px 0;">Message:</p>
                  <p style="color: #4A4A4A; margin: 0; line-height: 1.6;">${message}</p>
                </div>
                <div style="margin-top: 16px; text-align: center;">
                  <a href="https://wa.me/91${phone?.replace(/\D/g, '') || '0000000000'}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply on WhatsApp</a>
                </div>
              </div>
            </div>
          `,
        })
        console.log('✅ Email sent via Resend to tour@vrindavanbrajyatra.in')
      } catch (emailError) {
        console.error('⚠️ Resend email failed (API key may not be configured):', emailError)
      }
    } else {
      // Mock email sending when Resend is not configured
      console.log('📧 New inquiry (Resend not configured - email would be sent):', {
        to: 'tour@vrindavanbrajyatra.in',
        subject: `New Yatra Inquiry from ${name}`,
        body: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nPackage: ${pkg || 'N/A'}\nMessage: ${message}`,
      })
    }

    return NextResponse.json({ success: true, inquiry })
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
