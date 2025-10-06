"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart } from "lucide-react"

export default function Header() {
  const { cartItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-black shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="/images/volts2.png" alt="Voltspire Logo" className="w-16 h-10 object-contain" />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-yellow-500 transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-yellow-500 transition-colors">Our Company</Link>
            <Link href="/contact" className="hover:text-yellow-500 transition-colors">Contact Us</Link>
          </nav>
        </div>

        {/* Cart Icon */}
        <div>
          <Link href="/cart" className="relative flex items-center">
            <ShoppingCart size={24} className="text-black" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
