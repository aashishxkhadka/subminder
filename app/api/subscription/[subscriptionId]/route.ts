import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { subscriptionId: string } }
) {
  const { subscriptionId } = params
  try {
    await prisma.subscriptionPlan.delete({
      where: { id: subscriptionId },
    })
    return NextResponse.json({ message: "Subscription deleted" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete subscription", details: error }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { subscriptionId: string } }
) {
  const { subscriptionId } = params
  try {
    const body = await req.json()
    const updated = await prisma.subscriptionPlan.update({
      where: { id: subscriptionId },
      data: body,
    })
    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update subscription", details: error }, { status: 500 })
  }
}