"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";

// Fix leaflet icons
import "leaflet/dist/leaflet.css";

interface Location {
  lat: number;
  lng: number;
}

interface Donation {
  id: string;
  title: string;
  address: string;
  category: string;
  quantity: number;
  unit: string;
  location: Location;
  donor: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  expiresAt?: string;
}

interface MapComponentProps {
  userLocation: Location | null;
  donations: Donation[];
  onRequestDonation?: (donationId: string) => void;
}

// Custom icons
const donationIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" fill="#16a34a" stroke="#ffffff" stroke-width="2"/>
      <path d="M16 8l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="#ffffff"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const userIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

function MapController({ center }: { center: LatLngExpression }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
}

export default function MapComponent({ userLocation, donations, onRequestDonation }: MapComponentProps) {
  const defaultCenter: LatLngExpression = userLocation ? [userLocation.lat, userLocation.lng] : [-6.2088, 106.8456]; // Jakarta
  
  console.log('MapComponent - Received donations:', donations.length);
  console.log('MapComponent - Donations data:', donations);
  console.log('MapComponent - User location:', userLocation);
  
  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      className="rounded-lg"
    >
      <MapController center={defaultCenter} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* User location marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div className="text-center">
              <strong>Your Location</strong>
            </div>
          </Popup>
        </Marker>
      )}
      
      {/* Donation markers */}
      {donations.map((donation) => (
        <Marker
          key={donation.id}
          position={[donation.location.lat, donation.location.lng]}
          icon={donationIcon}
        >
          <Popup maxWidth={300}>
            <div className="p-2">
              <h3 className="font-semibold text-sm mb-1">{donation.title}</h3>
              <p className="text-xs text-content-secondary mb-2">{donation.address}</p>
              <div className="space-y-1 text-xs">
                <div>Category: <span className="font-medium">{donation.category}</span></div>
                <div>Quantity: <span className="font-medium">{donation.quantity} {donation.unit}</span></div>
                <div>By: <span className="font-medium">{donation.donor.name}</span></div>
              </div>
              {onRequestDonation && (
                <button
                  onClick={() => onRequestDonation(donation.id)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 w-full"
                >
                  Request This Donation
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
