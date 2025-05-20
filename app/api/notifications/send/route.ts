import { NextResponse } from "next/server"
import { Resend } from "resend"
import { auth } from "@/auth"
import { generateEmailContent } from "@/scripts/email-template"

const resend = new Resend("re_aXRJ7i3X_LRrLsHRQAexAmyWX3HhdLJ57")

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { subject, message, members } = await req.json()

    if (!subject || !message || !members || !Array.isArray(members)) {
      return new NextResponse("Invalid request data", { status: 400 })
    }

    const results = []
    
    // Send email to each member
    for (const member of members) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Subminder <noreply@kshetritej.com.np>',
          to: member.email,
          subject: subject,
          html: generateEmailContent({
            email: member.email,
            subject: subject,
            message: message
          })
        })

        if (error) {
          results.push({
            email: member.email,
            status: 'error',
            error: error.message
          })
        } else {
          results.push({
            email: member.email,
            status: 'success'
          })
        }
      } catch (error) {
        results.push({
          email: member.email,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Error sending notifications:', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
} 