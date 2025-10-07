"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useCheckout } from "@/lib/checkout-context"
import { useCart } from "@/lib/cart-context"

export default function ReviewPage() {
  const { checkoutData, resetCheckout } = useCheckout()
  const { clearCart } = useCart()
  const router = useRouter()

  // Redirect to checkout if no data exists
  useEffect(() => {
    if (!checkoutData) {
      router.push("/checkout")
    }
  }, [checkoutData, router])

  if (!checkoutData) return null // Prevent render if no checkout data

  const { shippingInfo, paymentInfo, totals, items } = checkoutData
  const orderNumber = `PD-${Math.floor(Math.random() * 100000000).toString().padStart(8, "0")}`
  const orderDate = new Date().toLocaleDateString()

  // Optional: Clear checkout and cart if order is finalized
  const handleConfirmOrder = () => {
    resetCheckout()
    clearCart()
    router.push("/checkout/success")
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Review Your Order</h1>
        <p className="text-muted-foreground">
          Please confirm your order details below before finalizing your purchase.
        </p>
      </div>

      {/* Order Info */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {items.length === 0 && <p>Your cart is empty.</p>}
          {items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <div>
                {item.name} x {item.quantity}
              </div>
              <div>UGX {(item.price * item.quantity).toLocaleString()}</div>
            </div>
          ))}

          <Separator className="my-2" />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>UGX {totals.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>UGX {totals.shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18%)</span>
            <span>UGX {totals.tax.toLocaleString()}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>UGX {totals.total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Info */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <p>
            {shippingInfo.firstName} {shippingInfo.lastName}
          </p>
          <p>{shippingInfo.phone}</p>
          <p>{shippingInfo.address}</p>
          {shippingInfo.notes && <p>Notes: {shippingInfo.notes}</p>}
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <p>Method: {paymentInfo.method}</p>
          {paymentInfo.method === "Mobile" && (
            <>
              <p>Provider: {paymentInfo.provider}</p>
              <p>Number: {paymentInfo.number}</p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Confirm Order Button */}
      <div className="flex justify-center gap-4">
        <Button onClick={handleConfirmOrder}>Confirm Order</Button>
        <Button variant="outline" asChild>
          <Link href="/checkout">Edit Details</Link>
        </Button>
      </div>
    </div>
  )
}
