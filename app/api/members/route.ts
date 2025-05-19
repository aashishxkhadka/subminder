import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

// Validation schema for member creation/update
const memberSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["male", "female", "other"]),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  subscriptionPlanId: z.string().uuid("Invalid subscription plan ID"),
})

// GET /api/members
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const members = await prisma.member.findMany({
      where: {
        businessId: session.user.businessId,
      },
      include: {
        subscriptionPlan: true,
      },
      orderBy: {
        joinDate: "desc",
      },
    })

    return NextResponse.json(members)
  } catch (error) {
    console.error("Error fetching members:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST /api/members
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = memberSchema.parse(body)

    // Verify subscription plan belongs to business
    const subscriptionPlan = await prisma.subscriptionPlan.findFirst({
      where: {
        id: validatedData.subscriptionPlanId,
        businessId: session.user.businessId,
      },
    })

    if (!subscriptionPlan) {
      return NextResponse.json(
        { error: "Invalid subscription plan" },
        { status: 400 }
      )
    }

    const member = await prisma.member.create({
      data: {
        ...validatedData,
        businessId: session.user.businessId,
        subscriptionStatus: "active",
      },
      include: {
        subscriptionPlan: true,
      },
    })

    return NextResponse.json(member)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error creating member:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 