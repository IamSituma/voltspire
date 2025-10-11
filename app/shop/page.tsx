"use client"

import { useState, useEffect } from "react"
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
  description: string
}

export default function ShopPage() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

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

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error("Failed to fetch products")
        const data: Product[] = await res.json()
        setProducts(data)
      } catch (err: any) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) return <p className="text-center mt-8">Loading products...</p>
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>

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
              className="border rounded-lg p-4 flex flex-col hover:shadow-md transition"
            >
              <div
                className="aspect-square overflow-hidden rounded-lg bg-background mb-4 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <Image
                  src={product.image || "/images/placeholder.png"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover rounded-lg"
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

      {/* Product Description Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full relative flex flex-col md:flex-row gap-6">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-black font-bold text-2xl"
            >
              ×
            </button>
            {/* Left: Image */}
            <div className="md:w-1/2">
              <Image
                src={selectedProduct.image || "/images/placeholder.png"}
                alt={selectedProduct.name}
                width={500}
                height={500}
                className="object-cover rounded-lg"
              />
            </div>
            {/* Right: Details */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                <p className="mb-4">{selectedProduct.description}</p>
                <p className="text-xl font-semibold mb-4">
                  UGX {selectedProduct.offerPrice.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 mt-auto">
                <Button
                  onClick={() => {
                    addToCart({ ...selectedProduct, quantity: 1 })
                    setSelectedProduct(null)
                  }}
                  className="bg-black text-white w-full"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => {
                    addToCart({ ...selectedProduct, quantity: 1 })
                    setSelectedProduct(null)
                  }}
                  className="bg-yellow-400 text-black w-full"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
