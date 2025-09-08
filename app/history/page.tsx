import { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History as HistoryIcon, 
  Package, 
  Heart, 
  Calendar,
  CheckCircle,
  Download
} from "lucide-react";

export const metadata: Metadata = {
  title: "History - FoodShare Platform",
  description: "View your donation and request history",
};

// Mock data
const donationHistory = [
  {
    id: "1",
    title: "Fresh Vegetables from Garden",
    recipient: "Happy Family Foundation",
    quantity: "3 kg",
    category: "Fresh Produce",
    status: "Completed",
    completedDate: "2024-01-15",
    impactScore: 85
  },
  {
    id: "2",
    title: "Homemade Bread",
    recipient: "Local Community Center", 
    quantity: "5 loaves",
    category: "Baked Goods",
    status: "Completed",
    completedDate: "2024-01-10",
    impactScore: 92
  },
  {
    id: "3",
    title: "Rice and Canned Goods",
    recipient: "Homeless Shelter",
    quantity: "10 items",
    category: "Packaged Food",
    status: "Completed", 
    completedDate: "2024-01-08",
    impactScore: 78
  }
];

const requestHistory = [
  {
    id: "1",
    title: "Fresh Fruits from Local Market",
    donor: "Green Grocers Ltd.",
    quantity: "2 kg",
    category: "Fresh Produce",
    status: "Received",
    receivedDate: "2024-01-12",
    rating: 5
  },
  {
    id: "2",
    title: "Bakery Surplus Pastries",
    donor: "Sweet Dreams Bakery",
    quantity: "8 pieces", 
    category: "Baked Goods",
    status: "Received",
    receivedDate: "2024-01-05",
    rating: 4
  },
  {
    id: "3",
    title: "Restaurant Surplus Meals",
    donor: "Tasty Bites Restaurant",
    quantity: "3 portions",
    category: "Prepared Food", 
    status: "Cancelled",
    cancelledDate: "2024-01-03",
    reason: "Unable to pickup on time"
  }
];

const monthlyStats = {
  totalDonations: 12,
  totalRequests: 8,
  foodSaved: "45 kg",
  carbonFootprint: "67 kg CO₂",
  impactScore: 850
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
    case "Received": return "bg-green-100 text-green-800";
    case "Cancelled": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BrandLogo size="sm" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Your FoodShare History
                </h1>
              </div>
              <p className="text-gray-600">
                Track your donations, requests, and environmental impact 📊
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-600">{monthlyStats.totalDonations}</div>
              <div className="text-xs text-gray-600">Donations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-red-600">{monthlyStats.totalRequests}</div>
              <div className="text-xs text-gray-600">Requests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <HistoryIcon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-600">{monthlyStats.foodSaved}</div>
              <div className="text-xs text-gray-600">Food Saved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-600">{monthlyStats.carbonFootprint}</div>
              <div className="text-xs text-gray-600">CO₂ Saved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-6 h-6 text-yellow-600 mx-auto mb-2 text-lg">⭐</div>
              <div className="text-xl font-bold text-yellow-600">{monthlyStats.impactScore}</div>
              <div className="text-xs text-gray-600">Impact Score</div>
            </CardContent>
          </Card>
        </div>

        {/* History Tabs */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="donations">
              My Donations ({donationHistory.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              My Requests ({requestHistory.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donations" className="space-y-4">
            {donationHistory.map((donation) => (
              <Card key={donation.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{donation.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(donation.status)}>
                          {donation.status}
                        </Badge>
                        <Badge variant="secondary">{donation.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Impact Score</div>
                      <div className="text-lg font-bold text-green-600">
                        {donation.impactScore}/100
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Recipient</div>
                      <div className="font-medium">{donation.recipient}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Quantity</div>
                      <div className="font-medium">{donation.quantity}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Completed Date</div>
                      <div className="font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(donation.completedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-sm text-gray-600">
                      Thank you for helping reduce food waste! 🌱
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {requestHistory.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        <Badge variant="secondary">{request.category}</Badge>
                      </div>
                    </div>
                    {request.status === "Received" && request.rating && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Your Rating</div>
                        <div className="text-lg">
                          {"⭐".repeat(request.rating)}
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Donor</div>
                      <div className="font-medium">{request.donor}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Quantity</div>
                      <div className="font-medium">{request.quantity}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">
                        {request.status === "Received" ? "Received Date" : "Date"}
                      </div>
                      <div className="font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(
                          request.receivedDate || request.cancelledDate || ""
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  {request.reason && (
                    <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                      Reason: {request.reason}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-sm text-gray-600">
                      {request.status === "Received" 
                        ? "Thank you for being part of our community! 💚"
                        : "Better luck next time! Keep helping the environment 🌍"
                      }
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
