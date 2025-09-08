"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  MapPin, 
  User, 
  Package, 
  MessageSquare, 
  Star, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Request {
  id: string;
  donationId: string;
  receiverId: string;
  donorId: string;
  status: "pending" | "approved" | "rejected" | "completed";
  estimatedPickupTime: string;
  actualPickupTime?: string;
  message: string;
  priority: "low" | "medium" | "high";
  qrCode: string;
  createdAt: string;
  updatedAt: string;
  receiver: {
    id: string;
    name: string;
    email: string;
    phone: string;
    trustScore: number;
  };
  donation?: {
    id: string;
    title: string;
    category: string;
    quantity: number;
    unit: string;
  };
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      
      // Try main API first, fallback to mock
      let response;
      try {
        response = await fetch("/api/requests");
      } catch (error) {
        console.log("Main API failed, using mock API");
        response = await fetch("/api/requests/mock");
      }
      
      if (response.ok) {
        const result = await response.json();
        setRequests(result.data || []);
      }
    } catch (error) {
      console.log("Failed to load requests");
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: "approved" | "rejected") => {
    try {
      // For demo purposes, just update local state
      setRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status, updatedAt: new Date().toISOString() }
            : req
        )
      );
      
      toast.success(`Request ${status} successfully!`);
    } catch (error) {
      console.log("Failed to update request");
      toast.error("Failed to update request");
    }
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === "all") return true;
    return req.status === activeTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Food Pickup Requests
        </h1>
        <p className="text-gray-600 mt-2">
          Manage requests from people who want to pick up your donated food
        </p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {requests.filter(r => r.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {requests.filter(r => r.status === "approved").length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {requests.filter(r => r.status === "completed").length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {requests.length}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">No Requests Found</h3>
                <p className="text-gray-600">
                  {activeTab === "all" 
                    ? "You haven't received any pickup requests yet."
                    : `No ${activeTab} requests at the moment.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {request.receiver.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.receiver.name}</CardTitle>
                          <CardDescription>{request.receiver.email}</CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority} priority
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>Pickup Time:</span>
                          <span className="font-medium">
                            {new Date(request.estimatedPickupTime).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4" />
                          <span>Trust Score:</span>
                          <span className="font-medium">{request.receiver.trustScore}/5.0</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4" />
                          <span>Phone:</span>
                          <span className="font-medium">{request.receiver.phone}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="h-4 w-4" />
                          <span>Request ID:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {request.id}
                          </code>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>Requested:</span>
                          <span className="font-medium">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {request.message && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Message from receiver:</p>
                            <p className="text-sm text-gray-600 mt-1">{request.message}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {request.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => updateRequestStatus(request.id, "approved")}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Request
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, "rejected")}
                          className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}

                    {request.status === "approved" && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-800">
                          ✅ Request approved! The receiver can now pick up the food.
                          QR Code: <code className="bg-white px-2 py-1 rounded">{request.qrCode}</code>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
