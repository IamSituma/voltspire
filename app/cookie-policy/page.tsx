"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const cookieSections = [
  {
    title: "Introduction",
    content:
      "This Cookie Policy explains how we use cookies and similar technologies on our website to enhance your browsing experience, analyze site traffic, and improve our services.",
  },
  {
    title: "What Are Cookies?",
    content:
      "Cookies are small text files stored on your device by your browser when you visit a website. They help websites remember your preferences and actions over time.",
  },
  {
    title: "Types of Cookies We Use",
    content:
      "We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted). These may include essential, performance, analytics, and marketing cookies.",
  },
  {
    title: "Essential Cookies",
    content:
      "These cookies are necessary for our website to function properly. Without them, core features like secure login and checkout would not work.",
  },
  {
    title: "Analytics Cookies",
    content:
      "Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This data helps us improve content and usability.",
  },
  {
    title: "Marketing Cookies",
    content:
      "Marketing cookies are used to deliver relevant advertisements and measure the effectiveness of marketing campaigns. They may track your browsing habits across different websites.",
  },
  {
    title: "Managing Cookies",
    content:
      "You can manage or delete cookies through your browser settings. However, disabling certain cookies may affect your ability to use some parts of our website effectively.",
  },
  {
    title: "Third-Party Cookies",
    content:
      "Some cookies may be placed by third-party services such as analytics tools or embedded content providers. We do not control these cookies and recommend reviewing their policies.",
  },
  {
    title: "Updates to This Policy",
    content:
      "We may update this Cookie Policy from time to time to reflect changes in technology, regulations, or our practices. The updated version will be posted on this page with a revised date.",
  },
  {
    title: "Contact Us",
    content:
      "If you have any questions about our use of cookies or this policy, please reach out through our contact page or customer support email.",
  },
]

export default function CookiePolicyPage() {
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

  const filteredSections = cookieSections.filter(
    (section) =>
      section.title.toLowerCase().includes(query.toLowerCase()) ||
      section.content.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground text-sm">
          Learn how and why we use cookies to improve your browsing experience.
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-10">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search cookies..."
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
            No results found for “{query}”.
          </p>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-12">
        Last updated: October 2025
      </p>
    </div>
  )
}
