import { NextResponse } from 'next/server';
import prisma from '@/prisma/prismaClient'; // adjust path as needed

// GET: Fetch all members for current business
export async function GET(req: Request) {
  const businessId = req.headers.get('x-business-id'); // or from session

  if (!businessId) {
    return NextResponse.json({ error: 'Business ID missing' }, { status: 400 });
  }

  try {
    const members = await prisma.member.findMany({
      where: { businessId },
      include: {
        subscriptionPlan: true,
        billingRecords: true,
      },
    });

    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

// POST: Add a new member
export async function POST(req: Request) {
  const body = await req.json();

  const {
    fullName,
    email,
    phone,
    gender,
    startDate,
    endDate,
    subscriptionPlanId,
    businessId,
  } = body;

  if (!fullName || !email || !phone || !subscriptionPlanId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newMember = await prisma.member.create({
      data: {
        fullName,
        email,
        phone,
        gender,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        subscriptionStatus: 'active',
        subscriptionPlanId,
        businessId,
      },
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
