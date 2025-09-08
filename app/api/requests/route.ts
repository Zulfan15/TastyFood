import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { requests } from "@/db/schema/requests";
import { donations } from "@/db/schema/donations";
import { users } from "@/db/schema/users";
import { createRequestSchema, updateRequestSchema } from "@/lib/validations";
import { calculatePriority, generateQRCode } from "@/lib/helpers";
import { eq, and, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const donationId = searchParams.get("donationId");
    const receiverId = searchParams.get("receiverId");
    const status = searchParams.get("status");

    let whereConditions = [];
    
    if (donationId) whereConditions.push(eq(requests.donationId, donationId));
    if (receiverId) whereConditions.push(eq(requests.receiverId, receiverId));
    if (status) whereConditions.push(eq(requests.status, status as any));

    const requestsData = await db
      .select({
        id: requests.id,
        donationId: requests.donationId,
        receiverId: requests.receiverId,
        status: requests.status,
        message: requests.message,
        estimatedPickupTime: requests.estimatedPickupTime,
        actualPickupTime: requests.actualPickupTime,
        qrCode: requests.qrCode,
        priority: requests.priority,
        rejectionReason: requests.rejectionReason,
        createdAt: requests.createdAt,
        donation: {
          id: donations.id,
          title: donations.title,
          address: donations.address,
          category: donations.category,
          quantity: donations.quantity,
          unit: donations.unit,
        },
        receiver: {
          id: users.id,
          name: users.name,
          avatar: users.avatar,
          trustScore: users.trustScore,
        }
      })
      .from(requests)
      .leftJoin(donations, eq(requests.donationId, donations.id))
      .leftJoin(users, eq(requests.receiverId, users.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(sql`${requests.priority} DESC, ${requests.createdAt} ASC`);

    return NextResponse.json(requestsData);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createRequestSchema.parse(body);

    // Get receiver ID from session/auth (placeholder for now)
    const receiverId = request.headers.get("x-user-id") || "placeholder-receiver-id";

    // Get receiver info for priority calculation
    const receiver = await db.select().from(users).where(eq(users.id, receiverId)).limit(1);
    if (!receiver[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get donation info
    const donation = await db.select().from(donations).where(eq(donations.id, validatedData.donationId)).limit(1);
    if (!donation[0]) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }

    if (donation[0].status !== "available") {
      return NextResponse.json({ error: "Donation is not available" }, { status: 400 });
    }

    // Calculate priority score
    const priority = calculatePriority(
      2.5, // placeholder distance
      parseFloat(receiver[0].trustScore || "0"),
      new Date()
    );

    const newRequest = await db.insert(requests).values({
      donationId: validatedData.donationId,
      receiverId,
      message: validatedData.message,
      estimatedPickupTime: new Date(validatedData.estimatedPickupTime),
      priority,
    }).returning();

    // Update donation request count
    await db
      .update(donations)
      .set({ 
        totalRequests: sql`${donations.totalRequests} + 1`,
        status: "requested"
      })
      .where(eq(donations.id, validatedData.donationId));

    return NextResponse.json(newRequest[0], { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}
