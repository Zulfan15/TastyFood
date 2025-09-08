import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { donations } from "@/db/schema/donations";
import { users } from "@/db/schema/users";
import { createDonationSchema, searchDonationsSchema } from "@/lib/validations";
import { calculateDistance } from "@/lib/helpers";
import { eq, and, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const donorId = searchParams.get("donorId");
    const status = searchParams.get("status");

    if (donorId) {
      // Get donations by donor
      const donorDonations = await db
        .select({
          id: donations.id,
          title: donations.title,
          description: donations.description,
          category: donations.category,
          quantity: donations.quantity,
          unit: donations.unit,
          images: donations.images,
          address: donations.address,
          pickupTimeStart: donations.pickupTimeStart,
          pickupTimeEnd: donations.pickupTimeEnd,
          expiryTime: donations.expiryTime,
          status: donations.status,
          notes: donations.notes,
          totalRequests: donations.totalRequests,
          createdAt: donations.createdAt,
          donor: {
            id: users.id,
            name: users.name,
            avatar: users.avatar,
            trustScore: users.trustScore,
          }
        })
        .from(donations)
        .leftJoin(users, eq(donations.donorId, users.id))
        .where(
          and(
            eq(donations.donorId, donorId),
            status ? eq(donations.status, status as typeof donations.status.enumValues[number]) : undefined
          )
        )
        .orderBy(sql`${donations.createdAt} DESC`);

      return NextResponse.json(donorDonations);
    }

    if (latitude && longitude) {
      // Search donations by location
      const searchParams = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: 5,
        limit: 20,
        offset: 0,
      };

      const validatedSearch = searchDonationsSchema.parse(searchParams);

      const nearbyDonations = await db
        .select({
          id: donations.id,
          title: donations.title,
          description: donations.description,
          category: donations.category,
          quantity: donations.quantity,
          unit: donations.unit,
          images: donations.images,
          address: donations.address,
          pickupTimeStart: donations.pickupTimeStart,
          pickupTimeEnd: donations.pickupTimeEnd,
          expiryTime: donations.expiryTime,
          status: donations.status,
          notes: donations.notes,
          locationPoint: donations.locationPoint,
          createdAt: donations.createdAt,
          donor: {
            id: users.id,
            name: users.name,
            avatar: users.avatar,
            trustScore: users.trustScore,
          }
        })
        .from(donations)
        .leftJoin(users, eq(donations.donorId, users.id))
        .where(eq(donations.status, "available"))
        .orderBy(sql`${donations.createdAt} DESC`)
        .limit(validatedSearch.limit)
        .offset(validatedSearch.offset);

      // Filter by distance (this would be better done in the database with PostGIS)
      const filtered = nearbyDonations.filter((donation) => {
        if (!donation.locationPoint) return false;
        
        // Parse point format "(x, y)" to get coordinates
        const pointStr = donation.locationPoint.toString();
        const coords = pointStr.replace(/[()]/g, '').split(',');
        const donationLng = parseFloat(coords[0]);
        const donationLat = parseFloat(coords[1]);
        
        const distance = calculateDistance(
          validatedSearch.latitude,
          validatedSearch.longitude,
          donationLat,
          donationLng
        );
        
        return distance <= validatedSearch.radius;
      });

      return NextResponse.json(filtered);
    }

    // Get all donations
    const allDonations = await db
      .select({
        id: donations.id,
        title: donations.title,
        description: donations.description,
        category: donations.category,
        quantity: donations.quantity,
        unit: donations.unit,
        images: donations.images,
        address: donations.address,
        pickupTimeStart: donations.pickupTimeStart,
        pickupTimeEnd: donations.pickupTimeEnd,
        expiryTime: donations.expiryTime,
        status: donations.status,
        notes: donations.notes,
        totalRequests: donations.totalRequests,
        createdAt: donations.createdAt,
        donor: {
          id: users.id,
          name: users.name,
          avatar: users.avatar,
          trustScore: users.trustScore,
        }
      })
      .from(donations)
      .leftJoin(users, eq(donations.donorId, users.id))
      .orderBy(sql`${donations.createdAt} DESC`);

    return NextResponse.json(allDonations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createDonationSchema.parse(body);

    // Get donor ID from session/auth (placeholder for now)
    const donorId = request.headers.get("x-user-id") || "placeholder-donor-id";

    const newDonation = await db.insert(donations).values({
      donorId,
      title: validatedData.title,
      description: validatedData.description,
      category: validatedData.category,
      quantity: validatedData.quantity,
      unit: validatedData.unit,
      images: validatedData.images,
      locationPoint: { x: validatedData.longitude, y: validatedData.latitude },
      address: validatedData.address,
      pickupTimeStart: new Date(validatedData.pickupTimeStart),
      pickupTimeEnd: new Date(validatedData.pickupTimeEnd),
      expiryTime: new Date(validatedData.expiryTime),
      notes: validatedData.notes,
      isRecurring: validatedData.isRecurring || false,
      recurringDays: validatedData.recurringDays,
    }).returning();

    return NextResponse.json(newDonation[0], { status: 201 });
  } catch (error) {
    console.error("Error creating donation:", error);
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}
