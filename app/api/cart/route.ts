import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1 } = await req.json()

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 })
    }

    // Find the product
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Find a pending order (for simplicity, single order for now)
    let order = await prisma.order.findFirst({ where: { status: "pending" } })
    if (!order) {
      order = await prisma.order.create({ data: { totalAmount: 0 } })
    }

    // Check if CartItem exists for this product
    let cartItem = await prisma.cartItem.findFirst({
      where: { orderId: order.id, productId },
    })

    if (cartItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      })
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          orderId: order.id,
          productId,
          quantity,
          price: product.offerPrice,
        },
      })
    }

    // Update order total
    const totalAmount = await prisma.cartItem
      .findMany({ where: { orderId: order.id } })
      .then((items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0))

    await prisma.order.update({ where: { id: order.id }, data: { totalAmount } })

    return NextResponse.json({ success: true, cartItem })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}
