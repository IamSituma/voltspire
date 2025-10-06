"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

interface Product {
  id: number;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export default function HomePage() {
  const { addToCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const featuredProducts: Product[] = [
    { id: 1, name: "12V LiFePO4 Battery", image: "/images/battery.jpg", price: 490000, quantity: 1 },
    { id: 2, name: "Power Station", image: "/images/power01.jpg", price: 890000, quantity: 1 },
    { id: 3, name: "Slimline Notebook Combination Lock", image: "/images/lock.jpg", price: 249000, quantity: 1 },
    { id: 4, name: "Bulb", image: "/images/bulb.jpg", price: 349000, quantity: 1 },
  ];

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Voltspire - Power Your World</h1>
        <p className="text-lg mb-6">
          Reliable power solutions, energy backups, and smart accessories for your home and business.
        </p>
        <Button className="bg-black text-white">Shop Now</Button>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative border rounded-lg p-4 flex flex-col">
                <div className="aspect-square overflow-hidden rounded-lg bg-white relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-1 text-center">
                  <h3 className="font-medium">{product.name}</h3>
                  <span className="font-medium text-primary">UGX {product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-center gap-2 mt-auto">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-black text-white w-full"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-yellow-400 text-black w-full"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-8">What Our Customers Say</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div className="border p-4 rounded-md">“Great products and service!”</div>
          <div className="border p-4 rounded-md">“Reliable and affordable solutions.”</div>
          <div className="border p-4 rounded-md">“Voltspire keeps us powered!”</div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-8">Our Partners</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <Image src="/images/partner1.png" alt="Partner 1" width={120} height={60} />
          <Image src="/images/partner2.png" alt="Partner 2" width={120} height={60} />
          <Image src="/images/partner3.png" alt="Partner 3" width={120} height={60} />
        </div>
      </section>
    </main>
  );
}
