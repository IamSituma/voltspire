"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const privacySections = [
  {
    title: "Introduction",
    content:
      "We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and protect your data when you use our platform.",
  },
  {
    title: "Information We Collect",
    content:
      "We collect personal details such as your name, phone number, email, and payment information when you place an order or register an account. We may also collect device and usage data for analytics purposes.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information helps us process orders, improve customer support, and send updates about your account or delivery. We never sell your data to third parties.",
  },
  {
    title: "Cookies and Tracking",
    content:
      "We use cookies and similar tracking technologies to personalize your experience and understand how our services are used. You can manage your cookie preferences in your browser settings.",
  },
  {
    title: "Data Security",
    content:
      "We implement strong security measures to safeguard your data from unauthorized access or disclosure. However, no online system is completely secure, so please protect your login details.",
  },
  {
    title: "Your Rights",
    content:
      "You can request access, correction, or deletion of your personal data at any time. Contact our support team to make these requests.",
  },
  {
    title: "Policy Updates",
    content:
      "We may update this Privacy Policy occasionally to reflect changes in our practices. All updates will be posted on this page with the revised date.",
  },
]

export default function PrivacyPolicyPage() {
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

  const filteredSections = privacySections.filter(
    (section) =>
      section.title.toLowerCase().includes(query.toLowerCase()) ||
      section.content.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">
          Learn how we handle and protect your personal information
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-10">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search privacy topics..."
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
              className="rounded-2 border shadow-md bg-card hover:shadow-lg transition-all duration-300"
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
            No privacy topics found matching your search.
          </p>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-12">
        Last updated: October 2025
      </p>
    </div>
  )
}
