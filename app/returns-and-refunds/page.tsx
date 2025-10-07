"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const returnsPolicy = [
  {
    title: "Return Eligibility",
    description:
      "Items must be returned within 14 days of delivery. Products should be unused, in original packaging, and include all accessories."
  },
  {
    title: "Non-Returnable Items",
    description:
      "Custom-made items, perishable goods, and digital downloads cannot be returned."
  },
  {
    title: "Refund Process",
    description:
      "Once we receive your returned item, it will be inspected. Refunds are processed within 5–7 business days to the original payment method."
  },
  {
    title: "Exchanges",
    description:
      "If you wish to exchange an item, please contact our support team. Exchanges are subject to product availability."
  },
  {
    title: "Shipping Costs",
    description:
      "Return shipping costs are the responsibility of the customer unless the product is defective or damaged during delivery."
  },
]

export default function ReturnsAndRefundsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Returns & Refunds</h1>

      <p className="text-center mb-8">
        We strive to make sure you are happy with your purchase. Please read our returns and refund policy below.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {returnsPolicy.map((policy, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent>
              <CardTitle className="text-lg font-semibold">{policy.title}</CardTitle>
              <CardDescription>{policy.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
        <p>
          If you have questions or need assistance with a return or refund, please visit our Help Center or contact our support team.
        </p>
      </div>
    </div>
  )
}
