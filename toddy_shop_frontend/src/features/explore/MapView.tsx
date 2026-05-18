"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Shop {
  id: number;
  name: string;
  locationName: string;
  position: [number, number];
  description: string;
  rating: number;
  specialty: string;
}

interface MapViewProps {
  shops: Shop[];
  activeCenter: [number, number] | null;
  activeShopId: number | null;
  onMarkerClick: (shopId: number) => void;
}

// Custom hook helper to fly to active center smoothly
function MapViewHandler({ activeCenter }: { activeCenter: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (activeCenter) {
      map.flyTo(activeCenter, 14, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [activeCenter, map]);

  return null;
}

export default function MapView({
  shops,
  activeCenter,
  activeShopId,
  onMarkerClick,
}: MapViewProps) {
  const markerRefs = useRef<{ [key: number]: L.Marker | null }>({});

  useEffect(() => {
    if (activeShopId && markerRefs.current[activeShopId]) {
      // Short delay to allow map to fly or complete layout rendering
      const timer = setTimeout(() => {
        markerRefs.current[activeShopId]?.openPopup();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [activeShopId]);

  return (
    <MapContainer
      center={[9.9312, 76.2673]}
      zoom={10}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapViewHandler activeCenter={activeCenter} />

      {shops.map((shop) => (
        <Marker
          key={shop.id}
          position={shop.position}
          ref={(el) => {
            markerRefs.current[shop.id] = el;
          }}
          eventHandlers={{
            click: () => {
              onMarkerClick(shop.id);
            },
          }}
        >
          <Popup className="custom-popup">
            <div className="p-1 max-w-[220px]">
              <h3 className="font-bold text-sm text-[#003e1c] font-heading leading-tight">
                {shop.name}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                📍 {shop.locationName}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-snug">
                {shop.description}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                  {shop.specialty}
                </span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-0.5">
                  ★ {shop.rating}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}