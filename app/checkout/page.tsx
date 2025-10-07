"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useCheckout } from "@/lib/checkout-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems } = useCart()
  const { setCheckoutData } = useCheckout()

  // Delivery & Payment States
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"" | "Card" | "Mobile" | "Cash">("")

  const [mobileProvider, setMobileProvider] = useState<"MTN" | "Airtel">("MTN")
  const [mobileNumber, setMobileNumber] = useState("")

  // Card fields
  const [cardNumber, setCardNumber] = useState("")
  const [cardCVV, setCardCVV] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  )
  const shipping = cartItems.length ? 5000 : 0
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  // Mobile prefixes
  const mtnPrefixes = ["077", "078", "076", "079"]
  const AirtelPrefixes = ["070", "074", "075"]

  // Real-time mobile number validation
  const handleMobileNumberChange = (value: string) => {
    let digits = value.replace(/\D/g, "")
    if (digits.length > 10) digits = digits.slice(0, 10)
    const prefix = digits.slice(0, 3)
    if (mobileProvider === "MTN" && digits.length > 0 && !mtnPrefixes.includes(prefix)) {
      digits = prefix
    }
    if (mobileProvider === "Airtel" && digits.length > 0 && !AirtelPrefixes.includes(prefix)) {
      digits = prefix
    }
    setMobileNumber(digits)
  }

  // Handle place order
  const handlePlaceOrder = () => {
    if (!firstName || !lastName || !phone || !address || !paymentMethod) {
      alert("Please fill in all required fields")
      return
    }

    if (paymentMethod === "Card" && (!cardNumber || !cardCVV || !cardExpiry)) {
      alert("Please fill in your card details")
      return
    }

    if (paymentMethod === "Mobile") {
      if (!mobileNumber || !mobileProvider) {
        alert("Please fill in your mobile money details")
        return
      }
      if (mobileNumber.length !== 10) {
        alert("Mobile number must be exactly 10 digits")
        return
      }
      const prefix = mobileNumber.slice(0, 3)
      if (mobileProvider === "MTN" && !mtnPrefixes.includes(prefix)) {
        alert("MTN Mobile Money number must start with 077, 078, 076, or 079")
        return
      }
      if (mobileProvider === "Airtel" && !AirtelPrefixes.includes(prefix)) {
        alert("Airtel Mobile Money number must start with 070, 074, or 075")
        return
      }
    }

    setCheckoutData({
      shippingInfo: { firstName, lastName, phone, address, notes },
      paymentInfo: {
        method: paymentMethod,
        provider: paymentMethod === "Mobile" ? mobileProvider : undefined,
        number: paymentMethod === "Mobile" ? mobileNumber : undefined,
        cardNumber: paymentMethod === "Card" ? cardNumber : undefined,
        cardCVV: paymentMethod === "Card" ? cardCVV : undefined,
        cardExpiry: paymentMethod === "Card" ? cardExpiry : undefined,
      },
      totals: { subtotal, shipping, tax, total },
      items: cartItems,
    })

    router.push("/checkout/review")
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-8">
          {/* Order Summary */}
          <Card>
            <CardContent className="pt-6">
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
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0700 000 000"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special instructions for delivery"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="mb-4">
                <Label htmlFor="payment-method">Choose Payment Method</Label>
                <Select
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setPaymentMethod(value as "Card" | "Mobile" | "Cash")
                  }
                >
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Card">Visa / Mastercard</SelectItem>
                    <SelectItem value="Mobile">Mobile Money</SelectItem>
                    <SelectItem value="Cash">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Money */}
              {paymentMethod === "Mobile" && (
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="mobile-provider">Select Provider</Label>
                    <Select
                      value={mobileProvider}
                      onValueChange={(value) =>
                        setMobileProvider(value as "MTN" | "Airtel")
                      }
                    >
                      <SelectTrigger id="mobile-provider">
                        <SelectValue placeholder="Select Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MTN">MTN Mobile Money</SelectItem>
                        <SelectItem value="Airtel">Airtel Mobile Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="mobile-number">Phone Number</Label>
                    <Input
                      id="mobile-number"
                      type="tel"
                      placeholder="0770000000"
                      value={mobileNumber}
                      onChange={(e) => handleMobileNumberChange(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Card Payment */}
              {paymentMethod === "Card" && (
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input
                        id="card-expiry"
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="card-cvv">CVV</Label>
                      <Input
                        id="card-cvv"
                        type="text"
                        placeholder="123"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Totals */}
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

            <Button className="w-full mt-2" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
