import { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  Video, 
  Search,
  BookOpen,
  Users,
  Shield
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help & Support - FoodShare Platform",
  description: "Get help and support for using FoodShare Platform",
};

const faqs = [
  {
    question: "How do I donate food on FoodShare?",
    answer: "To donate food, go to your dashboard and click 'Post Donation'. Fill in details about your food item including category, quantity, pickup time, and location. Make sure the food is safe and fresh for consumption."
  },
  {
    question: "What types of food can I donate?",
    answer: "You can donate fresh produce, packaged goods, baked items, and prepared meals. However, make sure all food items are within their expiry date and have been stored properly. We don't accept alcohol, homemade canned goods, or items past their expiration date."
  },
  {
    question: "How do I request food donations?",
    answer: "Browse available donations on the map or donations page. Click on items you're interested in and submit a request. The donor will review your request and either approve or decline it based on availability and other factors."
  },
  {
    question: "Is FoodShare free to use?",
    answer: "Yes! FoodShare is completely free for both donors and recipients. Our mission is to reduce food waste and help communities, not to profit from food sharing."
  },
  {
    question: "How do I ensure food safety?",
    answer: "Always check the condition of food when picking up. Don't accept items that look spoiled, have unusual odors, or are past their expiry date. When donating, ensure your food is fresh and properly stored."
  },
  {
    question: "What if I can't pickup the food on time?",
    answer: "Contact the donor as soon as possible to reschedule or cancel your request. This helps maintain trust in our community and allows other people to request the food."
  },
  {
    question: "How does the rating system work?",
    answer: "After each successful donation or pickup, both parties can rate each other. This helps build trust in our community. Higher ratings indicate reliable and trustworthy community members."
  },
  {
    question: "Can businesses use FoodShare?",
    answer: "Absolutely! We welcome restaurants, grocery stores, bakeries, and other food businesses. You can create a business account to manage larger volume donations and reach more community members."
  }
];

const quickLinks = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of using FoodShare",
    icon: BookOpen,
    link: "/guide"
  },
  {
    title: "Community Guidelines",
    description: "Rules and best practices for our community",
    icon: Users,
    link: "/guidelines"
  },
  {
    title: "Safety & Privacy",
    description: "How we keep your data and interactions safe",
    icon: Shield,
    link: "/safety"
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step video guides",
    icon: Video,
    link: "/tutorials"
  }
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BrandLogo size="sm" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Help & Support Center
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Need help with FoodShare? Find answers to common questions, get support, or contact our team 🤝
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search for help topics, features, or issues..."
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {quickLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <link.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{link.title}</h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input placeholder="Your Name" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" />
                </div>
                <div>
                  <Input placeholder="Subject" />
                </div>
                <div>
                  <Textarea 
                    placeholder="Describe your issue or question..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-sm text-gray-600">support@foodshare.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Phone Support</div>
                    <div className="text-sm text-gray-600">+62 21 1234 5678</div>
                    <div className="text-xs text-gray-500">Mon-Fri, 9AM-6PM</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-gray-600">Available 24/7</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>API Services</span>
                    <span className="text-green-600 text-sm">● Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Map Services</span>
                    <span className="text-green-600 text-sm">● Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Notifications</span>
                    <span className="text-green-600 text-sm">● Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Database</span>
                    <span className="text-green-600 text-sm">● Operational</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Status Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our community is here to help! Join our forums or check out our comprehensive documentation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Community Forum
            </Button>
            <Button variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline">
              <Video className="w-4 h-4 mr-2" />
              Video Guides
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
