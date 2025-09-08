"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  IconMapPin, 
  IconPhone,
  IconQrcode,
  IconShield,
  IconCar,
  IconWalk,
  IconMessageCircle,
  IconCamera,
  IconCheck,
  IconAlertTriangle
} from "@tabler/icons-react"

const pickupSteps = [
  {
    step: 1,
    title: "Confirm Your Pickup",
    description: "Accept the donation request and confirm your pickup time",
    icon: IconCheck,
    details: [
      "Review the food details and location",
      "Confirm you can pick up within the specified time",
      "Send a message to the donor if you have questions"
    ]
  },
  {
    step: 2,
    title: "Prepare for Pickup",
    description: "Get ready with necessary items and transportation",
    icon: IconShield,
    details: [
      "Bring clean containers or bags",
      "Plan your route and transportation",
      "Ensure your phone is charged for QR scanning",
      "Check the weather and dress appropriately"
    ]
  },
  {
    step: 3,
    title: "Navigate to Location",
    description: "Use the app's navigation or GPS to reach the pickup point",
    icon: IconMapPin,
    details: [
      "Use the in-app navigation feature",
      "Call the donor if you can't find the location",
      "Look for any special landmarks mentioned",
      "Arrive within the agreed time window"
    ]
  },
  {
    step: 4,
    title: "Contact the Donor",
    description: "Let the donor know you've arrived for pickup",
    icon: IconPhone,
    details: [
      "Send a message through the app",
      "Call if immediate response is needed",
      "Be polite and patient if they need a moment",
      "Follow any specific pickup instructions"
    ]
  },
  {
    step: 5,
    title: "Complete the Pickup",
    description: "Verify the food and complete the transaction",
    icon: IconQrcode,
    details: [
      "Inspect the food condition briefly",
      "Scan the QR code to confirm pickup",
      "Thank the donor for their contribution",
      "Handle the food with care during transport"
    ]
  },
  {
    step: 6,
    title: "Post-Pickup Actions",
    description: "Leave feedback and ensure food safety",
    icon: IconCamera,
    details: [
      "Rate your experience with the donor",
      "Consume or refrigerate the food promptly",
      "Report any issues if necessary",
      "Share your positive experience with others"
    ]
  }
]

const transportationTips = [
  {
    type: "Walking",
    icon: IconWalk,
    tips: [
      "Bring a sturdy bag or backpack",
      "Consider the weight and distance",
      "Use insulated bags for temperature-sensitive items",
      "Plan for weather conditions"
    ]
  },
  {
    type: "Driving",
    icon: IconCar,
    tips: [
      "Keep air conditioning on for cold foods",
      "Secure containers to prevent spilling",
      "Park safely and legally",
      "Use coolers for longer distances"
    ]
  }
]

const etiquetteGuidelines = [
  "Be respectful and grateful to donors",
  "Arrive on time or communicate delays",
  "Follow contactless pickup procedures when requested",
  "Be discrete about the donation to respect privacy",
  "Keep conversations brief unless the donor wants to chat",
  "Help maintain a positive community atmosphere"
]

const troubleshootingFAQ = [
  {
    question: "What if I can't find the pickup location?",
    answer: "Contact the donor through the app or call them directly. Look for landmarks they mentioned and double-check the address."
  },
  {
    question: "What if the food looks different than expected?",
    answer: "It's okay to politely ask questions. If you're uncomfortable with the food condition, you can respectfully decline."
  },
  {
    question: "What if the donor doesn't respond?",
    answer: "Wait 10-15 minutes and try calling. If still no response, contact support through the app."
  },
  {
    question: "What if I need to cancel last minute?",
    answer: "Contact the donor immediately and cancel through the app so they can offer the food to someone else."
  }
]

export default function PickupGuidePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Pickup Instructions</h1>
          <p className="text-content-secondary">A complete guide to successfully picking up food donations</p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <IconAlertTriangle className="size-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Remember:</strong> Be respectful, punctual, and grateful. Every pickup helps reduce food waste 
            and supports our community!
          </AlertDescription>
        </Alert>

        {/* Pickup Steps */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Step-by-Step Pickup Process</h2>
          
          {pickupSteps.map((step) => (
            <Card key={step.step} className="border-l-4 border-green-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center size-12 bg-green-100 rounded-full">
                      <step.icon className="size-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">Step {step.step}</Badge>
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-content-secondary mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <IconCheck className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-content-secondary">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transportation Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCar className="size-5 text-blue-600" />
              Transportation Tips
            </CardTitle>
            <CardDescription>
              Best practices for different modes of transportation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {transportationTips.map((transport) => (
                <div key={transport.type} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <transport.icon className="size-5 text-content-muted" />
                    <h4 className="font-semibold text-gray-900">{transport.type}</h4>
                  </div>
                  <ul className="space-y-2">
                    {transport.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <IconCheck className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-content-secondary">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Etiquette Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconMessageCircle className="size-5 text-purple-600" />
              Pickup Etiquette
            </CardTitle>
            <CardDescription>
              How to maintain positive relationships in our community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {etiquetteGuidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-2">
                  <IconCheck className="size-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-content-secondary">{guideline}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Troubleshooting FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconAlertTriangle className="size-5 text-orange-600" />
              Troubleshooting & FAQ
            </CardTitle>
            <CardDescription>
              Common issues and how to resolve them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {troubleshootingFAQ.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-content-secondary text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="mt-8 border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <IconPhone className="size-6 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-800">Need Help During Pickup?</h3>
                <p className="text-amber-700 text-sm">
                  Contact our support team if you encounter any issues during pickup.{" "}
                  <Button variant="link" className="p-0 h-auto text-amber-800 underline">
                    Contact Support
                  </Button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
