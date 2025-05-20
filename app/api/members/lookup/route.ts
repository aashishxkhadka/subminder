import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get("email")

    if (!email) {
      return new NextResponse("Email is required", { status: 400 })
    }

    const member = await prisma.member.findFirst({
      where: {
        email: email.toLowerCase(),
      },
      select: {
        fullName: true,
        email: true,
        subscriptionStatus: true,
        startDate: true,
        endDate: true,
        subscriptionPlan: {
          select: {
            planName: true,
            price: true,
          },
        },
      },
    })

    if (!member) {
      return NextResponse.json({ member: null })
    }

    return NextResponse.json({ member })
  } catch (error) {
    console.error("[MEMBER_LOOKUP]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 