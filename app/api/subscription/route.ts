import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { planName, price, duration, features, businessId } = body

    if (!planName || !price || !duration || !features || !businessId) {
      console.log("body", body)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const subscriptionPlan = await prisma.subscriptionPlan.create({
      data: {
        planName,
        price,
        duration,
        features,
        businessId,
      },
    })

    return NextResponse.json(subscriptionPlan, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create subscription", details: error }, { status: 500 })
  }
}

export async function GET(_req: NextRequest) {
  try {
    const subscriptions = await prisma.subscriptionPlan.findMany()
    return NextResponse.json(subscriptions, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch subscriptions", details: error }, { status: 500 })
  }
}
