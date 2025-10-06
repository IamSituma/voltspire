import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const userId = parseInt(params.userId);
  const cartItems = await prisma.cartItem.findMany({
    where: { orderId: null }, // Only active cart items
    include: { product: true },
  });
  return NextResponse.json(cartItems);
}

export async function POST(req: NextRequest) {
  const { productId, quantity } = await req.json();

  // Check if the cart item exists
  let cartItem = await prisma.cartItem.findFirst({
    where: { productId, orderId: null },
  });

  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: cartItem.quantity + quantity },
    });
  } else {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    cartItem = await prisma.cartItem.create({
      data: {
        productId,
        quantity,
        price: product.offerPrice,
      },
    });
  }

  return NextResponse.json(cartItem);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await prisma.cartItem.delete({ where: { id } });
  return NextResponse.json({ message: "Removed" });
}
