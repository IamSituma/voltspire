"use client"

import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import {
  Truck,
  Clock,
  DollarSign,
  MapPin,
  AlertCircle,
  Package
} from "lucide-react"

const deliveryInfo = [
  {
    title: "Processing Time",
    description: "All orders are processed within 1-2 business days.",
    details:
      "Once your order is confirmed, we start preparing it immediately. You will receive a confirmation email once your order has been shipped.",
    icon: Clock
  },
  {
    title: "Shipping Methods & Delivery Times",
    description: "Standard and express shipping options are available.",
    details:
      "Standard delivery usually takes 3-7 business days. Express delivery takes 1-3 business days. Delivery times may vary during peak seasons.",
    icon: Truck
  },
  {
    title: "Shipping Costs",
    description: "Shipping fees are calculated at checkout.",
    details:
      "Costs depend on your delivery address and selected shipping method. Free shipping may be offered for orders above a certain amount.",
    icon: DollarSign
  },
  {
    title: "Order Tracking",
    description: "Track your order in real-time.",
    details:
      "After shipping, you will receive a tracking number via email. Use it on our carrier's website to track the package status.",
    icon: Package
  },
  {
    title: "Address Changes",
    description: "Contact support if you need to change your address.",
    details:
      "If your order has not yet shipped, our support team can update your address. Once the order is shipped, changes may not be possible.",
    icon: MapPin
  },
  {
    title: "Delivery Issues",
    description: "Assistance for lost, delayed, or damaged packages.",
    details:
      "Contact our customer support team with your order number. We will investigate the issue and provide a solution promptly.",
    icon: AlertCircle
  },
]

export default function DeliveryInformationPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Delivery Information</h1>

      <p className="text-center mb-8">
        We aim to deliver your orders quickly and safely. Please read our delivery policies below.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {deliveryInfo.map((info, index) => {
          const Icon = info.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg font-semibold">{info.title}</CardTitle>
                </div>
                <CardDescription>{info.description}</CardDescription>

                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-sm font-medium">
                      More Details
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {info.details}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Separator className="my-8" />

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Need Assistance?</h2>
        <p>
          If you have any questions or concerns about delivery, please visit our Help Center or contact our support team for immediate assistance.
        </p>
      </div>
    </div>
  )
}
