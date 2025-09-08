"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, MapPin, Users, Package, Recycle, Clock, Shield, Star, Globe } from "lucide-react";

export default function HomePage() {
  const stats = [
    { label: "Food Saved", value: "50,000+", suffix: "kg", icon: Package, color: "text-green-500" },
    { label: "Active Users", value: "10,000+", suffix: "", icon: Users, color: "text-blue-500" },
    { label: "Successful Donations", value: "25,000+", suffix: "", icon: Recycle, color: "text-purple-500" },
    { label: "Cities Covered", value: "100+", suffix: "", icon: Globe, color: "text-orange-500" },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Location-Based Matching",
      description: "Find food donations within 5km radius using our interactive map system.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications for new donations and request updates.",
    },
    {
      icon: Shield,
      title: "Verified Donors",
      description: "All donors are verified for safety and quality assurance.",
    },
    {
      icon: Star,
      title: "Rating System",
      description: "Build trust through our two-way rating and review system.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Restaurant Owner",
      content: "FoodShare helped us reduce waste by 80% while helping the community. It's a win-win!",
      rating: 5,
    },
    {
      name: "Ahmad Rahman",
      role: "Community Volunteer",
      content: "Amazing platform! I've helped distribute over 500kg of food to families in need.",
      rating: 5,
    },
    {
      name: "Maria Santos",
      role: "Food Bank Coordinator",
      content: "The verification system and QR codes make the process secure and efficient.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-20 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-4">
            🌱 Fighting Food Waste Together
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Food <span className="text-green-600">Donors</span> with{" "}
            <span className="text-blue-600">Receivers</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            FoodShare Platform menghubungkan donor makanan dengan penerima dalam radius 5 km 
            untuk mengurangi food waste sekaligus membantu masyarakat yang membutuhkan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/dashboard">
                Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/api-docs">API Docs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact So Far</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                    <span className="text-lg text-gray-600">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes food sharing simple, safe, and efficient with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Steps to Start</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Donors */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-green-600">For Food Donors</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Register & Verify</h4>
                    <p className="text-gray-600">Create your account and complete verification process.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Post Your Donation</h4>
                    <p className="text-gray-600">Upload photos, set pickup time, and add location details.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Approve Requests</h4>
                    <p className="text-gray-600">Review and approve pickup requests from nearby receivers.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Complete Handover</h4>
                    <p className="text-gray-600">Use QR code verification for secure food handover.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Receivers */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-600">For Food Receivers</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Register & Verify Identity</h4>
                    <p className="text-gray-600">Sign up and complete identity verification for security.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Browse Available Food</h4>
                    <p className="text-gray-600">Use map or list view to find donations near you (5km radius).</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Request Pickup</h4>
                    <p className="text-gray-600">Send pickup request with estimated arrival time.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Collect & Review</h4>
                    <p className="text-gray-600">Navigate to location, scan QR code, and leave a review.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-600 mb-4">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of people already using FoodShare to reduce waste and help their communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/dashboard">
                Explore Donations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-gray-900" asChild>
              <Link href="/sign-up">Sign Up Today</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <SiteFooter />
    </div>
  );
}
