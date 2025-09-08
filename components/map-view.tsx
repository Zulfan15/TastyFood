"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import untuk seluruh MapComponent
const DynamicMap = dynamic(() => import("./map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-gray-100 animate-pulse rounded flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

interface Donation {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  images: string[];
  address: string;
  pickupTimeStart: string;
  pickupTimeEnd: string;
  expiryTime: string;
  status: string;
  locationPoint: string;
  donor: {
    id: string;
    name: string;
    avatar?: string;
    trustScore: string;
  };
  createdAt: string;
}

interface MapViewProps {
  userLocation: { lat: number; lng: number } | null;
  donations: Donation[];
  onDonationSelect: (donation: Donation) => void;
  onRequestDonation: (donationId: string) => void;
}

export function MapView({ userLocation, donations, onDonationSelect, onRequestDonation }: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  // Transform donations untuk map component
  const transformedDonations = donations.map(donation => {
    if (!donation.locationPoint) return null;
    
    try {
      const pointStr = donation.locationPoint.toString();
      const coords = pointStr.replace(/[()]/g, '').split(',');
      const lng = parseFloat(coords[0].trim());
      const lat = parseFloat(coords[1].trim());

      console.log('Parsing donation location:', donation.title, { lng, lat, original: pointStr });

      if (isNaN(lng) || isNaN(lat)) {
        console.warn('Invalid coordinates for donation:', donation.title);
        return null;
      }

      return {
        id: donation.id,
        title: donation.title,
        address: donation.address,
        category: donation.category,
        quantity: donation.quantity,
        unit: donation.unit,
        location: { lat, lng },
        donor: {
          name: donation.donor.name,
          avatar: donation.donor.avatar,
        },
        createdAt: donation.createdAt,
        expiresAt: donation.expiryTime,
      };
    } catch (error) {
      console.error("Error parsing location for donation:", donation.title, error);
      return null;
    }
  }).filter((donation): donation is NonNullable<typeof donation> => donation !== null);

  console.log('Transformed donations for map:', transformedDonations.length);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border">
      <DynamicMap 
        userLocation={userLocation}
        donations={transformedDonations}
        onRequestDonation={onRequestDonation}
      />
    </div>
  );
}
