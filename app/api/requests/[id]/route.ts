import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { requests } from "@/db/schema/requests";
import { donations } from "@/db/schema/donations";
import { transactions } from "@/db/schema/transactions";
import { updateRequestSchema } from "@/lib/validations";
import { generateQRCode } from "@/lib/helpers";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requestData = await db
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
      })
      .from(requests)
      .where(eq(requests.id, params.id))
      .limit(1);

    if (!requestData[0]) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json(requestData[0]);
  } catch (error) {
    console.error("Error fetching request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateRequestSchema.parse(body);

    // Get current request
    const currentRequest = await db.select().from(requests).where(eq(requests.id, params.id)).limit(1);
    if (!currentRequest[0]) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    let updateData: any = {
      status: validatedData.status,
      updatedAt: new Date(),
    };

    if (validatedData.rejectionReason) {
      updateData.rejectionReason = validatedData.rejectionReason;
    }

    if (validatedData.actualPickupTime) {
      updateData.actualPickupTime = new Date(validatedData.actualPickupTime);
    }

    // If request is approved, generate QR code and create transaction
    if (validatedData.status === "approved") {
      const qrCode = generateQRCode(params.id);
      updateData.qrCode = qrCode;

      // Create transaction record
      await db.insert(transactions).values({
        donationId: currentRequest[0].donationId,
        requestId: params.id,
        donorId: "placeholder-donor-id", // Should get from donation
        receiverId: currentRequest[0].receiverId,
        qrCode,
        completedAt: new Date(),
      });

      // Update donation status
      await db
        .update(donations)
        .set({ status: "completed" })
        .where(eq(donations.id, currentRequest[0].donationId));
    }

    const updatedRequest = await db
      .update(requests)
      .set(updateData)
      .where(eq(requests.id, params.id))
      .returning();

    return NextResponse.json(updatedRequest[0]);
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedRequest = await db
      .delete(requests)
      .where(eq(requests.id, params.id))
      .returning();

    if (!deletedRequest[0]) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
