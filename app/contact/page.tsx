"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

              {formSubmitted ? (
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg mb-2">Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="order">Order Status</SelectItem>
                        <SelectItem value="return">Returns & Refunds</SelectItem>
                        <SelectItem value="product">Product Information</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" required />
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <address className="not-italic text-muted-foreground">
                      Bandali Rise
                      <br />
                      Bugolobi, Kampala, Uganda
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+256-712-345-678" className="hover:text-primary">
                        +256-712-345-678
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="tel:+256-701-234-567" className="hover:text-primary">
                        +256-701-234-567
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@voltspire.com" className="hover:text-primary">
                        info@voltspire.com
                      </a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="mailto:support@voltspire.com" className="hover:text-primary">
                        support@voltspire.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                    <p className="text-muted-foreground">Saturday: 10am - 4pm</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Socials */}
          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href="#"
                    className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Find Us</h2>
        <div className="h-[400px] rounded-lg overflow-hidden border shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.807206364251!2d32.6126695747294!3d0.3205204996915333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb4159a64d3f%3A0x3e8c4c91b77b67a4!2sBandali%20Rise%2C%20Bugolobi%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sug!4v1697033430000!5m2!1sen!2sug"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
