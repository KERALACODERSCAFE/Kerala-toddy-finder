"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
    Search,
    SlidersHorizontal,
    X,
    Star,
    MapPin,
    Sparkles,
    Share2,
    Heart,
    Clock,
    Phone,
    Globe,
    FileText,
    DollarSign,
    Car,
    Users,
    Accessibility,
    Wind,
    Baby,
    ShowerHead,
    Wifi,
} from "lucide-react";
import Image from "next/image";

// Rich data representing toddy shops
const initialToddyShops = [
    {
        id: 1,
        name: "Mullapanthal Toddy Shop",
        malayalamName: "മുള്ളപ്പന്തൽ കള്ള് ഷാപ്പ്",
        locationName: "Tripunithura, Kochi",
        position: [9.9351, 76.3533] as [number, number],
        description:
            "Famous for its spicy duck curry, beef roast, and pure coconut toddy under the palms.",
        rating: 4.7,
        reviewsCount: 1240,
        specialty: "Duck & Beef",
        image: "https://flyriatravel.com/wp-content/flyria/images/alp-img-2.jpg",
        tsNumber: "4001",
        priceRange: "Moderate",
        hours: "08:00 AM - 08:00 PM",
        phone: "+91 9988 776 655",
        website: "mullapanthalthoddy.com",
        amenities: [
            "Air Conditioned",
            "Kids Friendly",
            "Clean Toilets",
            "Wi-Fi",
        ],
        accessibility: ["Parking", "Gender Neutral", "Wheel Chair Accessible"],
    },
    {
        id: 2,
        name: "Kadamakkudy Toddy Shop",
        malayalamName: "കടമക്കുടി കള്ള് ഷാപ്പ്",
        locationName: "Kadamakkudy Islands, Kochi",
        position: [10.0528, 76.2482] as [number, number],
        description:
            "Located amidst scenic backwaters. Perfect sunsets, fresh toddy, and delicious local food.",
        rating: 4.8,
        reviewsCount: 420,
        specialty: "Crab & Sweet Toddy",
        image: "https://flyriatravel.com/wp-content/flyria/images/alp-img-2.jpg",
        tsNumber: "4023",
        priceRange: "Budget-Friendly",
        hours: "09:00 AM - 09:00 PM",
        phone: "+91 9447 223 344",
        website: "kadamakkudytoddy.com",
        amenities: ["Kids Friendly", "Clean Toilets", "Wi-Fi"],
        accessibility: ["Parking", "Wheel Chair Accessible"],
    },
    {
        id: 3,
        name: "Nettoor Toddy Shop",
        malayalamName: "നെട്ടൂർ കള്ള് ഷാപ്പ്",
        locationName: "Nettoor, Ernakulam",
        position: [9.9248, 76.315] as [number, number],
        description:
            "Traditional lakeside toddy shop serving fiery local delicacies and fresh fish curries.",
        rating: 4.4,
        reviewsCount: 310,
        specialty: "Prawns & Seafood",
        image: "https://flyriatravel.com/wp-content/flyria/images/alp-img-2.jpg",
        tsNumber: "4115",
        priceRange: "Budget-Friendly",
        hours: "08:00 AM - 08:00 PM",
        phone: "+91 9495 112 233",
        website: "nettoortoddy.in",
        amenities: ["Kids Friendly", "Clean Toilets"],
        accessibility: ["Parking"],
    },
    {
        id: 4,
        name: "Karimpumkala Toddy Shop",
        malayalamName: "കരിമ്പുംകാല കള്ള് ഷാപ്പ്",
        locationName: "Pallom, Kottayam",
        position: [9.5524, 76.5412] as [number, number],
        description:
            "Legendary culinary spot since 1952. Outstanding food and premium toddy varieties.",
        rating: 4.9,
        reviewsCount: 2315,
        specialty: "Karimeen Pollichathu",
        image: "https://flyriatravel.com/wp-content/flyria/images/alp-img-2.jpg",
        tsNumber: "3050",
        priceRange: "Premium",
        hours: "08:00 AM - 10:00 PM",
        phone: "+91 481 243 0500",
        website: "karimpumkala.com",
        amenities: [
            "Air Conditioned",
            "Kids Friendly",
            "Clean Toilets",
            "Wi-Fi",
        ],
        accessibility: ["Parking", "Gender Neutral", "Wheel Chair Accessible"],
    },
    {
        id: 5,
        name: "Heritage",
        malayalamName: "ഹെറിറ്റേജ്",
        locationName: "Heritage Village, Alappuzha, 600000",
        position: [9.4981, 76.3388] as [number, number],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus, arcu at rhoncus ullamcorper, nulla dui enim, eu laoreet felis nisi ut dolor.",
        rating: 4.0,
        reviewsCount: 106,
        specialty: "Best Cuisine",
        image: "https://flyriatravel.com/wp-content/flyria/images/alp-img-2.jpg",
        tsNumber: "4001",
        priceRange: "Moderate",
        hours: "08:00 AM - 08:00 PM",
        phone: "+91 9988 776 655",
        website: "toddy.in",
        amenities: [
            "Air Conditioned",
            "Kids Friendly",
            "Clean Toilets",
            "Wi-Fi",
        ],
        accessibility: ["Parking", "Gender Neutral", "Wheel Chair Accessible"],
    },
];

