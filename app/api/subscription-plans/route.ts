import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const subscriptionPlans = await prisma.subscriptionPlan.findMany({
      where: {
        businessId: session.user.businessId,
      },
      orderBy: {
        price: "asc",
      },
    })

    return NextResponse.json(subscriptionPlans)
  } catch (error) {
    console.error("Error fetching subscription plans:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 