import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const memberSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.string(),
  startDate: z.string().transform(str => new Date(str)),
  endDate: z.string().transform(str => new Date(str)),
  subscriptionStatus: z.string(),
  subscriptionPlanId: z.string(),
})

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const member = await prisma.member.findFirst({
      where: {
        id: params.id,
        businessId: session.user.businessId,
      },
      include: {
        subscriptionPlan: {
          select: {
            planName: true,
          },
        },
      },
    })

    if (!member) {
      return new NextResponse("Member not found", { status: 404 })
    }

    return NextResponse.json(member)
  } catch (error) {
    console.error("[MEMBER_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const validatedData = memberSchema.parse(body)

    // Check if member exists and belongs to the business
    const existingMember = await prisma.member.findFirst({
      where: {
        id: params.id,
        businessId: session.user.businessId,
      },
    })

    if (!existingMember) {
      return new NextResponse("Member not found", { status: 404 })
    }

    // Check if email is being changed and if it's already in use
    if (validatedData.email !== existingMember.email) {
      const emailExists = await prisma.member.findFirst({
        where: {
          email: validatedData.email,
          businessId: session.user.businessId,
          id: { not: params.id },
        },
      })

      if (emailExists) {
        return new NextResponse("Email already in use", { status: 400 })
      }
    }

    const member = await prisma.member.update({
      where: {
        id: params.id,
      },
      data: validatedData,
      include: {
        subscriptionPlan: {
          select: {
            planName: true,
          },
        },
      },
    })

    return NextResponse.json(member)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 })
    }

    console.error("[MEMBER_PUT]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if member exists and belongs to the business
    const existingMember = await prisma.member.findFirst({
      where: {
        id: params.id,
        businessId: session.user.businessId,
      },
    })

    if (!existingMember) {
      return new NextResponse("Member not found", { status: 404 })
    }

    await prisma.member.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[MEMBER_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 