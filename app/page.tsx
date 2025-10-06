"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  offerPrice: number;
  category: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  avatar: string;
}

export default function HomePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Example testimonials
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Jane Doe",
      feedback:
        "Amazing products! The battery I bought lasts longer than I expected. Highly recommend!",
      avatar: "/images/customer1.jpg",
    },
    {
      id: 2,
      name: "John Smith",
      feedback:
        "Great service and fast delivery. The power station works perfectly for my home setup.",
      avatar: "/images/customer2.jpg",
    },
    {
      id: 3,
      name: "Alice Johnson",
      feedback:
        "I love the lighting bulbs! Energy-efficient and bright. Will order again.",
      avatar: "/images/customer3.jpg",
    },
  ];

  // Fetch products from API
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
    <main className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[850px]">
        <Image
          src="/images/banner.png"
          alt="Hero Banner"
          fill
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Power Your Life with Our Products
          </h1>
          <p className="text-white text-sm md:text-xl mb-6">
            High-quality batteries, power stations, and accessories for every need
          </p>
          <a href="/shop">
            <Button className="bg-yellow-400 text-black px-6 py-3 text-sm font-semibold hover:bg-yellow-500">
              Shop Now
            </Button>
          </a>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col bg-gray-50 hover:shadow-md transition"
            >
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
      </section>

      {/* Customer Testimonials */}
      <section className="bg-gray-100 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <Image
                src={t.avatar}
                alt={t.name}
                width={80}
                height={80}
                className="rounded-full mb-4 object-cover"
              />
              <p className="mb-4 text-gray-700">&quot;{t.feedback}&quot;</p>
              <h4 className="font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
