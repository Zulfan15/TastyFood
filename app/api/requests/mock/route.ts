import { NextRequest, NextResponse } from "next/server";

// Mock data for testing
const mockRequests = [
  {
    id: "req-001",
    donationId: "donation-001",
    receiverId: "demo-receiver-id",
    donorId: "donor-001",
    status: "pending",
    estimatedPickupTime: "2024-01-15T10:00:00Z",
    actualPickupTime: null,
    message: "Saya sangat membutuhkan makanan ini untuk keluarga",
    priority: "medium",
    qrCode: "QR123456789",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
    // Receiver info
    receiver: {
      id: "demo-receiver-id",
      name: "John Doe",
      email: "receiver@foodshare.demo",
      phone: "+62812345678",
      trustScore: 4.5
    }
  },
  {
    id: "req-002",
    donationId: "donation-002",
    receiverId: "demo-receiver-id-2",
    donorId: "donor-002",
    status: "approved",
    estimatedPickupTime: "2024-01-15T14:00:00Z",
    actualPickupTime: null,
    message: "Terima kasih sudah mau berbagi",
    priority: "high",
    qrCode: "QR987654321",
    createdAt: "2024-01-14T15:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    receiver: {
      id: "demo-receiver-id-2",
      name: "Sarah Johnson",
      email: "sarah@foodshare.demo",
      phone: "+62823456789",
      trustScore: 4.8
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const donationId = url.searchParams.get("donationId");
    const receiverId = url.searchParams.get("receiverId");
    const status = url.searchParams.get("status");

    let filteredRequests = [...mockRequests];

    // Filter by donationId
    if (donationId) {
      filteredRequests = filteredRequests.filter(req => req.donationId === donationId);
    }

    // Filter by receiverId  
    if (receiverId) {
      filteredRequests = filteredRequests.filter(req => req.receiverId === receiverId);
    }

    // Filter by status
    if (status) {
      filteredRequests = filteredRequests.filter(req => req.status === status);
    }

    return NextResponse.json({
      success: true,
      data: filteredRequests,
      total: filteredRequests.length
    });

  } catch (error) {
    console.error("Error fetching mock requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donationId, estimatedPickupTime, message } = body;

    // Validate required fields
    if (!donationId || !estimatedPickupTime) {
      return NextResponse.json(
        { error: "Missing required fields: donationId and estimatedPickupTime" },
        { status: 400 }
      );
    }

    // Create new mock request
    const newRequest = {
      id: `req-${Date.now()}`,
      donationId,
      receiverId: "demo-receiver-id",
      donorId: "donor-demo",
      status: "pending",
      estimatedPickupTime,
      actualPickupTime: null,
      message: message || "",
      priority: "medium",
      qrCode: `QR${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      receiver: {
        id: "demo-receiver-id",
        name: "Demo User",
        email: "demo@foodshare.demo",
        phone: "+6281234567890",
        trustScore: 4.5
      }
    };

    // Add to mock array (in real app, this would save to database)
    mockRequests.push(newRequest);

    return NextResponse.json({
      success: true,
      data: newRequest,
      message: "Request created successfully"
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating mock request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 }
    );
  }
}
