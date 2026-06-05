"use client";

import { useEffect, useRef, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Circle,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed } from "lucide-react";

// Fix default marker issue in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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
    onLocateMe: (coords: [number, number]) => void;
}
// Custom hook helper to fly to active center smoothly
function MapViewHandler({
    activeCenter,
}: {
    activeCenter: [number, number] | null;
}) {
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

function getGeolocationErrorMessage(error: GeolocationPositionError) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("Location access was denied. Please enable location permission.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Your current location could not be determined.");
            break;
        case error.TIMEOUT:
            console.log("Location request timed out. Please try again.");
            break;
        default:
            console.log("Something went wrong while fetching your location.");
            break;
    }
}

function LocateMeControl({
    onLocateMe,
    onUserPositionFound,
}: {
    onLocateMe: (coords: [number, number]) => void;
    onUserPositionFound: (coords: [number, number]) => void;
}) {
    const handleLocateClick = () => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const coords: [number, number] = [latitude, longitude];

                onUserPositionFound(coords);
                onLocateMe(coords);
            },
            (error) => {
                getGeolocationErrorMessage(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    return (
        <div className="leaflet-bottom leaflet-right z-[1000]">
            <div className="m-4 pointer-events-auto">
                <button
                    type="button"
                    onClick={handleLocateClick}
                    aria-label="Locate me"
                    title="Locate me"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-[0_4px_14px_rgba(0,0,0,0.16)] ring-1 ring-slate-200 transition hover:bg-emerald-50 active:scale-[0.98]"
                >
                    <LocateFixed className="h-5 w-5" strokeWidth={2.2} />
                </button>
            </div>
        </div>
    );
}

const userLocationIcon = L.divIcon({
    className: "user-location-marker",
    html: `
        <div style="
            width: 18px;
            height: 18px;
            background: #dc2626;
            border: 3px solid white;
            border-radius: 9999px;
            box-shadow: 0 0 0 6px rgba(220, 38, 38, 0.22);
        "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

export default function MapView({
    shops,
    activeCenter,
    activeShopId,
    onMarkerClick,
    onLocateMe,
}: MapViewProps) {
    const markerRefs = useRef<{ [key: number]: L.Marker | null }>({});
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (activeShopId && markerRefs.current[activeShopId]) {
            const timer = setTimeout(() => {
                markerRefs.current[activeShopId]?.openPopup();
            }, 350);

            return () => clearTimeout(timer);
        }
    }, [activeShopId]);

    return (
        <div className="relative h-screen w-full">
            <MapContainer
                center={[9.9312, 76.2673]}
                zoom={10}
                scrollWheelZoom={true}
                className="pt-[72px] h-screen w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapViewHandler activeCenter={activeCenter} />

                <LocateMeControl
                    onLocateMe={onLocateMe}
                    onUserPositionFound={setUserPosition}
                />

                {userPosition && (
                    <>
                        <Marker position={userPosition} icon={userLocationIcon}>
                            <Popup>You are here</Popup>
                        </Marker>

                        <Circle
                            center={userPosition}
                            radius={120}
                            pathOptions={{
                                color: "#dc2626",
                                fillColor: "#dc2626",
                                fillOpacity: 0.15,
                                weight: 2,
                            }}
                        />
                    </>
                )}

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
        </div>
    );
}