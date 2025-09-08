import { db } from "@/db";
import { users } from "@/db/schema/users";
import { donations } from "@/db/schema/donations";
import { createId } from "@paralleldrive/cuid2";

// Dummy data for testing
export const dummyDonations = [
  {
    id: createId(),
    donorId: "donor-1",
    title: "Fresh Vegetables from Restaurant",
    description: "We have surplus fresh vegetables including lettuce, tomatoes, and carrots. All vegetables are fresh and safe to consume. Perfect for families or community kitchens.",
    category: "vegetables" as const,
    quantity: 10,
    unit: "kg",
    images: [],
    locationPoint: { x: 106.8456, y: -6.2088 }, // Jakarta coordinates
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    pickupTimeStart: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    pickupTimeEnd: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    status: "available" as const,
    notes: "Please bring your own containers. Ring the bell at the back entrance.",
    isRecurring: false,
    totalRequests: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    donorId: "donor-2", 
    title: "Freshly Baked Bread",
    description: "End of day bread from our bakery. Includes various types: white bread, whole grain, and croissants. All baked today and still fresh.",
    category: "ready_to_eat" as const,
    quantity: 20,
    unit: "pcs",
    images: [],
    locationPoint: { x: 106.8556, y: -6.2188 }, // Slightly different coordinates
    address: "Jl. Thamrin No. 456, Jakarta Pusat",
    pickupTimeStart: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    pickupTimeEnd: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    status: "available" as const,
    notes: "Available at the side door. Just knock and mention you're from FoodShare.",
    isRecurring: true,
    recurringDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    totalRequests: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    donorId: "donor-3",
    title: "Cooked Rice and Side Dishes",
    description: "Surplus food from our restaurant including steamed rice, vegetables, and some meat dishes. Food is still warm and ready to eat.",
    category: "ready_to_eat" as const,
    quantity: 15,
    unit: "porsi",
    images: [],
    locationPoint: { x: 106.8356, y: -6.1988 }, 
    address: "Jl. Rasuna Said No. 789, Jakarta Selatan",
    pickupTimeStart: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    pickupTimeEnd: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    status: "available" as const,
    notes: "Food containers will be provided. Please come to the main entrance.",
    isRecurring: false,
    totalRequests: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const dummyUsers = [
  {
    id: "donor-1",
    email: "restaurant@example.com",
    name: "Green Garden Restaurant",
    phone: "+62812345671",
    role: "donor" as const,
    userType: "restaurant" as const,
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    locationPoint: { x: 106.8456, y: -6.2088 },
    verificationStatus: "verified" as const,
    trustScore: "4.8",
    totalDonations: "25",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "donor-2",
    email: "bakery@example.com", 
    name: "Fresh Bread Bakery",
    phone: "+62812345672",
    role: "donor" as const,
    userType: "store" as const,
    address: "Jl. Thamrin No. 456, Jakarta Pusat",
    locationPoint: { x: 106.8556, y: -6.2188 },
    verificationStatus: "verified" as const,
    trustScore: "4.9",
    totalDonations: "50",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "donor-3",
    email: "warung@example.com",
    name: "Bu Sari Warung",
    phone: "+62812345673", 
    role: "donor" as const,
    userType: "restaurant" as const,
    address: "Jl. Rasuna Said No. 789, Jakarta Selatan",
    locationPoint: { x: 106.8356, y: -6.1988 },
    verificationStatus: "verified" as const,
    trustScore: "4.7",
    totalDonations: "18",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Function to insert dummy data (for development/testing only)
export async function insertDummyData() {
  try {
    // Insert dummy users first
    for (const user of dummyUsers) {
      await db.insert(users).values(user).onConflictDoNothing();
    }

    // Insert dummy donations
    for (const donation of dummyDonations) {
      await db.insert(donations).values(donation).onConflictDoNothing();
    }

    console.log("Dummy data inserted successfully");
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  }
}
