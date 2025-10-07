"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { CartItem } from "./cart-context"

interface ShippingInfo {
  firstName: string
  lastName: string
  phone: string
  address: string
  notes?: string
}

interface PaymentInfo {
  method: "Card" | "Mobile" | "Cash"
  provider?: string      // for Mobile Money
  number?: string        // for Mobile Money
  cardNumber?: string    // for Card
  cardCVV?: string       // for Card
  cardExpiry?: string    // for Card
}

interface Totals {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

interface CheckoutData {
  shippingInfo: ShippingInfo
  paymentInfo: PaymentInfo
  totals: Totals
  items: CartItem[]
}

interface CheckoutContextType {
  checkoutData: CheckoutData | null
  setCheckoutData: (data: CheckoutData) => void
  resetCheckout: () => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)

  const resetCheckout = () => setCheckoutData(null)

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData, resetCheckout }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) throw new Error("useCheckout must be used within CheckoutProvider")
  return context
}
