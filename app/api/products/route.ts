// app/api/products/route.ts
export const runtime = "nodejs"; // 👈 ensures Prisma runs in Node.js, not on the Edge runtime

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Use a global variable to prevent multiple instances in development
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
