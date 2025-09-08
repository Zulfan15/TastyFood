"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Users, Package, Map, Star } from "lucide-react";
import Link from "next/link";

export default function ApiDocsPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/donations/mock",
      description: "Get mock donation data for testing",
      params: ["latitude", "longitude"],
      example: "/api/donations/mock?latitude=-6.2088&longitude=106.8456",
    },
    {
      method: "POST",
      path: "/api/donations",
      description: "Create a new donation",
      body: {
        title: "string",
        description: "string",
        category: "ready_to_eat | vegetables | fruits | etc",
        quantity: "number",
        unit: "string",
        address: "string",
        latitude: "number",
        longitude: "number",
        pickupTimeStart: "ISO date string",
        pickupTimeEnd: "ISO date string",
        expiryTime: "ISO date string",
      },
    },
    {
      method: "GET",
      path: "/api/users",
      description: "Get users data",
      params: ["email", "id"],
      example: "/api/users?email=user@example.com",
    },
    {
      method: "POST",
      path: "/api/users",
      description: "Create a new user",
      body: {
        email: "string",
        name: "string",
        role: "donor | receiver | admin",
        address: "string",
        latitude: "number",
        longitude: "number",
      },
    },
    {
      method: "GET",
      path: "/api/requests",
      description: "Get donation requests",
      params: ["donationId", "receiverId", "status"],
      example: "/api/requests?donationId=donation-123",
    },
    {
      method: "POST",
      path: "/api/requests",
      description: "Create a new pickup request",
      body: {
        donationId: "string",
        estimatedPickupTime: "ISO date string",
        message: "string (optional)",
      },
    },
  ];

  const features = [
    {
      icon: Map,
      title: "Location-based Matching",
      description: "Find donations within 5km radius using geospatial queries",
    },
    {
      icon: Package,
      title: "Real-time Donations",
      description: "Post and manage food donations with expiry tracking",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Donor and receiver registration with verification",
    },
    {
      icon: Star,
      title: "Rating System",
      description: "Two-way rating and review system for trust building",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          FoodShare API Documentation
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive API for the FoodShare Platform - connecting food donors with receivers
          to reduce waste and help communities.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Server className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">REST API</div>
            <div className="text-sm text-gray-600">RESTful endpoints</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">PostgreSQL</div>
            <div className="text-sm text-gray-600">With PostGIS</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Code className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">TypeScript</div>
            <div className="text-sm text-gray-600">Fully typed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">Drizzle ORM</div>
            <div className="text-sm text-gray-600">Type-safe queries</div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <feature.icon className="h-6 w-6 text-green-600" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* API Endpoints */}
      <section>
        <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Badge variant={endpoint.method === "GET" ? "default" : "secondary"}>
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {endpoint.path}
                  </code>
                </CardTitle>
                <p className="text-gray-600">{endpoint.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {endpoint.params && (
                  <div>
                    <h4 className="font-semibold mb-2">Query Parameters:</h4>
                    <div className="flex flex-wrap gap-2">
                      {endpoint.params.map((param) => (
                        <Badge key={param} variant="outline">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {endpoint.body && (
                  <div>
                    <h4 className="font-semibold mb-2">Request Body:</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {JSON.stringify(endpoint.body, null, 2)}
                    </pre>
                  </div>
                )}

                {endpoint.example && (
                  <div>
                    <h4 className="font-semibold mb-2">Example:</h4>
                    <code className="bg-gray-100 p-2 rounded text-sm block">
                      GET {endpoint.example}
                    </code>
                    {endpoint.path.includes("/mock") && (
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                      >
                        <Link 
                          href={endpoint.example} 
                          target="_blank"
                        >
                          Test API
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Database Schema */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Database Schema</h2>
        <Card>
          <CardHeader>
            <CardTitle>Main Tables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Users</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• id, email, name, phone</li>
                  <li>• role: donor | receiver | admin</li>
                  <li>• userType: individual | restaurant | store</li>
                  <li>• locationPoint (PostGIS)</li>
                  <li>• verificationStatus, trustScore</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Donations</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• id, donorId, title, description</li>
                  <li>• category, quantity, unit, images</li>
                  <li>• locationPoint, address</li>
                  <li>• pickup & expiry times</li>
                  <li>• status, notes, isRecurring</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Requests</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• id, donationId, receiverId</li>
                  <li>• status: pending | approved | rejected</li>
                  <li>• estimatedPickupTime, actualPickupTime</li>
                  <li>• qrCode, priority, message</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Transactions</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• id, donationId, requestId</li>
                  <li>• donorId, receiverId</li>
                  <li>• qrCode, digitalReceipt</li>
                  <li>• completedAt timestamp</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Start */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">1. Try the Dashboard</h4>
                <p className="text-gray-600 mb-3">
                  Explore the full interface with map view and donation management.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/dashboard">Open Dashboard</Link>
                </Button>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">2. Test Mock API</h4>
                <p className="text-gray-600 mb-3">
                  Test the API endpoints with mock data for development.
                </p>
                <Button asChild variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  <Link href="/api/donations/mock" target="_blank">
                    View Mock Data
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <div className="text-center text-gray-600">
        <p>
          Built with Next.js 15, TypeScript, Drizzle ORM, and PostgreSQL
        </p>
        <p className="mt-2">
          <Badge variant="outline">🌱 Sustainable</Badge>{" "}
          <Badge variant="outline">🤝 Community-Driven</Badge>{" "}
          <Badge variant="outline">🚀 Modern Stack</Badge>
        </p>
      </div>
    </div>
  );
}