const MapView = dynamic(() => import("@/features/explore/MapView"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full bg-[#fcf9f8] flex items-center justify-center dark:bg-slate-900">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-[#003e1c] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium tracking-wide animate-pulse">
                    Loading Toddy Shop Map...
                </p>
            </div>
        </div>
    ),
});

export default function ExploreClient() {
    const [toddyShops, setToddyShops] = useState(initialToddyShops);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeCenter, setActiveCenter] = useState<[number, number] | null>(
        null,
    );
    const [activeShopId, setActiveShopId] = useState<number | null>(5);

    const [isSearching, setIsSearching] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isFavorite, setIsFavorite] = useState(false);

    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );
    const [showFilters, setShowFilters] = useState(false);

    const filteredShops = toddyShops.filter((shop) => {
        const matchesSearch =
            shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.locationName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            shop.specialty.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRating = selectedRating
            ? shop.rating >= selectedRating
            : true;

        const matchesCategory = selectedCategory
            ? shop.specialty
                  .toLowerCase()
                  .includes(selectedCategory.toLowerCase()) ||
              shop.description
                  .toLowerCase()
                  .includes(selectedCategory.toLowerCase())
            : true;

        return matchesSearch && matchesRating && matchesCategory;
    });

    const suggestions = searchQuery
        ? toddyShops.filter(
              (shop) =>
                  (shop.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                      shop.locationName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())) &&
                  shop.name.toLowerCase() !== searchQuery.toLowerCase(),
          )
        : [];

    const handleSelectShop = (shop: (typeof toddyShops)[0]) => {
        setSearchQuery(shop.name);
        setActiveCenter(shop.position);
        setActiveShopId(shop.id);
        setShowSuggestions(false);
        setActiveTab("overview");
    };

    const handleSearchSubmit = async (queryText: string) => {
        if (!queryText) return;

        const matchedShop = toddyShops.find((shop) =>
            shop.name.toLowerCase().includes(queryText.toLowerCase()),
        );

        if (matchedShop) {
            handleSelectShop(matchedShop);
            return;
        }

        try {
            setIsSearching(true);

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    queryText + ", Kerala",
                )}&format=json&limit=1`,
            );

            const data = await response.json();

            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                const locationDisplayName = data[0].display_name;
                const placeName =
                    locationDisplayName.split(",")[0] || queryText;

                setActiveCenter([lat, lon]);

                const dynamicShopId = Date.now();

                const dynamicShop = {
                    id: dynamicShopId,
                    name: `${placeName} Palace Toddy Shop`,
                    malayalamName: `${placeName} കള്ള് ഷാപ്പ്`,
                    locationName: `${placeName}, Kerala, India`,
                    position: [lat, lon] as [number, number],
                    description: `Enjoy organic sweet toddy and local spicy delicacies freshly prepared in the heart of ${placeName}.`,
                    rating: 4.5,
                    reviewsCount: Math.floor(10 + Math.random() * 200),
                    specialty: "Local Specialties",
                    image: "https://flyriatravel.com/wp-content/flyria/images/alp-img-2.jpg",
                    tsNumber: String(Math.floor(1000 + Math.random() * 8999)),
                    priceRange: "Moderate",
                    hours: "09:00 AM - 09:00 PM",
                    phone:
                        "+91 9447 " +
                        Math.floor(100000 + Math.random() * 899999),
                    website: "toddyfinder.in",
                    amenities: ["Kids Friendly", "Clean Toilets", "Wi-Fi"],
                    accessibility: ["Parking", "Wheel Chair Accessible"],
                };

                setToddyShops((prev) => {
                    if (
                        prev.some(
                            (s) =>
                                Math.abs(s.position[0] - lat) < 0.001 &&
                                Math.abs(s.position[1] - lon) < 0.001,
                        )
                    ) {
                        return prev;
                    }

                    return [...prev, dynamicShop];
                });

                setTimeout(() => {
                    setActiveShopId(dynamicShopId);
                    setActiveTab("overview");
                }, 500);
            }
        } catch (err) {
            console.error("Geocoding failed:", err);
        } finally {
            setIsSearching(false);
            setShowSuggestions(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setActiveShopId(null);
        setActiveCenter(null);
        setShowSuggestions(false);
    };

    const selectedShop = toddyShops.find((s) => s.id === activeShopId);

    return (
        <div className="absolute inset-0 z-0">
            {/* MAP */}
            <MapView
                shops={filteredShops}
                activeCenter={activeCenter}
                activeShopId={activeShopId}
                onMarkerClick={(shopId) => {
                    setActiveShopId(shopId);

                    const shop = toddyShops.find((s) => s.id === shopId);

                    if (shop) {
                        setActiveCenter(shop.position);
                    }

                    setActiveTab("overview");
                }}
                onLocateMe={(coords: [number, number]) => {
                    setActiveCenter(coords);
                    setActiveShopId(null);
                }}
            />

            {/* FLOATING CONTROLS */}
            <div className="absolute max-w-[1440px] mx-auto inset-x-0 top-0 bottom-0 z-[1000] pointer-events-none p-4 flex flex-col gap-4 items-start justify-between">
                {/* SEARCH BAR */}
                <div className="absolute top-[96px] left-0 right-0 z-[1000] pointer-events-none">
                    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 flex justify-start">
                        <div className="bg-white/95 text-[#111111] rounded-lg p-[8px_8px] h-[56px] w-full sm:w-[500px] pointer-events-auto flex flex-row items-center shadow-lg">
                            <Search
                                className={`w-5 h-5 text-[#003e1c] shrink-0 ${
                                    isSearching ? "animate-pulse" : ""
                                }`}
                            />

                            <input
                                type="text"
                                placeholder={
                                    isSearching
                                        ? "Geocoding location..."
                                        : "Search district or toddy shops..."
                                }
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowSuggestions(true);

                                    setActiveShopId(null);
                                    setActiveCenter(null);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearchSubmit(searchQuery);
                                    }
                                }}
                                className="bg-transparent border-none outline-none flex-1 text-sm px-3 text-[#111111] placeholder-slate-400 w-full"
                            />

                            {searchQuery && (
                                <button
                                    onClick={handleClearSearch}
                                    className="p-1 mr-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-2.5 rounded-xl transition-all duration-200 shrink-0 flex items-center justify-center cursor-pointer ${
                                    showFilters
                                        ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20"
                                        : "bg-[#003e1c] hover:bg-[#002e14] text-white"
                                }`}
                                title="Filters"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* SUGGESTIONS */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 z-[2000] pointer-events-none">
                            <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 flex justify-start">
                                <div className="w-full sm:w-[500px] pointer-events-auto">
                                    <div className="bg-white/95 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-64 overflow-y-auto">
                                        {suggestions.map((shop) => (
                                            <button
                                                key={shop.id}
                                                onClick={() =>
                                                    handleSelectShop(shop)
                                                }
                                                className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center justify-between border-b border-slate-50 last:border-0"
                                            >
                                                <div className="flex items-start gap-2.5">
                                                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />

                                                    <div>
                                                        <p className="font-bold text-sm text-slate-800">
                                                            {shop.name}
                                                        </p>

                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            📍{" "}
                                                            {shop.locationName}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-0.5 shrink-0">
                                                    ★ {shop.rating}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* FILTER PANEL */}
                <div className="absolute top-[160px] left-4 flex-col gap-3 w-full md:w-[320px] pointer-events-auto shrink-0 z-[1001] hidden md:flex">
                    {(selectedRating || selectedCategory) && (
                        <div className="flex flex-wrap gap-2">
                            {selectedRating && (
                                <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                                    ★ {selectedRating}+ Rating
                                    <button
                                        onClick={() => setSelectedRating(null)}
                                    >
                                        <X className="w-3.5 h-3.5 hover:text-red-500" />
                                    </button>
                                </span>
                            )}

                            {selectedCategory && (
                                <span className="text-xs font-semibold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-100 flex items-center gap-1">
                                    🔥 {selectedCategory}
                                    <button
                                        onClick={() =>
                                            setSelectedCategory(null)
                                        }
                                    >
                                        <X className="w-3.5 h-3.5 hover:text-red-500" />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}

                    {showFilters && (
                        <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4 text-amber-600" />
                                    Filter Options
                                </h3>

                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-slate-500">
                                    Minimum Rating
                                </span>

                                <div className="flex gap-2">
                                    {[4.5, 4.7, 4.8].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() =>
                                                setSelectedRating(
                                                    selectedRating === rating
                                                        ? null
                                                        : rating,
                                                )
                                            }
                                            className={`flex-1 text-xs py-1.5 rounded-lg border transition-all font-bold ${
                                                selectedRating === rating
                                                    ? "bg-[#003e1c] border-[#003e1c] text-white"
                                                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                                            }`}
                                        >
                                            ★ {rating}+
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-slate-500">
                                    Specialty Category
                                </span>

                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Beef",
                                        "Duck",
                                        "Seafood",
                                        "Crab",
                                        "Sweet",
                                    ].map((category) => (
                                        <button
                                            key={category}
                                            onClick={() =>
                                                setSelectedCategory(
                                                    selectedCategory ===
                                                        category
                                                        ? null
                                                        : category,
                                                )
                                            }
                                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-semibold ${
                                                selectedCategory === category
                                                    ? "bg-[#003e1c] border-[#003e1c] text-white"
                                                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* BOTTOM DETAIL CARD */}

                {selectedShop && (
                    <div className="absolute left-0 right-0 top-[170px] bottom-4 z-[1002] pointer-events-none px-3 md:fixed md:top-auto md:bottom-4 md:px-4">
                        <div className="mx-auto w-full max-w-[1440px] h-full md:h-auto pointer-events-auto overflow-y-auto md:overflow-visible rounded-[18px]">
                            <div className=" grid grid-cols-1 gap-3 md:max-h-[380px] md:overflow-y-auto xl:grid-cols-[0.75fr_1fr] xl:max-h-none xl:overflow-visible ">
                                {/* LEFT CARD */}
                                <div className=" bg-white rounded-[18px] sm:rounded-[22px] shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-[48%_52%] md:min-h-[230px] xl:h-[270px]">
                                    {/* IMAGE */}
                                    <div className=" relative h-[180px] sm:h-[220px] md:h-full bg-slate-100 overflow-hidden">
                                        <Image
                                            src={selectedShop.image}
                                            alt={selectedShop.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 400px"
                                            className="object-cover"
                                        />

                                        <div className="absolute top-3 left-3 bg-black/55 text-white px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-white text-white" />
                                            <span>
                                                {selectedShop.rating.toFixed(1)}
                                            </span>
                                            <span className="text-white/75">
                                                ({selectedShop.reviewsCount})
                                            </span>
                                        </div>
                                    </div>

                                    {/* LEFT CONTENT */}
                                    <div className="p-4 sm:p-5 flex flex-col justify-between gap-3">
                                        <div>
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <h2 className="text-[26px] sm:text-[30px] md:text-[28px] font-semibold text-black leading-none truncate">
                                                        {selectedShop.name}
                                                    </h2>

                                                    <p className="text-[#006A4E] leading-[1.25] font-semibold text-[15px] mt-2">
                                                        {
                                                            selectedShop.malayalamName
                                                        }
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2 shrink-0">
                                                    <button
                                                        onClick={() => {}}
                                                        className="h-8 px-2.5 rounded-[8px] bg-[#F5FFFC] text-[#002F23] hover:bg-[#EAF8F2] transition-colors flex items-center gap-1 text-[11px] font-medium"
                                                        title="Share"
                                                    >
                                                        <Share2 className="w-3.5 h-3.5" />
                                                        <span className="hidden sm:inline">
                                                            Share
                                                        </span>
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            setIsFavorite(
                                                                !isFavorite,
                                                            )
                                                        }
                                                        className={`h-8 w-8 rounded-[8px] border flex items-center justify-center transition-all ${
                                                            isFavorite
                                                                ? "bg-red-50 border-red-200 text-[#FF2D55]"
                                                                : "bg-white border-red-100 text-[#FF2D55] hover:bg-red-50 hover:border-red-200"
                                                        }`}
                                                        title="Favorite"
                                                    >
                                                        <Heart
                                                            className={`w-4 h-4 transition-all ${
                                                                isFavorite
                                                                    ? "fill-[#FF2D55]"
                                                                    : "fill-none"
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-1.5 mt-3">
                                                <MapPin className="w-3.5 h-3.5 text-[#006A4E] shrink-0 mt-0.5" />

                                                <p className="text-[12px] text-[#666666] leading-snug line-clamp-1">
                                                    {selectedShop.locationName}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {[
                                                    "Family-Friendly",
                                                    "Dine-in",
                                                    "Best Cuisine",
                                                ].map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-[10px] font-medium text-[#002F23] bg-[#F5FFFC] px-2.5 py-1 rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-[12px] text-[#666666] mt-3 leading-normal line-clamp-3">
                                                {selectedShop.description}{" "}
                                                <span className="text-[#006A4E] font-semibold cursor-pointer">
                                                    Read More
                                                </span>
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-2">
                                            <button className="h-9 rounded-[8px] border-[1px] border-[#006A4E] text-[#006A4E] hover:bg-[#F5FFFC] transition-colors text-[11px] font-semibold">
                                                View Details
                                            </button>

                                            <button className="h-9 rounded-[8px] border-[1px] border-[#006A4E] text-[#006A4E] hover:bg-[#F5FFFC] transition-colors text-[11px] font-semibold">
                                                Write a review
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT CARD */}
                                <div className=" bg-white rounded-[18px] sm:rounded-[22px] shadow-2xl border border-slate-100 overflow-hidden xl:h-[270px]">
                                    {/* TABS */}
                                    <div className="flex items-center justify-between px-4 sm:px-5 border-b border-slate-100 h-11">
                                        <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar">
                                            {[
                                                "overview",
                                                "reviews",
                                                "recommended",
                                            ].map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() =>
                                                        setActiveTab(tab)
                                                    }
                                                    className={`h-11 whitespace-nowrap text-[12px] sm:text-[13px] font-semibold transition-all border-b-2 ${
                                                        activeTab === tab
                                                            ? "text-[#111111] border-[#006A4E]"
                                                            : "text-[#777777] border-transparent hover:text-[#111111]"
                                                    }`}
                                                >
                                                    {tab === "overview" &&
                                                        "Overview"}
                                                    {tab === "reviews" &&
                                                        "Review"}
                                                    {tab === "recommended" &&
                                                        "Recommended for you"}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() =>
                                                setActiveShopId(null)
                                            }
                                            className="ml-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 shrink-0"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* TAB CONTENT */}
                                    <div className="p-4 sm:p-5 xl:h-[225px] overflow-y-auto">
                                        {activeTab === "overview" && (
                                            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.75fr] gap-5 h-full">
                                                {/* INFO */}
                                                <div className="rounded-[14px] border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                                    <InfoItem
                                                        icon={
                                                            <MapPin className="w-4 h-4" />
                                                        }
                                                        label="Address"
                                                        value={
                                                            selectedShop.locationName
                                                        }
                                                    />

                                                    <InfoItem
                                                        icon={
                                                            <Clock className="w-4 h-4" />
                                                        }
                                                        label="Hours"
                                                        value={
                                                            selectedShop.hours
                                                        }
                                                        extra="Open Today"
                                                    />

                                                    <InfoItem
                                                        icon={
                                                            <FileText className="w-4 h-4" />
                                                        }
                                                        label="TS Number"
                                                        value={
                                                            selectedShop.tsNumber
                                                        }
                                                    />

                                                    <InfoItem
                                                        icon={
                                                            <Phone className="w-4 h-4" />
                                                        }
                                                        label="Phone"
                                                        value={
                                                            selectedShop.phone
                                                        }
                                                    />

                                                    <InfoItem
                                                        icon={
                                                            <DollarSign className="w-4 h-4" />
                                                        }
                                                        label="Price Range"
                                                        value={`(${selectedShop.priceRange})`}
                                                    />

                                                    <InfoItem
                                                        icon={
                                                            <Globe className="w-4 h-4" />
                                                        }
                                                        label="Website"
                                                        value={
                                                            selectedShop.website
                                                        }
                                                    />
                                                </div>

                                                {/* FEATURES */}
                                                <div className="lg:border-l lg:border-slate-200 lg:pl-5">
                                                    <div>
                                                        <h4 className="text-[11px] font-semibold text-[#777777] mb-3">
                                                            Accessibility
                                                        </h4>

                                                        <div className="grid grid-cols-3 gap-2">
                                                            {selectedShop.accessibility.map(
                                                                (item) => (
                                                                    <FeatureBox
                                                                        key={
                                                                            item
                                                                        }
                                                                        label={
                                                                            item
                                                                        }
                                                                        icon={
                                                                            item ===
                                                                            "Parking" ? (
                                                                                <Car className="w-4 h-4" />
                                                                            ) : item ===
                                                                              "Gender Neutral" ? (
                                                                                <Users className="w-4 h-4" />
                                                                            ) : (
                                                                                <Accessibility className="w-4 h-4" />
                                                                            )
                                                                        }
                                                                    />
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-4">
                                                        <h4 className="text-[11px] font-semibold text-[#777777] mb-3">
                                                            Amenities
                                                        </h4>

                                                        <div className="grid grid-cols-4 gap-2">
                                                            {selectedShop.amenities.map(
                                                                (item) => (
                                                                    <FeatureBox
                                                                        key={
                                                                            item
                                                                        }
                                                                        label={
                                                                            item
                                                                        }
                                                                        icon={
                                                                            item ===
                                                                            "Air Conditioned" ? (
                                                                                <Wind className="w-4 h-4" />
                                                                            ) : item ===
                                                                              "Kids Friendly" ? (
                                                                                <Baby className="w-4 h-4" />
                                                                            ) : item ===
                                                                              "Clean Toilets" ? (
                                                                                <ShowerHead className="w-4 h-4" />
                                                                            ) : (
                                                                                <Wifi className="w-4 h-4" />
                                                                            )
                                                                        }
                                                                    />
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "reviews" && (
                                            <div className="rounded-[14px] border border-slate-200 p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="font-semibold text-sm text-slate-800">
                                                        Customer Reviews
                                                    </h4>

                                                    <button className="text-xs font-semibold text-[#006A4E] hover:underline">
                                                        See All (
                                                        {
                                                            selectedShop.reviewsCount
                                                        }
                                                        )
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <ReviewCard
                                                        name="Raju V."
                                                        rating="5.0"
                                                        text="Outstanding fresh sweet toddy and fiery duck roast. Truly authentic Kerala vibe."
                                                    />

                                                    <ReviewCard
                                                        name="Anjali Nair"
                                                        rating="4.0"
                                                        text="Excellent backwater surroundings and family friendly atmosphere."
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "recommended" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {toddyShops
                                                    .filter(
                                                        (s) =>
                                                            s.id !==
                                                            selectedShop.id,
                                                    )
                                                    .slice(0, 2)
                                                    .map((shop) => (
                                                        <div
                                                            key={shop.id}
                                                            onClick={() =>
                                                                handleSelectShop(
                                                                    shop,
                                                                )
                                                            }
                                                            className="border border-slate-100 rounded-[14px] p-3 flex gap-3 cursor-pointer hover:shadow-md transition-all"
                                                        >
                                                            <Image
                                                                src={shop.image}
                                                                alt={shop.name}
                                                                className="w-16 h-16 rounded-xl object-cover"
                                                            />

                                                            <div className="flex-1 min-w-0">
                                                                <h5 className="font-semibold text-sm text-slate-900 truncate">
                                                                    {shop.name}
                                                                </h5>

                                                                <p className="text-[11px] text-slate-500 mt-1 truncate">
                                                                    {
                                                                        shop.locationName
                                                                    }
                                                                </p>

                                                                <div className="flex items-center justify-between mt-2">
                                                                    <span className="text-[10px] bg-[#F5FFFC] text-[#006A4E] px-2 py-1 rounded-full">
                                                                        {
                                                                            shop.specialty
                                                                        }
                                                                    </span>

                                                                    <span className="text-[11px] font-bold text-amber-500">
                                                                        ★{" "}
                                                                        {
                                                                            shop.rating
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoItem({
    icon,
    label,
    value,
    extra,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    extra?: string;
}) {
    return (
        <div className="flex items-start gap-2.5 min-w-0">
            <div className="text-[#006A4E] shrink-0 mt-0.5">{icon}</div>

            <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#006A4E] leading-none">
                    {label}
                </p>

                <p className="text-[12px] text-[#777777] mt-1 leading-snug line-clamp-2">
                    {value}
                </p>

                {extra && (
                    <p className="text-[11px] text-[#006A4E] font-semibold mt-1">
                        {extra}
                    </p>
                )}
            </div>
        </div>
    );
}

function FeatureBox({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="min-h-[50px] rounded-[10px] bg-[#F5FFFC] flex flex-col items-center justify-center gap-1 px-2 text-center">
            <div className="text-[#006A4E]">{icon}</div>

            <span className="text-[8px] sm:text-[9px] font-medium text-[#006A4E] leading-tight">
                {label}
            </span>
        </div>
    );
}

function ReviewCard({
    name,
    rating,
    text,
}: {
    name: string;
    rating: string;
    text: string;
}) {
    return (
        <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between">
                <span className="font-semibold text-xs">{name}</span>

                <span className="text-xs text-amber-500 font-bold">
                    ★ {rating}
                </span>
            </div>

            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                {text}
            </p>
        </div>
    );
}
