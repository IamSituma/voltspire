"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

interface Product {
  id: number
  name: string
  image: string
  price: number
  offerPrice: number
  category: string
}

export default function ShopPage() {
  const { addToCart } = useCart()
  const categories = [
    "Power Stations",
    "Power Banks",
    "UPS Systems",
    "On The Go",
    "Batteries",
    "Accessories",
    "Lighting",
    "Cables & Adapters",
  ]

  const products: Product[] = [
    { id: 1, name: "12V LiFePO4 Battery", image: "images/battery.jpg", price: 35000, offerPrice: 40000, category: "Batteries" },
    { id: 2, name: "Comfortable Dog Bed", image: "images/dog-bed.jpg", price: 89999, offerPrice: 69999, category: "Accessories" },
    { id: 3, name: "Interactive Dog Toy", image: "images/power01.jpg", price: 24999, offerPrice: 19999, category: "Power Stations" },
    { id: 4, name: "Interactive Dog Toy", image: "images/power02.jpg", price: 24999, offerPrice: 19999, category: "Power Stations" },
    { id: 5, name: "Lighting Bulb - Screw", image: "images/bulb1.jpg", price: 34999, offerPrice: 29999, category: "Lighting" },
    { id: 6, name: "Slimline Notebook Combination Lock", image: "images/lock.jpg", price: 19999, offerPrice: 15999, category: "Cables & Adapters" },
  ]

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 flex flex-col md:flex-row gap-6">
      {/* Left Sidebar */}
      <aside className="w-full md:w-1/4 p-4">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <ul className="flex flex-col gap-2">
          {categories.map((category) => (
            <li key={category}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="w-4 h-4 accent-primary"
                />
                <span>{category}</span>
              </label>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>
      </aside>

      {/* Products Grid */}
      <main className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col">
              <div className="aspect-square overflow-hidden rounded-lg bg-background mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-medium mb-2 text-center">{product.name}</h3>
              <div className="flex justify-center gap-2 mb-4">
                <span className="line-through text-muted-foreground">
                  UGX {product.price.toLocaleString()}
                </span>
                <span className="font-medium text-primary">
                  UGX {product.offerPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-center gap-2 mt-auto">
                <Button
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className="bg-black text-white w-full"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className="bg-yellow-400 text-black w-full"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  )
}
