"use client";

import { useState, useEffect } from "react";
import { MapView } from "@/components/map-view";
import { DonationForm } from "@/components/donation-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateDonationInput } from "@/lib/validations";
import { MapPin, Search, Filter, Plus, Package, Users, Clock, TrendingUp, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Donation {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  images: string[];
  address: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  expiryTime: string;
  status: string;
  locationPoint: string;
  donor: {
    id: string;
    name: string;
    avatar?: string;
    trustScore: string;
  };
  createdAt: string;
}

export default function DashboardPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeDonations: 0,
    totalUsers: 0,
    successfulPickups: 0,
  });

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Unable to get location, using default Jakarta coordinates");
          // Default to Jakarta coordinates
          setUserLocation({ lat: -6.2088, lng: 106.8456 });
        }
      );
    } else {
      // Default to Jakarta coordinates
      setUserLocation({ lat: -6.2088, lng: 106.8456 });
    }
  }, []);

  // Fetch donations when user location is available
  useEffect(() => {
    if (userLocation) {
      fetchDonations();
    }
  }, [userLocation]);

  // Filter donations based on search and category
  useEffect(() => {
    let filtered = donations;

    if (searchQuery) {
      filtered = filtered.filter(donation =>
        donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.donor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(donation => donation.category === categoryFilter);
    }

    setFilteredDonations(filtered);
  }, [donations, searchQuery, categoryFilter]);

  const fetchDonations = async () => {
    try {
      setIsLoading(true);
      // Use mock API for development
      const response = await fetch(
        `/api/donations/mock?latitude=${userLocation?.lat}&longitude=${userLocation?.lng}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setDonations(data);
        
        // Calculate stats
        setStats({
          totalDonations: data.length,
          activeDonations: data.filter((d: Donation) => d.status === "available").length,
          totalUsers: new Set(data.map((d: Donation) => d.donor.id)).size,
          successfulPickups: data.filter((d: Donation) => d.status === "completed").length,
        });
      }
    } catch (error) {
      console.log("Failed to load donations, using fallback");
      toast.error("Failed to load donations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonationSubmit = async (data: CreateDonationInput) => {
    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "demo-user-id", // In real app, get from auth
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Donation posted successfully!");
        fetchDonations(); // Refresh donations
      } else {
        throw new Error("Failed to post donation");
      }
    } catch (error) {
      console.log("Failed to post donation");
      toast.error("Failed to post donation");
    }
  };

  const handleRequestDonation = async (donationId: string) => {
    try {
      const estimatedPickupTime = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now
      
      const requestData = {
        donationId,
        estimatedPickupTime: estimatedPickupTime.toISOString(),
        message: "I would like to pick up this donation. Thank you!",
      };

      // Try main API first, fallback to mock if it fails
      let response;
      try {
        response = await fetch("/api/requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": "demo-receiver-id", // In real app, get from auth
          },
          body: JSON.stringify(requestData),
        });
      } catch (error) {
        console.log("Main API failed, using mock API");
        response = await fetch("/api/requests/mock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      }

      if (response.ok) {
        toast.success("Request sent successfully!");
        fetchDonations(); // Refresh donations
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to send request");
      }
    } catch (error) {
      console.log("Failed to send request");
      toast.error("Failed to send request");
    }
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "ready_to_eat", label: "Ready to Eat" },
    { value: "raw_ingredients", label: "Raw Ingredients" },
    { value: "beverages", label: "Beverages" },
    { value: "snacks", label: "Snacks" },
    { value: "desserts", label: "Desserts" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "others", label: "Others" },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            FoodShare Dashboard
          </h1>
          <p className="text-content-secondary">Connect donors and receivers to reduce food waste</p>
        </div>
        
        <div className="flex items-center gap-2">
          {userLocation && (
            <div className="flex items-center gap-2 text-sm text-content-muted">
              <MapPin className="h-4 w-4" />
              <span>Searching within 5km</span>
            </div>
          )}
          
          <Button variant="outline" size="sm" asChild className="border-green-200 text-green-700 hover:bg-green-50">
            <Link href="/requests">
              <MessageSquare className="h-4 w-4 mr-2" />
              Requests
            </Link>
          </Button>
          
          <Button variant="outline" size="sm" asChild className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <Link href="/api-docs">
              <Package className="h-4 w-4 mr-2" />
              API
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-content-muted">Total Donations</p>
                <p className="text-2xl font-bold">{stats.totalDonations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-content-muted">Available Now</p>
                <p className="text-2xl font-bold">{stats.activeDonations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-content-muted">Active Donors</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-content-muted">Successful Pickups</p>
                <p className="text-2xl font-bold">{stats.successfulPickups}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-green-50 border border-green-200">
          <TabsTrigger 
            value="map" 
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            🗺️ Map View
          </TabsTrigger>
          <TabsTrigger 
            value="list"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            📋 List View
          </TabsTrigger>
          <TabsTrigger 
            value="donate"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            📤 Post Donation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-content-muted" />
              <Input
                placeholder="Search donations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={fetchDonations}>
              <Filter className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Map */}
          <MapView
            userLocation={userLocation}
            donations={filteredDonations}
            onDonationSelect={setSelectedDonation}
            onRequestDonation={handleRequestDonation}
          />
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-content-muted" />
              <Input
                placeholder="Search donations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Donations List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDonations.map((donation) => (
              <Card key={donation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{donation.title}</CardTitle>
                    <Badge variant={donation.status === "available" ? "default" : "secondary"}>
                      {donation.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{donation.category}</Badge>
                    <span className="text-sm text-content-secondary">{donation.quantity} {donation.unit}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-content-secondary line-clamp-3">{donation.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{donation.donor.name}</span>
                    <Badge variant="outline">⭐ {donation.donor.trustScore}</Badge>
                  </div>

                  <div className="text-xs text-content-muted">
                    <div>📍 {donation.address}</div>
                    <div>⏰ {new Date(donation.pickupTimeStart).toLocaleString()}</div>
                  </div>

                  <Button 
                    onClick={() => handleRequestDonation(donation.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={donation.status !== "available"}
                  >
                    {donation.status === "available" ? "🍽️ Request Pickup" : "❌ Not Available"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDonations.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-content-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-content-secondary">No donations found</h3>
              <p className="text-content-muted">Try adjusting your search criteria or check back later.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="donate">
          <DonationForm onSubmit={handleDonationSubmit} userLocation={userLocation} />
        </TabsContent>
      </Tabs>
    </div>
  );
}