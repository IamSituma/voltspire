// POST /api/order
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { itemIds }: { itemIds: number[] } = await req.json(); // type itemIds

  if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  // Fetch cart items
  const items = await prisma.cartItem.findMany({
    where: { id: { in: itemIds }, orderId: null },
  });

  if (items.length === 0) {
    return NextResponse.json({ error: "No valid cart items found" }, { status: 404 });
  }

  // Calculate total
  const totalAmount = items.reduce((sum: number, item: typeof items[number]) => sum + item.price * item.quantity, 0);

  // Create order
  const order = await prisma.order.create({
    data: {
      totalAmount,
      items: {
        connect: items.map((item: typeof items[number]) => ({ id: item.id })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order);
}

// GET /api/order
export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}
