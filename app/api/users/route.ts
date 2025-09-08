import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { createUserSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (email) {
      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
      return NextResponse.json(user[0] || null);
    }

    if (id) {
      const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
      return NextResponse.json(user[0] || null);
    }

    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createUserSchema.parse(body);

    const locationPoint = validatedData.latitude && validatedData.longitude 
      ? `(${validatedData.longitude}, ${validatedData.latitude})` 
      : null;

    const newUser = await db.insert(users).values({
      email: validatedData.email,
      name: validatedData.name,
      phone: validatedData.phone,
      role: validatedData.role,
      userType: validatedData.userType,
      address: validatedData.address,
      locationPoint: validatedData.latitude && validatedData.longitude 
        ? { x: validatedData.longitude, y: validatedData.latitude } 
        : null,
      idCardNumber: validatedData.idCardNumber,
    }).returning();

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
}
