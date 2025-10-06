"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import prisma from "@/lib/prisma";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  offerPrice: number;
  category: string;
  description: string;
}

export default function HomePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Prisma
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-12">Loading products...</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col bg-gray-50 hover:shadow-md transition">
            <div className="aspect-square overflow-hidden rounded-lg bg-white mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="font-medium mb-2">{product.name}</h3>
            <p className="text-sm text-gray-700 mb-2">{product.description}</p>
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
        ))}
      </div>
    </main>
  );
}
