import { pgTable, text, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { donations } from "./donations";

export const requestStatusEnum = ["pending", "approved", "rejected", "completed", "cancelled"] as const;

export const requests = pgTable("requests", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    donationId: text("donation_id").notNull().references(() => donations.id, { onDelete: "cascade" }),
    receiverId: text("receiver_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    status: text("status", { enum: requestStatusEnum }).default("pending").notNull(),
    message: text("message"), // Optional message from receiver
    estimatedPickupTime: timestamp("estimated_pickup_time").notNull(),
    actualPickupTime: timestamp("actual_pickup_time"),
    qrCode: varchar("qr_code", { length: 255 }),
    priority: integer("priority").default(0), // Higher number = higher priority
    rejectionReason: text("rejection_reason"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Request = typeof requests.$inferSelect;
export type NewRequest = typeof requests.$inferInsert;
