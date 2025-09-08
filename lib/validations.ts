import { z } from "zod";

// User schemas
export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  phone: z.string().optional(),
  role: z.enum(["donor", "receiver", "admin"]),
  userType: z.enum(["individual", "restaurant", "store"]).optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  idCardNumber: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();

// Donation schemas
export const createDonationSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(10).max(1000),
  category: z.enum(["ready_to_eat", "raw_ingredients", "beverages", "snacks", "desserts", "vegetables", "fruits", "others"]),
  quantity: z.number().min(1),
  unit: z.string().min(1).max(20),
  images: z.array(z.string()).max(5),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().min(10).max(500),
  pickupTimeStart: z.string().datetime(),
  pickupTimeEnd: z.string().datetime(),
  expiryTime: z.string().datetime(),
  notes: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringDays: z.array(z.string()).optional(),
});

export const updateDonationSchema = createDonationSchema.partial();

// Request schemas
export const createRequestSchema = z.object({
  donationId: z.string(),
  message: z.string().optional(),
  estimatedPickupTime: z.string().datetime(),
});

export const updateRequestSchema = z.object({
  status: z.enum(["pending", "approved", "rejected", "completed", "cancelled"]),
  rejectionReason: z.string().optional(),
  actualPickupTime: z.string().datetime().optional(),
});

// Review schemas
export const createReviewSchema = z.object({
  transactionId: z.string(),
  revieweeId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

// Search schemas
export const searchDonationsSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  radius: z.number().default(5), // km
  category: z.string().optional(),
  search: z.string().optional(),
  limit: z.number().default(20),
  offset: z.number().default(0),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateDonationInput = z.infer<typeof createDonationSchema>;
export type UpdateDonationInput = z.infer<typeof updateDonationSchema>;
export type CreateRequestInput = z.infer<typeof createRequestSchema>;
export type UpdateRequestInput = z.infer<typeof updateRequestSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type SearchDonationsInput = z.infer<typeof searchDonationsSchema>;
