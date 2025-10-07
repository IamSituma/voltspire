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

interface FAQ {
  question: string;
  answer: string;
}

export default function HomePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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

  // Example partner logos
  const partners = [
    { id: 1, name: "Partner 1", logo: "/images/partner1.png" },
    { id: 2, name: "Partner 2", logo: "/images/partner2.png" },
    { id: 3, name: "Partner 3", logo: "/images/partner3.png" },
  ];

  // FAQ data
  const faqs: FAQ[] = [
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 14 days of delivery. Products must be in original packaging and unused.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Currently, we only ship within Uganda. International shipping will be available soon.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery typically takes 2-5 business days depending on your location.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order is shipped, you will receive a tracking number via email.",
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

  // Show back-to-top button
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
        <div className="absolute inset-0 bg-black/70"></div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col bg-gray-50 hover:shadow-md transition cursor-pointer"
              onClick={() => window.location.href = `/category/${product.category}`}
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-white mb-4 h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="font-medium mb-2">{product.name}</h3>
              <div className="flex justify-center gap-2 mb-2">
                <span className="line-through text-muted-foreground">
                  UGX {product.price.toLocaleString()}
                </span>
                <span className="font-medium text-primary">
                  UGX {product.offerPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ ...product, quantity: 1 });
                  }}
                  className="bg-black text-white w-full"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({ ...product, quantity: 1 });
                  }}
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

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-yellow-400 rounded-lg p-12 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Ready to Power Your Next Adventure?
            </h2>
            <p className="text-black/80 max-w-2xl mb-8 text-lg">
              Whether it’s for your home, business, or outdoor setup — our products are built to keep you powered and connected. Join thousands of happy customers today.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="/shop">
                <Button className="bg-black text-white px-8 py-3 text-lg hover:bg-gray-900">
                  Start Shopping
                </Button>
              </a>
              <a href="/contact">
                <Button className="bg-white text-black px-8 py-3 text-lg hover:bg-gray-100">
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Trusted Partners</h2>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-lg transition duration-300 w-32 sm:w-36 md:w-40"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 bg-white hover:shadow-md transition cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="font-semibold mb-2 flex justify-between items-center">
                {faq.question}
                <span>{openFAQ === index ? "-" : "+"}</span>
              </h3>
              {openFAQ === index && <p className="text-gray-700 mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition z-50"
        >
          ↑ Top
        </button>
      )}
    </main>
  );
}
