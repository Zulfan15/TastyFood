"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  IconShield, 
  IconClock, 
  IconThermometer,
  IconEye,
  IconAlertTriangle,
  IconCheck,
  IconX,
  IconBox,
  IconFlame
} from "@tabler/icons-react"

const safetyGuidelines = [
  {
    category: "Food Inspection",
    icon: IconEye,
    color: "blue",
    items: [
      "Check for any signs of spoilage before donating",
      "Ensure food looks fresh and appetizing",
      "Verify expiration dates are still valid",
      "Look for unusual odors or discoloration",
      "Ensure packaging is intact and clean"
    ]
  },
  {
    category: "Temperature Control",
    icon: IconThermometer,
    color: "red",
    items: [
      "Keep cold foods below 4°C (40°F)",
      "Keep hot foods above 60°C (140°F)",
      "Avoid the danger zone: 4°C - 60°C",
      "Use insulated containers for transport",
      "Minimize time at room temperature"
    ]
  },
  {
    category: "Timing Guidelines",
    icon: IconClock,
    color: "orange",
    items: [
      "Donate perishable foods within 2 hours of cooking",
      "Cold foods should be picked up within 2 hours",
      "Set realistic pickup timeframes",
      "Consider traffic and distance for recipients",
      "Update timing if delays occur"
    ]
  },
  {
    category: "Storage Best Practices",
    icon: IconBox,
    color: "green",
    items: [
      "Store foods in clean, sealed containers",
      "Label containers with contents and date",
      "Keep raw and cooked foods separate",
      "Use first-in, first-out principle",
      "Maintain clean storage environment"
    ]
  }
]

const foodTypes = [
  {
    name: "Cooked Rice & Grains",
    shelfLife: "2-3 hours at room temp",
    storage: "Refrigerate if not consumed immediately",
    safety: "high",
    tips: "Cool quickly after cooking, avoid reheating multiple times"
  },
  {
    name: "Fresh Vegetables",
    shelfLife: "3-5 days refrigerated",
    storage: "Keep in ventilated containers",
    safety: "medium",
    tips: "Wash thoroughly before consumption"
  },
  {
    name: "Bread & Baked Goods",
    shelfLife: "2-3 days at room temp",
    storage: "Store in dry, cool place",
    safety: "low",
    tips: "Check for mold before sharing"
  },
  {
    name: "Dairy Products",
    shelfLife: "Follow expiration date",
    storage: "Keep refrigerated at all times",
    safety: "high",
    tips: "Never donate if past expiration date"
  },
  {
    name: "Fruits",
    shelfLife: "Varies by type",
    storage: "Room temp or refrigerated",
    safety: "low",
    tips: "Remove any spoiled pieces from batch"
  },
  {
    name: "Prepared Meals",
    shelfLife: "2 hours at room temp",
    storage: "Refrigerate immediately",
    safety: "high",
    tips: "Include reheating instructions"
  }
]

const getSafetyColor = (level: string) => {
  switch (level) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getSafetyIcon = (level: string) => {
  switch (level) {
    case "high":
      return <IconAlertTriangle className="size-4" />
    case "medium":
      return <IconClock className="size-4" />
    case "low":
      return <IconCheck className="size-4" />
    default:
      return <IconShield className="size-4" />
  }
}

export default function SafetyGuidePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Food Safety Guide</h1>
          <p className="text-content-secondary">Essential guidelines for safe food sharing and donation</p>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <IconAlertTriangle className="size-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Important:</strong> Food safety is everyone&apos;s responsibility. When in doubt, don&apos;t donate. 
            It&apos;s better to be safe than sorry when it comes to food safety.
          </AlertDescription>
        </Alert>

        {/* Safety Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {safetyGuidelines.map((guideline) => (
            <Card key={guideline.category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <guideline.icon className={`size-5 text-${guideline.color}-600`} />
                  {guideline.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guideline.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <IconCheck className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-content-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Food Type Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconShield className="size-5 text-green-600" />
              Food Type Safety Guidelines
            </CardTitle>
            <CardDescription>
              Specific guidelines for different types of food donations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {foodTypes.map((food, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{food.name}</h4>
                    <Badge className={getSafetyColor(food.safety)}>
                      {getSafetyIcon(food.safety)}
                      <span className="ml-1 capitalize">{food.safety} Risk</span>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-content-muted mb-1">Shelf Life</p>
                      <p className="text-foreground">{food.shelfLife}</p>
                    </div>
                    <div>
                      <p className="font-medium text-content-muted mb-1">Storage</p>
                      <p className="text-foreground">{food.storage}</p>
                    </div>
                    <div>
                      <p className="font-medium text-content-muted mb-1">Safety Tips</p>
                      <p className="text-foreground">{food.tips}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Do&apos;s and Don&apos;ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <IconCheck className="size-5" />
                Do&apos;s
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Use clean containers and utensils",
                  "Label food with ingredients and date",
                  "Provide heating/serving instructions",
                  "Be honest about food condition",
                  "Respond quickly to pickup requests",
                  "Keep pickup areas clean and accessible"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <IconCheck className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-800">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <IconX className="size-5" />
                Don&apos;ts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Don&apos;t donate expired or spoiled food",
                  "Don&apos;t leave food unattended for long periods",
                  "Don&apos;t mix different types of food",
                  "Don&apos;t donate food you wouldn&apos;t eat yourself",
                  "Don&apos;t ignore temperature requirements",
                  "Don&apos;t donate food with unknown ingredients"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <IconX className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-800">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="mt-8 border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <IconAlertTriangle className="size-6 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-800">Food Safety Concerns?</h3>
                <p className="text-amber-700 text-sm">
                  If you have concerns about food safety or want to report an issue, 
                  contact our support team immediately at{" "}
                  <a href="mailto:safety@foodshare.com" className="underline font-medium">
                    safety@foodshare.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
