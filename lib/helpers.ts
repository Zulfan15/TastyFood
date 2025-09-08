/**
 * Calculate distance between two points using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

/**
 * Generate QR code string for transaction
 * @param transactionId Transaction ID
 * @returns QR code string
 */
export function generateQRCode(transactionId: string): string {
  const timestamp = Date.now();
  return `FOODSHARE_${transactionId}_${timestamp}`;
}

/**
 * Calculate priority score for donation requests
 * @param distance Distance in km
 * @param userTrustScore User's trust score (0-5)
 * @param requestTime Time when request was made
 * @returns Priority score (higher = better priority)
 */
export function calculatePriority(
  distance: number,
  userTrustScore: number,
  requestTime: Date
): number {
  const maxDistance = 5; // 5km radius
  const distanceScore = Math.max(0, (maxDistance - distance) / maxDistance * 40); // 0-40 points
  const trustScore = userTrustScore * 10; // 0-50 points
  const timeScore = Math.max(0, 10 - ((Date.now() - requestTime.getTime()) / (1000 * 60 * 60))); // 0-10 points, decreases over time
  
  return Math.round(distanceScore + trustScore + timeScore);
}

/**
 * Check if pickup time is valid (not in the past and within reasonable future)
 * @param pickupTime Pickup time to validate
 * @returns boolean
 */
export function isValidPickupTime(pickupTime: Date): boolean {
  const now = new Date();
  const maxFuture = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  
  return pickupTime > now && pickupTime <= maxFuture;
}

/**
 * Format distance for display
 * @param distance Distance in kilometers
 * @returns Formatted distance string
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

/**
 * Generate notification title and message
 * @param type Notification type
 * @param data Additional data for the notification
 * @returns Object with title and message
 */
export function generateNotificationContent(
  type: string,
  data: Record<string, unknown>
): { title: string; message: string } {
  switch (type) {
    case "donation_request":
      return {
        title: "New Donation Request",
        message: `${data.receiverName} wants to pick up your donation: ${data.donationTitle}`,
      };
    case "request_approved":
      return {
        title: "Request Approved",
        message: `Your request for "${data.donationTitle}" has been approved. Please pick up before ${data.pickupTime}.`,
      };
    case "request_rejected":
      return {
        title: "Request Rejected",
        message: `Your request for "${data.donationTitle}" was rejected. ${data.reason || ""}`,
      };
    case "pickup_reminder":
      return {
        title: "Pickup Reminder",
        message: `Don't forget to pick up "${data.donationTitle}" before ${data.expiryTime}.`,
      };
    case "donation_completed":
      return {
        title: "Donation Completed",
        message: `Your donation "${data.donationTitle}" has been successfully picked up.`,
      };
    case "review_received":
      return {
        title: "New Review",
        message: `You received a ${data.rating}-star review from ${data.reviewerName}.`,
      };
    default:
      return {
        title: "Notification",
        message: data.message || "You have a new notification.",
      };
  }
}
