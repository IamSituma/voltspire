"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

interface Product {
  id: number
  name: string
  image?: string
  price: number
  quantity: number
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const [loadingIds, setLoadingIds] = useState<number[]>([])

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum: number, item: Product) => sum + (item.price || 0) * (item.quantity || 0),
    0
  )
  const shipping = cartItems.length ? 5000 : 0
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  const handleUpdateQuantity = async (item: Product, newQty: number) => {
    if (newQty < 1) return
    setLoadingIds((prev) => [...prev, item.id])
    await updateQuantity(item.id, newQty)
    setLoadingIds((prev) => prev.filter((id) => id !== item.id))
  }

  const handleRemove = async (id: number) => {
    setLoadingIds((prev) => [...prev, id])
    await removeFromCart(id)
    setLoadingIds((prev) => prev.filter((i) => i !== id))
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link href="/shop">
          <Button>Go Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item: Product) => {
            const isLoading = loadingIds.includes(item.id)
            return (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded-md">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      UGX {(item.price || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isLoading || item.quantity <= 1}
                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                    >
                      {isLoading ? "Updating..." : "-"}
                    </Button>
                    <span className="px-3">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                    >
                      {isLoading ? "Updating..." : "+"}
                    </Button>
                  </div>
                  <span className="font-semibold">
                    UGX {((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                  </span>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isLoading}
                    onClick={() => handleRemove(item.id)}
                  >
                    {isLoading ? "Removing..." : "Remove"}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="border rounded-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>UGX {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>UGX {shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Tax (18%)</span>
            <span>UGX {tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>UGX {total.toLocaleString()}</span>
          </div>
          <Button className="w-full" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
