"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const faqs = [
  {
    question: "How can I place an order?",
    answer: "You can place an order by adding items to your cart and completing the checkout process."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, Mobile Money (MTN & Airtel), and Cash on Delivery."
  },
  {
    question: "Can I track my order?",
    answer: "Yes! You can track your order from your account or using the tracking link sent to your email."
  },
  {
    question: "How do I contact support?",
    answer: "You can fill out the contact form below, and our support team will get back to you."
  }
]

export default function HelpCenterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      alert("Please fill in all fields")
      return
    }

    // Here you can integrate API to send the message to your support system
    console.log({ name, email, message })
    setSubmitted(true)
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Help Center</h1>

      {/* FAQ Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {faqs.map((faq, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent>
              <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
              <CardDescription>{faq.answer}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
            {submitted && (
              <p className="text-green-600 mb-4">Your message has been sent. We'll get back to you shortly!</p>
            )}
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="mt-2">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
