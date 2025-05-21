import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { Prisma } from "@prisma/client"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { subscriptionId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if subscription exists and belongs to the business
    const subscription = await prisma.subscriptionPlan.findFirst({
      where: {
        id: params.subscriptionId,
        businessId: session.user.id
      }
    })

    if (!subscription) {
      return new NextResponse("Subscription not found", { status: 404 })
    }

    try {
      await prisma.subscriptionPlan.delete({
        where: { id: params.subscriptionId }
      })
      return NextResponse.json({ message: "Subscription deleted successfully" })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        return NextResponse.json({ 
          error: "Cannot delete subscription plan that is currently in use by members. Please remove or reassign members first.",
          code: "SUBSCRIPTION_IN_USE"
        }, { status: 400 })
      }
      throw error
    }
  } catch (error) {
    console.error("[SUBSCRIPTION_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { subscriptionId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if subscription exists and belongs to the business
    const subscription = await prisma.subscriptionPlan.findFirst({
      where: {
        id: params.subscriptionId,
        businessId: session.user.id
      }
    })

    if (!subscription) {
      return new NextResponse("Subscription not found", { status: 404 })
    }

    const body = await req.json()
    const updated = await prisma.subscriptionPlan.update({
      where: { id: params.subscriptionId },
      data: body,
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error("[SUBSCRIPTION_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}