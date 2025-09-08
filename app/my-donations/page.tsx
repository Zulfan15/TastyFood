import { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MapPin, Clock, Package, Eye, Edit, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "My Donations - FoodShare Platform",
  description: "Manage your food donations and track their impact",
};

// Mock data
const myDonations = {
  active: [
    {
      id: "1",
      title: "Fresh Vegetables from Garden",
      description: "Homegrown vegetables including tomatoes and lettuce",
      category: "Fresh Produce",
      quantity: 3,
      unit: "kg",
      status: "Available",
      requests: 2,
      expiresIn: "4 hours",
      createdAt: "2 hours ago"
    },
    {
      id: "2",
      title: "Homemade Bread",
      description: "Freshly baked bread, made this morning",
      category: "Baked Goods", 
      quantity: 5,
      unit: "loaves",
      status: "Pending Pickup",
      requests: 1,
      expiresIn: "6 hours",
      createdAt: "1 day ago"
    }
  ],
  completed: [
    {
      id: "3",
      title: "Rice and Canned Goods",
      description: "Extra groceries from bulk shopping",
      category: "Packaged Food",
      quantity: 10,
      unit: "items",
      status: "Completed",
      recipient: "Happy Family Foundation",
      completedAt: "3 days ago"
    },
    {
      id: "4",
      title: "Surplus Fruits",
      description: "Fresh apples and oranges",
      category: "Fresh Produce",
      quantity: 2,
      unit: "kg",
      status: "Completed",
      recipient: "Local Community Center",
      completedAt: "1 week ago"
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available": return "bg-green-100 text-green-800";
    case "Pending Pickup": return "bg-yellow-100 text-yellow-800";
    case "Completed": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function MyDonationsPage() {
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
                  My Donations
                </h1>
              </div>
              <p className="text-gray-600">
                Manage your food donations and track their impact 📦
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Donation
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">Total Donations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">45kg</div>
              <div className="text-sm text-gray-600">Food Saved</div>
            </CardContent>
          </Card>
        </div>

        {/* Donations Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Donations ({myDonations.active.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({myDonations.completed.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {myDonations.active.map((donation) => (
              <Card key={donation.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{donation.title}</CardTitle>
                      <Badge className={getStatusColor(donation.status)}>
                        {donation.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-gray-600">{donation.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>{donation.quantity} {donation.unit}</span>
                    </div>
                    <Badge variant="secondary">{donation.category}</Badge>
                    {donation.expiresIn && (
                      <div className="flex items-center gap-1 text-red-600">
                        <Clock className="w-4 h-4" />
                        <span>{donation.expiresIn}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Created {donation.createdAt}</span>
                    <span className="text-blue-600 font-medium">
                      {donation.requests} request(s) received
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {myDonations.completed.map((donation) => (
              <Card key={donation.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{donation.title}</CardTitle>
                      <Badge className={getStatusColor(donation.status)}>
                        {donation.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-gray-600">{donation.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span>{donation.quantity} {donation.unit}</span>
                    </div>
                    <Badge variant="secondary">{donation.category}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completed {donation.completedAt}</span>
                    <span className="text-green-600 font-medium">
                      Donated to: {donation.recipient}
                    </span>
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
