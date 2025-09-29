"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Search, ChevronDown, Globe, User, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="images/volts2.png"
              alt="PetDo Logo"
              width={60}
              height={60}
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
              Shop
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                Categories <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/category/food" className="w-full">
                    Power Stations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/accessories" className="w-full">
                    Power Banks
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/toys" className="w-full">
                    UPS Systems
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/grooming" className="w-full">
                    On The Go
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8 md:w-[250px] rounded-full bg-muted"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Sign In</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                3
              </Badge>
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full pl-8 rounded-full bg-muted" />
          </div>
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
              Shop
            </Link>
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium transition-colors hover:text-primary">
                Categories <ChevronDown className="h-4 w-4" />
              </summary>
              <nav className="mt-2 ml-4 flex flex-col space-y-2">
                <Link href="/category/food" className="text-sm transition-colors hover:text-primary">
                  Food
                </Link>
                <Link href="/category/accessories" className="text-sm transition-colors hover:text-primary">
                  Accessories
                </Link>
                <Link href="/category/toys" className="text-sm transition-colors hover:text-primary">
                  Toys
                </Link>
                <Link href="/category/grooming" className="text-sm transition-colors hover:text-primary">
                  Grooming
                </Link>
              </nav>
            </details>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
