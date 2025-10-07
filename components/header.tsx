"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart } from "lucide-react"

export default function Header() {
  const { cartItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-black shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="/images/volts2.png"
              alt="Voltspire Logo"
              className="w-16 h-10 object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/" className="hover:text-yellow-500 transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-yellow-500 transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-yellow-500 transition-colors">
            Our Company
          </Link>
          <Link href="/contact" className="hover:text-yellow-500 transition-colors">
            Contact Us
          </Link>
        </nav>

        {/* Right Side: Cart + Mobile Hamburger */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link href="/cart" className="relative flex items-center">
            <ShoppingCart size={24} className="text-black" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col px-4 py-2 gap-2">
          <Link
            href="/"
            className="hover:text-yellow-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="hover:text-yellow-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="hover:text-yellow-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Our Company
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-500 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  )
}
