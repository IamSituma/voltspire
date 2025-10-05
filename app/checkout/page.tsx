"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const { cartItems } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("") // card or mobile
  const [mobileProvider, setMobileProvider] = useState("mtn")
  const [mobileNumber, setMobileNumber] = useState("")

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  )
  const shipping = cartItems.length ? 5000 : 0
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Cart Summary + Delivery Address + Payment */}
        <div className="md:col-span-2 space-y-6">
          {/* Order Summary */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {cartItems.length === 0 && <p>Your cart is empty</p>}
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-3">
                  <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      UGX {(item.price || 0).toLocaleString()} x {item.quantity || 1}
                    </p>
                  </div>
                  <div className="font-medium">
                    UGX {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="0700 000 000" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main Street" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Special instructions for delivery" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="mb-4">
                <Label htmlFor="payment-method">Choose Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Visa / Mastercard</SelectItem>
                    <SelectItem value="mobile">Mobile Money</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Card Payment */}
              {paymentMethod === "card" && (
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <Button className="mt-2 w-full">Pay Now</Button>
                </div>
              )}

              {/* Mobile Money */}
              {paymentMethod === "mobile" && (
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="mobile-provider">Select Provider</Label>
                    <Select value={mobileProvider} onValueChange={setMobileProvider}>
                      <SelectTrigger id="mobile-provider">
                        <SelectValue placeholder="Select Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="airtel">Airtel Mobile Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="mobile-number">Phone Number</Label>
                    <Input
                      id="mobile-number"
                      type="tel"
                      placeholder="0700 000 000"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                  <Button className="mt-2 w-full">Pay Now</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Totals */}
        <div>
          <div className="sticky top-20 border rounded p-4 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Totals</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>UGX {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>UGX {shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span>UGX {tax.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>UGX {total.toLocaleString()}</span>
            </div>
            <Button className="w-full mt-2" asChild>
              <Link href="/checkout/review">Place Order</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
