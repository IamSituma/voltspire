"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart, Search, ChevronDown, Globe, User, Menu, X, Star, TruckIcon, ShieldCheck, Clock, CreditCard } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const featuredProducts = [
    {
      id: 1,
      name: "12V LiFePO4 Battery",
      image:
        "images/battery.jpg",
      price: 49.99,
      offerPrice: 39.99,
      category: "Batteries",
    },
    {
      id: 2,
      name: "Power Stattion",
      image:
        "images/power01.jpg",
      price: 89.99,
      offerPrice: 69.99,
      category: "Power Stations",
    },
    {
      id: 3,
      name: "Slimline Notebook Combination Lock",
      image:
        "images/lock.jpg",
      price: 24.99,
      offerPrice: 19.99,
      category: "Cables & Adapters",
    },
    {
      id: 4,
      name: "Bulb",
      image:
        "images/bulb.jpg",
      price: 34.99,
      offerPrice: 29.99,
      category: "Lighting",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      text: "My dog absolutely loves the premium food I purchased from PetDo. The quality is exceptional and delivery was super fast!",
    },
    {
      id: 2,
      name: "Michael Brown",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
      text: "The dog bed I bought is amazing quality. My furry friend hasn't left it since it arrived. Great customer service too!",
    },
    {
      id: 3,
      name: "Emily Davis",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 4,
      text: "The interactive toys keep my puppy entertained for hours. Definitely coming back for more products!",
    },
  ]

  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <section className="relative h-[500px] md:h-[800px] lg:h-[900px] flex items-center">
        <Image
          src="images/banner.png"
          alt="Gizzu Home Products"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="container relative z-20 h-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 text-center w-full" style={{textShadow: "0 2px 8px rgba(0,0,0,0.25)"}}>
                Everything Energy & Electronics
              </h1>
              <p className="max-w-[600px] text-white md:text-xl mb-8 text-center w-full" style={{textShadow: "0 1px 4px rgba(0,0,0,0.18)"}}>
                Stay connected with reliable backup power, smart accessories, and energy solutions designed for everyday life. Voltspire brings you the best of Gizzu, so you'll never run out of charge when it matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="font-medium bg-yellow-400 text-black hover:bg-yellow-500 border-none shadow-lg w-48" asChild>
                  <Link href="/shop">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="font-medium bg-white text-black border-none hover:bg-gray-100 shadow-lg">
                  Explore Products
                </Button>
              </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="bg-muted py-12 md:py-16">
  <div className="container px-4 md:px-6 min-h-[500px] md:min-h-[600px] lg:min-h-[800px]">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Shop by Category</h2>
          <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 mt-20">
            {/* Large left item */}
            <Link href="/category/power-stations" className="group relative col-span-1 row-span-2 rounded-lg overflow-hidden shadow-md">
              <div className="w-full h-full min-h-[300px] md:min-h-[400px]">
                <Image src="images/power.jpg" alt="Power Stations" fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">Power Stations</h3>
                </div>
              </div>
            </Link>
            {/* Tall top-right item */}
            <Link href="/category/solar-panels" className="group relative col-span-1 md:col-span-2 row-span-1 rounded-lg overflow-hidden shadow-md">
              <div className="w-full h-full min-h-[250px] md:min-h-[300px]">
                <Image src="images/solar panels.jpg" alt="Solar Panels" fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">Solar Panels</h3>
                </div>
              </div>
            </Link>
            {/* Small bottom-right items */}
            <Link href="/category/lighting" className="group relative col-span-1 md:col-span-1 row-span-1 rounded-lg overflow-hidden shadow-md">
              <div className="w-full h-full min-h-[150px] md:min-h-[200px]">
                <Image src="images/bulb.jpg" alt="Lighting" fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">Lighting</h3>
                </div>
              </div>
            </Link>
            <Link href="/category/wall-chargers-plugs" className="group relative col-span-1 md:col-span-1 row-span-1 rounded-lg overflow-hidden shadow-md">
              <div className="w-full h-full min-h-[150px] md:min-h-[200px]">
                <Image src="images/cables.jpg" alt="Wall Chargers & Plugs" fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">Wall Chargers & Plugs</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-square overflow-hidden rounded-lg bg-background">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <Button className="mx-auto">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-center">
                  <Badge variant="outline" className="mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex justify-center gap-2">
                    <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    <span className="font-medium text-primary">${product.offerPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" className="font-medium bg-yellow-400 text-black hover:bg-yellow-500 border-none shadow-lg" asChild>
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Our Store */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Why Choose Voltspire</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-background">
              <CardContent className="flex flex-col items-center text-center p-6">
                <TruckIcon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">
                  On orders over $50. Get your pet supplies delivered to your doorstep.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="flex flex-col items-center text-center p-6">
                <ShieldCheck className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  All our products are carefully selected for quality and safety.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Clock className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Our customer service team is available around the clock to help you.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="flex flex-col items-center text-center p-6">
                <CreditCard className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
                <p className="text-muted-foreground">
                  Multiple secure payment options for your convenience and safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-background">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Join Our Newsletter</h2>
            <p className="max-w-[600px] text-primary-foreground/90 md:text-lg">
              Subscribe to get special offers, free giveaways, and pet care tips.
            </p>
            <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <Input type="email" placeholder="Enter your email" className="bg-primary-foreground text-foreground" />
              <Button variant="secondary">Subscribe</Button>
            </div>
            <p className="text-xs text-primary-foreground/70">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
