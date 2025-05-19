// app/api/business/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import { verifyToken } from "@/lib/auth"; // optional helper to extract JWT

// Get logged-in business profile
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = verifyToken(token); // Custom function to decode JWT
    const businessId = decoded?.id;

    if (!businessId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        industryType: true,
        logoUrl: true,
        registrationDate: true,
      }
    });

    return NextResponse.json(business);
  } catch (error) {
    console.error("GET /business error:", error);
    return NextResponse.json({ message: "Failed to fetch business profile" }, { status: 500 });
  }
}

// Update business profile
export async function PATCH(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = verifyToken(token);
    const businessId = decoded?.id;

    if (!businessId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updatedBusiness = await prisma.business.update({
      where: { id: businessId },
      data: {
        name: body.name,
        phone: body.phone,
        address: body.address,
        industryType: body.industryType,
        logoUrl: body.logoUrl,
      },
    });

    return NextResponse.json({
      message: "Business profile updated successfully",
      data: updatedBusiness,
    });
  } catch (error) {
    console.error("PATCH /business error:", error);
    return NextResponse.json({ message: "Failed to update business profile" }, { status: 500 });
  }
}
