import { pgTable, text, timestamp, boolean, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import { donations } from "./donations";

export const notificationTypeEnum = ["donation_request", "request_approved", "request_rejected", "pickup_reminder", "donation_completed", "review_received", "system"] as const;

export const notifications = pgTable("notifications", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type", { enum: notificationTypeEnum }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    data: text("data"), // JSON string for additional data
    isRead: boolean("is_read").default(false),
    sentAt: timestamp("sent_at").defaultNow().notNull(),
    readAt: timestamp("read_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reports = pgTable("reports", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    reporterId: text("reporter_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    reportedUserId: text("reported_user_id").references(() => users.id, { onDelete: "cascade" }),
    reportedDonationId: text("reported_donation_id").references(() => donations.id, { onDelete: "cascade" }),
    reason: varchar("reason", { length: 100 }).notNull(),
    description: text("description").notNull(),
    status: varchar("status", { length: 20 }).default("pending"), // pending, investigating, resolved
    resolvedAt: timestamp("resolved_at"),
    resolvedBy: text("resolved_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
