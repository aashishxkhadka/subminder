import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prismaClient";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = ["name", "email", "password", "phone", "address", "industryType"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    // Check if business already exists
    const existingBusiness = await prisma.business.findUnique({
      where: { email: body.email },
    });

    if (existingBusiness) {
      return NextResponse.json(
        { message: "Business with this email already exists." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create business
    const newBusiness = await prisma.business.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        industryType: body.industryType,
        password: hashedPassword,
        logoUrl: body.logoUrl || null,
      },
    });

    // Generate JWT
    const token = jwt.sign(
      { email: newBusiness.email, id: newBusiness.id },
      process.env.JWT_SECRET!,
      { expiresIn: "10m" }
    );

    return NextResponse.json(
      {
        message: "Business registered successfully",
        data: newBusiness,
        token,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
