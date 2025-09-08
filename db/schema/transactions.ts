import { pgTable, text, timestamp, varchar, decimal } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { donations } from "./donations";
import { requests } from "./requests";

export const transactions = pgTable("transactions", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    donationId: text("donation_id").notNull().references(() => donations.id, { onDelete: "cascade" }),
    requestId: text("request_id").notNull().references(() => requests.id, { onDelete: "cascade" }),
    donorId: text("donor_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    receiverId: text("receiver_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    qrCode: varchar("qr_code", { length: 255 }).notNull().unique(),
    digitalReceipt: text("digital_receipt"),
    completedAt: timestamp("completed_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    transactionId: text("transaction_id").notNull().references(() => transactions.id, { onDelete: "cascade" }),
    reviewerId: text("reviewer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    revieweeId: text("reviewee_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    rating: decimal("rating", { precision: 2, scale: 1 }).notNull(), // 1.0 to 5.0
    comment: text("comment"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
