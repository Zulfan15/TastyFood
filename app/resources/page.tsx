"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  IconBook, 
  IconLeaf, 
  IconShield,
  IconMapPin,
  IconUsers,
  IconChartBar,
  IconDownload,
  IconExternalLink,
  IconVideo,
  IconFileText,
  IconBulb,
  IconHeart
} from "@tabler/icons-react"

const resourceCategories = [
  {
    title: "Food Safety & Guidelines",
    description: "Essential information for safe food sharing",
    icon: IconShield,
    color: "red",
    resources: [
      {
        title: "Food Safety Guide",
        description: "Complete guidelines for safe food donation",
        type: "Guide",
        link: "/safety-guide",
        internal: true
      },
      {
        title: "Pickup Instructions",
        description: "Step-by-step pickup process",
        type: "Instructions",
        link: "/pickup-guide",
        internal: true
      },
      {
        title: "WHO Food Safety Guidelines",
        description: "International food safety standards",
        type: "External",
        link: "https://www.who.int/news-room/fact-sheets/detail/food-safety",
        internal: false
      }
    ]
  },
  {
    title: "Environmental Impact",
    description: "Learn about sustainability and environmental benefits",
    icon: IconLeaf,
    color: "green",
    resources: [
      {
        title: "Impact Tracker",
        description: "Monitor your environmental contribution",
        type: "Dashboard",
        link: "/impact",
        internal: true
      },
      {
        title: "Food Waste Facts",
        description: "Statistics and information about food waste",
        type: "Article",
        link: "/food-waste-facts",
        internal: true
      },
      {
        title: "UN Sustainable Development Goals",
        description: "How food sharing supports global goals",
        type: "External",
        link: "https://sdgs.un.org/goals/goal12",
        internal: false
      }
    ]
  },
  {
    title: "Community Building",
    description: "Tips for building stronger food sharing communities",
    icon: IconUsers,
    color: "blue",
    resources: [
      {
        title: "Community Guidelines",
        description: "Best practices for community interaction",
        type: "Guidelines",
        link: "/community-guidelines",
        internal: true
      },
      {
        title: "Success Stories",
        description: "Inspiring stories from our community",
        type: "Stories",
        link: "/success-stories",
        internal: true
      },
      {
        title: "Volunteer Opportunities",
        description: "Get more involved in the community",
        type: "Opportunities",
        link: "/volunteer",
        internal: true
      }
    ]
  },
  {
    title: "Educational Materials",
    description: "Videos, tutorials, and learning resources",
    icon: IconVideo,
    color: "purple",
    resources: [
      {
        title: "Getting Started Video",
        description: "Video tutorial for new users",
        type: "Video",
        link: "/tutorial-video",
        internal: true
      },
      {
        title: "Best Practices Webinar",
        description: "Monthly webinar series",
        type: "Webinar",
        link: "/webinars",
        internal: true
      },
      {
        title: "Food Recovery Toolkit",
        description: "Comprehensive guide from EPA",
        type: "PDF",
        link: "https://www.epa.gov/sustainable-management-food",
        internal: false
      }
    ]
  }
]

const quickActions = [
  {
    title: "Download Mobile App",
    description: "Get the FoodShare app for easier access",
    icon: IconDownload,
    action: "Download",
    link: "/download"
  },
  {
    title: "Join Newsletter",
    description: "Stay updated with tips and community news",
    icon: IconFileText,
    action: "Subscribe",
    link: "/newsletter"
  },
  {
    title: "Report an Issue",
    description: "Help us improve the platform",
    icon: IconBulb,
    action: "Report",
    link: "/report-issue"
  },
  {
    title: "Share Feedback",
    description: "Tell us about your experience",
    icon: IconHeart,
    action: "Share",
    link: "/feedback"
  }
]

const getColorClasses = (color: string) => {
  switch (color) {
    case "red":
      return "bg-red-100 text-red-800"
    case "green":
      return "bg-green-100 text-green-800"
    case "blue":
      return "bg-blue-100 text-blue-800"
    case "purple":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Resources & Learning</h1>
          <p className="text-content-secondary">
            Everything you need to know about safe and effective food sharing
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Quick Actions</CardTitle>
            <CardDescription>Common tasks and helpful tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-green-50"
                  asChild
                >
                  <Link href={action.link}>
                    <action.icon className="size-6 text-green-600" />
                    <div className="text-center">
                      <p className="font-semibold text-sm">{action.title}</p>
                      <p className="text-xs text-content-muted">{action.description}</p>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resource Categories */}
        <div className="space-y-8">
          {resourceCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(category.color)}`}>
                    <category.icon className="size-5" />
                  </div>
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.resources.map((resource) => (
                    <div
                      key={resource.title}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-content-secondary mb-4">{resource.description}</p>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        {resource.internal ? (
                          <Link href={resource.link}>
                            <IconBook className="size-4 mr-2" />
                            Open Resource
                          </Link>
                        ) : (
                          <a 
                            href={resource.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <IconExternalLink className="size-4 mr-2" />
                            Open External
                          </a>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconChartBar className="size-5 text-orange-600" />
              Research & Statistics
            </CardTitle>
            <CardDescription>
              Data and research about food waste and food security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Global Statistics</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 1/3 of all food produced globally is wasted</li>
                  <li>• Food waste contributes to 8-10% of global greenhouse gases</li>
                  <li>• 828 million people face acute food insecurity</li>
                  <li>• $1 trillion worth of food is wasted annually</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Impact of Food Sharing</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Reduces household food waste by up to 30%</li>
                  <li>• Strengthens community connections</li>
                  <li>• Supports food security for vulnerable populations</li>
                  <li>• Creates environmental awareness</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact for More */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="font-semibold text-blue-800 mb-2">Need More Information?</h3>
              <p className="text-blue-700 text-sm mb-4">
                Our team is here to help you make the most of food sharing
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="default" asChild>
                  <Link href="/help">
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/community">
                    Join Community Forum
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
