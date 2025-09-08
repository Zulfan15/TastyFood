import { pgTable, text, timestamp, boolean, varchar, point, integer } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";

export const donationStatusEnum = ["available", "requested", "completed", "expired", "cancelled"] as const;
export const foodCategoryEnum = ["ready_to_eat", "raw_ingredients", "beverages", "snacks", "desserts", "vegetables", "fruits", "others"] as const;

export const donations = pgTable("donations", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    donorId: text("donor_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    category: text("category", { enum: foodCategoryEnum }).notNull(),
    quantity: integer("quantity").notNull(),
    unit: varchar("unit", { length: 20 }).notNull(), // porsi, kg, pcs, etc
    images: text("images").array(), // Array of image URLs
    locationPoint: point("location_point", { mode: 'xy' }).notNull(),
    address: text("address").notNull(),
    pickupTimeStart: timestamp("pickup_time_start").notNull(),
    pickupTimeEnd: timestamp("pickup_time_end").notNull(),
    expiryTime: timestamp("expiry_time").notNull(),
    status: text("status", { enum: donationStatusEnum }).default("available").notNull(),
    notes: text("notes"), // Additional pickup instructions
    isRecurring: boolean("is_recurring").default(false),
    recurringDays: text("recurring_days").array(), // ["monday", "tuesday", etc]
    totalRequests: integer("total_requests").default(0),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Donation = typeof donations.$inferSelect;
export type NewDonation = typeof donations.$inferInsert;
