"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  image: string
  images?: string[]
  price: number
  offerPrice: number
  description?: string
}

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState<string>("")
  const modalRef = useRef<HTMLDivElement | null>(null)

  // Close on Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[70vh] flex flex-col md:flex-row overflow-hidden animate-in fade-in duration-300"
      >
        {/* Left: Images Section */}
        <div className="md:w-1/2 h-full p-4 flex flex-col items-center border-r overflow-y-auto">
          <div className="w-full h-[60%] relative mb-4">
            <Image
              src={selectedImage || product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {product.images && product.images.length > 0 && (
            <div className="flex gap-3 flex-wrap justify-center">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 relative cursor-pointer rounded-lg overflow-hidden border ${
                    selectedImage === img ? "border-primary" : "border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info Section */}
        <div className="md:w-1/2 h-full p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description ||
                "This is a high-quality product designed to deliver reliable performance and durability."}
            </p>

            <div className="flex gap-3 mb-8 items-center">
              <span className="text-gray-500 line-through text-lg">
                UGX {product.price.toLocaleString()}
              </span>
              <span className="text-primary text-2xl font-semibold">
                UGX {product.offerPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-auto">
            <Button className="bg-black text-white w-full h-12 text-lg">Add to Cart</Button>
            <Button className="bg-yellow-400 text-black w-full h-12 text-lg">Buy Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
