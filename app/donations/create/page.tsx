"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { IconCamera, IconMapPin, IconClock, IconUsers } from "@tabler/icons-react"

export default function CreateDonationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to donations page after successful creation
    router.push("/my-donations")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Share Food with Community</h1>
          <p className="text-content-secondary">Help reduce food waste by sharing your extra food with those in need</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconCamera className="size-5 text-green-600" />
                Food Details
              </CardTitle>
              <CardDescription>
                Provide information about the food you want to donate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Food Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Fresh Vegetables, Cooked Rice, Bread"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the food, its condition, and any special notes"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cooked">Cooked Food</SelectItem>
                      <SelectItem value="raw">Raw Ingredients</SelectItem>
                      <SelectItem value="baked">Baked Goods</SelectItem>
                      <SelectItem value="fruits">Fruits & Vegetables</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity/Portions</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="5"
                      min="1"
                      required
                    />
                    <IconUsers className="size-4 text-content-muted" />
                  </div>
                </div>
              </div>

              <div>
                <Label>Food Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <IconCamera className="size-8 text-content-muted mx-auto mb-2" />
                  <p className="text-sm text-content-secondary">Click to upload images or drag and drop</p>
                  <p className="text-xs text-content-muted mt-1">PNG, JPG up to 5MB each</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconMapPin className="size-5 text-green-600" />
                Pickup Information
              </CardTitle>
              <CardDescription>
                Where and when can people pick up the food?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Pickup Location</Label>
                <Input
                  id="location"
                  placeholder="Enter your address or location"
                  required
                />
                <p className="text-xs text-content-muted mt-1">
                  Your exact address will only be shared with confirmed recipients
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickup-date">Available Date</Label>
                  <Input
                    id="pickup-date"
                    type="date"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="pickup-time">Available Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (6-12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12-6 PM)</SelectItem>
                      <SelectItem value="evening">Evening (6-9 PM)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="expiry">Best Before</Label>
                <Input
                  id="expiry"
                  type="datetime-local"
                  required
                />
                <p className="text-xs text-content-muted mt-1">
                  When should this food be consumed by?
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconClock className="size-5 text-green-600" />
                Additional Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="special-notes">Special Instructions</Label>
                <Textarea
                  id="special-notes"
                  placeholder="Any special pickup instructions, dietary information, or other notes"
                  rows={2}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Vegetarian</Badge>
                <Badge variant="secondary">Halal</Badge>
                <Badge variant="secondary">Vegan</Badge>
                <Badge variant="secondary">Gluten-Free</Badge>
                <Badge variant="outline">+ Add Tag</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Share Food"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
