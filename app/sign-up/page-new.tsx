"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin } from "lucide-react";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "",
        userType: "",
        address: "",
        latitude: 0,
        longitude: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const getCurrentLocation = () => {
        setIsGettingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData({
                        ...formData,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setIsGettingLocation(false);
                },
                (_error) => {
                    setError("Unable to get your location. Please enter manually.");
                    setIsGettingLocation(false);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            setIsGettingLocation(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }

        try {
            // For demo purposes, simulate registration
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSuccess("Account created successfully! Redirecting to sign in...");
            
            setTimeout(() => {
                router.push("/sign-in");
            }, 2000);
            
        } catch (_err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <Link href="/" className="text-sm text-blue-600 hover:underline mb-2 inline-block">
                        ← Back to Home
                    </Link>
                    <CardTitle className="text-2xl font-bold">Join FoodShare Platform</CardTitle>
                    <CardDescription>
                        Create your account to start sharing food and helping your community
                    </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        
                        {success && (
                            <Alert className="border-green-200 bg-green-50">
                                <AlertDescription className="text-green-800">{success}</AlertDescription>
                            </Alert>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select onValueChange={(value) => handleSelectChange("role", value)} disabled={isLoading}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="donor">Food Donor</SelectItem>
                                        <SelectItem value="receiver">Food Receiver</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="userType">User Type</Label>
                                <Select onValueChange={(value) => handleSelectChange("userType", value)} disabled={isLoading}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select user type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="individual">Individual</SelectItem>
                                        <SelectItem value="restaurant">Restaurant</SelectItem>
                                        <SelectItem value="store">Store/Market</SelectItem>
                                        <SelectItem value="organization">Organization</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                name="address"
                                placeholder="Enter your full address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                disabled={isLoading}
                                rows={3}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Location Coordinates</Label>
                            <div className="flex gap-2">
                                <Input
                                    name="latitude"
                                    type="number"
                                    step="any"
                                    placeholder="Latitude"
                                    value={formData.latitude || ""}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <Input
                                    name="longitude"
                                    type="number"
                                    step="any"
                                    placeholder="Longitude"
                                    value={formData.longitude || ""}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={getCurrentLocation}
                                    disabled={isLoading || isGettingLocation}
                                >
                                    {isGettingLocation ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <MapPin className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">
                                Click the location button to get your current coordinates automatically
                            </p>
                        </div>

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </CardContent>
                
                <CardFooter className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="font-medium text-green-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
