import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

// Validation schema for member update
const memberSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["male", "female", "other"]),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
  subscriptionPlanId: z.string().uuid("Invalid subscription plan ID"),
})

// GET /api/members/[id]
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const member = await prisma.member.findFirst({
      where: {
        id: params.id,
        businessId: session.user.businessId,
      },
      include: {
        subscriptionPlan: true,
      },
    })

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    return NextResponse.json(member)
  } catch (error) {
    console.error("Error fetching member:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// PUT /api/members/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = memberSchema.parse(body)

    // Verify member belongs to business
    const existingMember = await prisma.member.findFirst({
      where: {
        id: params.id,
        businessId: session.user.businessId,
      },
    })

    if (!existingMember) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

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

    const updatedMember = await prisma.member.update({
      where: {
        id: params.id,
      },
      data: validatedData,
      include: {
        subscriptionPlan: true,
      },
    })

    return NextResponse.json(updatedMember)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error updating member:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// DELETE /api/members/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify member belongs to business
    const existingMember = await prisma.member.findFirst({
      where: {
        id: params.id,
        businessId: session.user.businessId,
      },
    })

    if (!existingMember) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 })
    }

    await prisma.member.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting member:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 