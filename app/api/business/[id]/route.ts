import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = Promise<{ id: string }>
export async function GET(
  req: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;
  try {
    const business = await prisma.business.findUnique({
      where: { id },
    });
    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }
    return NextResponse.json(business, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch business", details: error }, { status: 500 });
  }
}