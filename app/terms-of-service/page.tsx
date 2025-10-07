"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const termsSections = [
  {
    title: "Introduction",
    content:
      "Welcome to our platform. By using our website or making a purchase, you agree to comply with these Terms of Service. Please read them carefully before proceeding.",
  },
  {
    title: "Use of Our Services",
    content:
      "You agree to use our services only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account credentials.",
  },
  {
    title: "Orders and Payments",
    content:
      "When placing an order, you agree to provide accurate billing and delivery details. All payments must be completed before an order is processed. We reserve the right to cancel any order for valid reasons, including suspected fraud or stock unavailability.",
  },
  {
    title: "Shipping and Delivery",
    content:
      "Delivery timelines vary depending on your location. While we strive to meet all estimated delivery dates, we are not liable for delays caused by third-party couriers or unforeseen circumstances.",
  },
  {
    title: "Returns and Refunds",
    content:
      "If you are not satisfied with your purchase, you may request a return or refund in accordance with our Returns Policy. Items must be in original condition and returned within the specified period.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content, including images, text, and logos, is the property of our company and may not be reproduced, distributed, or used without our prior written consent.",
  },
  {
    title: "Limitation of Liability",
    content:
      "We are not responsible for any indirect, incidental, or consequential damages arising from the use of our services or products. Our total liability is limited to the amount paid for the product in question.",
  },
  {
    title: "Changes to Terms",
    content:
      "We may update these Terms of Service periodically to reflect changes in our business or legal requirements. Continued use of our services after updates constitutes acceptance of the revised terms.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about these Terms, please reach out to our support team through the contact page on our website.",
  },
]

export default function TermsOfServicePage() {
  const [query, setQuery] = useState("")

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 text-black rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  const filteredSections = termsSections.filter(
    (section) =>
      section.title.toLowerCase().includes(query.toLowerCase()) ||
      section.content.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm">
          Please read these terms carefully before using our website or making a purchase.
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-10">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search terms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-background/50 backdrop-blur-sm border rounded-full"
        />
      </div>

      <div className="space-y-6">
        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <Card
              key={index}
              className="rounded-2xl border shadow-md bg-card hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary">
                  {highlightText(section.title, query)}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                {highlightText(section.content, query)}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No terms found matching your search.
          </p>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-12">
        Last updated: October 2025
      </p>
    </div>
  )
}
