"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import ProductModal from "@/components/ProductModal"

interface Product {
  id: number
  name: string
  image: string
  images?: string[]
  price: number
  offerPrice: number
  category: string
  description?: string
}

export default function ShopPage() {
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
    {
      id: 1,
      name: "12V LiFePO4 Battery",
      image: "images/battery.jpg",
      images: ["images/battery.jpg", "images/battery2.jpg", "images/battery3.jpg"],
      price: 35000,
      offerPrice: 40000,
      category: "Batteries",
      description:
        "High-performance LiFePO4 battery ideal for solar and backup systems. Provides long lifespan and excellent discharge performance.",
    },
    {
      id: 2,
      name: "Comfortable Dog Bed",
      image:
        "https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: 89999,
      offerPrice: 69999,
      category: "Accessories",
      description:
        "A soft and cozy dog bed made from durable materials. Perfect for your pet’s comfort and relaxation.",
    },
    {
      id: 3,
      name: "Portable Power Station 500W",
      image: "images/power01.jpg",
      images: ["images/power01.jpg", "images/power02.jpg"],
      price: 24999,
      offerPrice: 19999,
      category: "Power Stations",
      description:
        "Reliable and compact portable power station ideal for outdoor use, camping, or emergency power backup.",
    },
    {
      id: 5,
      name: "Lighting Bulb - Screw",
      image: "images/bulb1.jpg",
      price: 34999,
      offerPrice: 29999,
      category: "Lighting",
      description:
        "Energy-efficient screw-type LED bulb providing bright, long-lasting illumination for your home or office.",
    },
    {
      id: 6,
      name: "Slimline Notebook Combination Lock",
      image: "images/lock.jpg",
      price: 19999,
      offerPrice: 15999,
      category: "Cables & Adapters",
      description:
        "Compact and secure combination lock designed to protect your notebook and devices from theft.",
    },
    {
      id: 8,
      name: "Lightning Charge & Sync Cable",
      image: "images/cable.jpg",
      price: 9999,
      offerPrice: 7999,
      category: "Cables & Adapters",
      description:
        "Fast charging and data sync cable with durable design. Compatible with most USB-powered devices.",
    },
  ]

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category)
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedProduct(product)}
            >
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
                  UGX{product.price.toLocaleString()}
                </span>
                <span className="font-medium text-primary">
                  UGX{product.offerPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-center gap-2 mt-auto">
                <Button className="bg-black text-white w-full">Add to Cart</Button>
                <Button className="bg-yellow-400 text-black w-full">Buy Now</Button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
