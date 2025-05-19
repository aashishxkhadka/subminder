import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || undefined

    const skip = (page - 1) * limit

    const where: Prisma.MemberWhereInput = {
      businessId: session.user.businessId,
      OR: [
        { fullName: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { phone: { contains: search } },
      ],
      ...(status && { subscriptionStatus: status }),
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        include: {
          subscriptionPlan: {
            select: {
              planName: true,
            },
          },
        },
        orderBy: {
          joinDate: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.member.count({ where }),
    ])

    return NextResponse.json({
      members,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("[MEMBERS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.businessId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const member = await prisma.member.create({
      data: {
        ...body,
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

    return NextResponse.json(member)
  } catch (error) {
    console.error("[MEMBERS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 