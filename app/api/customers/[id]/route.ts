import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prismaClient';

// PUT: Update a member
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updated = await prisma.member.update({
      where: { id },
      data: {
        ...body,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

// DELETE: Delete a member
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.member.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Member deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}
