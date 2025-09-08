import { pgTable, text, timestamp, boolean, varchar, decimal, point } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const userRoleEnum = ["donor", "receiver", "admin"] as const;
export const userTypeEnum = ["individual", "restaurant", "store"] as const;
export const verificationStatusEnum = ["pending", "verified", "rejected"] as const;

export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    phone: varchar("phone", { length: 20 }),
    role: text("role", { enum: userRoleEnum }).notNull().default("receiver"),
    userType: text("user_type", { enum: userTypeEnum }).default("individual"),
    avatar: text("avatar"),
    address: text("address"),
    locationPoint: point("location_point", { mode: 'xy' }),
    idCardNumber: varchar("id_card_number", { length: 20 }),
    idCardImage: text("id_card_image"),
    businessLicense: text("business_license"),
    verificationStatus: text("verification_status", { enum: verificationStatusEnum }).default("pending"),
    verifiedAt: timestamp("verified_at"),
    trustScore: decimal("trust_score", { precision: 3, scale: 2 }).default("0.00"),
    totalDonations: decimal("total_donations").default("0"),
    totalReceived: decimal("total_received").default("0"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
