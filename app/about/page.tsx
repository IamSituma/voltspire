import Image from "next/image"
import Link from "next/link"
import { Heart, Award, Users, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About Voltspire</h1>
      </div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2023, Voltspire set out with a clear mission: to provide high-quality electrical and sustainable energy products that empower communities and improve everyday life. We believe that access to reliable electricity and durable electrical solutions should be universal, and we are committed to making that a reality.
          </p>
          <p className="text-muted-foreground mb-4">
            At Voltspire, we carefully select our products to ensure they meet the highest standards of safety, efficiency, and longevity. From innovative energy-saving devices to essential electrical equipment, every item in our catalog is designed to serve both homes and businesses effectively.
          </p>
          <p className="text-muted-foreground">
            Beyond products, our focus is on sustainability and accessibility. By promoting energy-efficient solutions and reliable electrical systems, we aim to reduce environmental impact while ensuring that more people can benefit from modern electricity solutions.
          </p>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="images/gizzu.jpg"
            alt="gizzu home products"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At Voltspire, our core values guide everything we do, from product selection to customer service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Reliability</h3>
            <p className="text-muted-foreground">
              We provide products that people can trust to work efficiently and last longer.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              We prioritize energy-efficient solutions and eco-friendly practices in everything we do.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
            <p className="text-muted-foreground">
              We strive to make quality electrical products available to everyone, everywhere.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We continually seek new ways to improve energy solutions and enhance customer experience.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">The Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate people behind Voltspire who work tirelessly to bring the best products to you and your pets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
            },
            {
              name: "Michael Chen",
              role: "Head of Product",
              image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
            },
            {
              name: "Emily Rodriguez",
              role: "Customer Experience",
              image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
            },
            {
              name: "David Kim",
              role: "Logistics Manager",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
            },
          ].map((member, index) => (
            <div key={index} className="bg-card rounded-lg border overflow-hidden">
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Discover & Shop Gizzu Products with Voltspire
        </h2>
        <p className="max-w-2xl mx-auto mb-6">
          Discover premium products for your friends & family and join thousands of satisfied families & individuals that trust Voltspire
        </p>
        <Button
          size="lg"
          className="bg-yellow-400 hover:bg-yellow-700 text-black"
          asChild
        >
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>

    </div>
  )
}
