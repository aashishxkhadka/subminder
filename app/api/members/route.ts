import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { auth } from "@/auth"
import { startOfDay } from "date-fns";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user.id) {
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
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const member = await prisma.member.create({
      data: {
        ...body,
        startDate: new Date(body.startDate), 
        endDate: new Date(body.endDate),
        businessId: session.user.id,
      },
    })

    return NextResponse.json(member)
  } catch (error) {
    console.error("[MEMBERS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GETAll() {
  try {
    const members = await prisma.member.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        business: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json({ members });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

// New endpoint for getting all members for notifications
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 