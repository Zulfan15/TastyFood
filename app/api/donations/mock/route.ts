import { NextRequest, NextResponse } from "next/server";

// Mock data for testing the API without database
const mockDonations = [
  {
    id: "donation-1",
    title: "Fresh Vegetables from Restaurant",
    description: "We have surplus fresh vegetables including lettuce, tomatoes, and carrots. All vegetables are fresh and safe to consume. Perfect for families or community kitchens.",
    category: "vegetables",
    quantity: 10,
    unit: "kg",
    images: [],
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    pickupTimeStart: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    pickupTimeEnd: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    status: "available",
    locationPoint: "(106.8456, -6.2088)",
    donor: {
      id: "donor-1",
      name: "Green Garden Restaurant",
      avatar: null,
      trustScore: "4.8",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "donation-2", 
    title: "Freshly Baked Bread",
    description: "End of day bread from our bakery. Includes various types: white bread, whole grain, and croissants. All baked today and still fresh.",
    category: "ready_to_eat",
    quantity: 20,
    unit: "pcs",
    images: [],
    address: "Jl. Thamrin No. 456, Jakarta Pusat",
    pickupTimeStart: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
    pickupTimeEnd: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: "available",
    locationPoint: "(106.8556, -6.2188)",
    donor: {
      id: "donor-2",
      name: "Fresh Bread Bakery",
      avatar: null,
      trustScore: "4.9",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "donation-3",
    title: "Cooked Rice and Side Dishes",
    description: "Surplus food from our restaurant including steamed rice, vegetables, and some meat dishes. Food is still warm and ready to eat.",
    category: "ready_to_eat",
    quantity: 15,
    unit: "porsi",
    images: [],
    address: "Jl. Rasuna Said No. 789, Jakarta Selatan",
    pickupTimeStart: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    pickupTimeEnd: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    status: "available",
    locationPoint: "(106.8356, -6.1988)",
    donor: {
      id: "donor-3",
      name: "Bu Sari Warung",
      avatar: null,
      trustScore: "4.7",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "donation-4",
    title: "Mixed Fruits",
    description: "Fresh fruits including apples, bananas, and oranges. Perfect condition, just slightly blemished on the outside but totally fine to eat.",
    category: "fruits",
    quantity: 8,
    unit: "kg",
    images: [],
    address: "Jl. Gatot Subroto No. 321, Jakarta Selatan",
    pickupTimeStart: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    pickupTimeEnd: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    expiryTime: new Date(Date.now() + 16 * 60 * 60 * 1000).toISOString(),
    status: "available",
    locationPoint: "(106.8256, -6.2288)",
    donor: {
      id: "donor-4",
      name: "Fruit Corner Store",
      avatar: null,
      trustScore: "4.6",
    },
    createdAt: new Date().toISOString(),
  },
  // Add some completed donations for realistic stats
  {
    id: "donation-5",
    title: "Sandwich Pack - Already Picked Up",
    description: "Sandwich pack that was successfully distributed to families in need.",
    category: "ready_to_eat",
    quantity: 10,
    unit: "pcs",
    images: [],
    address: "Jl. Kuningan No. 567, Jakarta Selatan",
    pickupTimeStart: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    pickupTimeEnd: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    expiryTime: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    status: "completed",
    locationPoint: "(106.8156, -6.2388)",
    donor: {
      id: "donor-5",
      name: "Cafe Santai",
      avatar: null,
      trustScore: "4.8",
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "donation-6",
    title: "Surplus Groceries - Distributed",
    description: "Mixed groceries including rice, oil, and canned goods successfully distributed.",
    category: "raw_ingredients",
    quantity: 25,
    unit: "kg",
    images: [],
    address: "Jl. Cikini No. 234, Jakarta Pusat",
    pickupTimeStart: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    pickupTimeEnd: new Date(Date.now() - 44 * 60 * 60 * 1000).toISOString(),
    expiryTime: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    status: "completed",
    locationPoint: "(106.8356, -6.1888)",
    donor: {
      id: "donor-6",
      name: "Supermarket Prima",
      avatar: null,
      trustScore: "4.9",
    },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "donation-7",
    title: "Fresh Milk - Successfully Shared",
    description: "Fresh milk cartons that were distributed to local families.",
    category: "beverages",
    quantity: 12,
    unit: "liter",
    images: [],
    address: "Jl. Menteng No. 678, Jakarta Pusat",
    pickupTimeStart: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    pickupTimeEnd: new Date(Date.now() - 68 * 60 * 60 * 1000).toISOString(),
    expiryTime: new Date(Date.now() - 64 * 60 * 60 * 1000).toISOString(),
    status: "completed",
    locationPoint: "(106.8456, -6.1788)",
    donor: {
      id: "donor-7",
      name: "Dairy Fresh",
      avatar: null,
      trustScore: "4.7",
    },
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    // Override the original GET method to return mock data
    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    if (latitude && longitude) {
      // Filter donations within 5km radius (simplified)
      const userLat = parseFloat(latitude);
      const userLng = parseFloat(longitude);
      
      const filtered = mockDonations.filter((donation) => {
        try {
          const pointStr = donation.locationPoint;
          const coords = pointStr.replace(/[()]/g, '').split(',');
          const donationLng = parseFloat(coords[0]);
          const donationLat = parseFloat(coords[1]);
          
          // Simple distance calculation (for demo)
          const distance = Math.sqrt(
            Math.pow(userLat - donationLat, 2) + Math.pow(userLng - donationLng, 2)
          ) * 111; // Rough conversion to km
          
          return distance <= 50; // 50km for demo (normally 5km)
        } catch {
          return true; // Include if parsing fails
        }
      });

      return NextResponse.json(filtered);
    }

    return NextResponse.json(mockDonations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
