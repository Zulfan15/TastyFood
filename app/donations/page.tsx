import { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Package, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Browse Donations - FoodShare Platform",
  description: "Browse and discover food donations in your area",
};

// Mock data
const donations = [
  {
    id: "1",
    title: "Fresh Vegetables from Local Farm",
    description: "Surplus vegetables including tomatoes, lettuce, and carrots",
    category: "Fresh Produce",
    quantity: 5,
    unit: "kg",
    address: "123 Farm Street, Jakarta",
    distance: "2.3 km",
    expiresIn: "6 hours",
    donor: {
      name: "Green Farm Co.",
      rating: 4.8,
      avatar: "/placeholder-avatar.png"
    },
    images: ["/placeholder-food.jpg"]
  },
  {
    id: "2", 
    title: "Bakery Surplus - Fresh Bread",
    description: "Day-old bread and pastries, still fresh and delicious",
    category: "Baked Goods",
    quantity: 20,
    unit: "pieces",
    address: "456 Bakery Lane, Jakarta",
    distance: "1.8 km",
    expiresIn: "4 hours",
    donor: {
      name: "Sweet Dreams Bakery",
      rating: 4.9,
      avatar: "/placeholder-avatar.png"
    },
    images: ["/placeholder-food.jpg"]
  },
  {
    id: "3",
    title: "Restaurant Surplus - Cooked Meals",
    description: "Prepared meals from our restaurant, properly stored",
    category: "Prepared Food",
    quantity: 10,
    unit: "portions",
    address: "789 Restaurant Road, Jakarta",
    distance: "3.1 km",
    expiresIn: "2 hours",
    donor: {
      name: "Tasty Bites Restaurant",
      rating: 4.7,
      avatar: "/placeholder-avatar.png"
    },
    images: ["/placeholder-food.jpg"]
  }
];

export default function DonationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BrandLogo size="sm" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Browse Food Donations
            </h1>
          </div>
          <p className="text-gray-600">
            Discover available food donations in your area and help reduce food waste 🌱
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">All Categories</Button>
          <Button variant="outline" size="sm">Fresh Produce</Button>
          <Button variant="outline" size="sm">Baked Goods</Button>
          <Button variant="outline" size="sm">Prepared Food</Button>
          <Button variant="outline" size="sm">Packaged Food</Button>
        </div>

        {/* Donations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <Card key={donation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {donation.title}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {donation.category}
                    </Badge>
                  </div>
                  <div className="text-right text-sm text-green-600 font-medium">
                    {donation.distance}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  {donation.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span>{donation.quantity} {donation.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-red-600">
                    <Clock className="w-4 h-4" />
                    <span>{donation.expiresIn}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{donation.address}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{donation.donor.name}</span>
                  <span className="text-sm text-yellow-600">⭐ {donation.donor.rating}</span>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Request This Donation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
