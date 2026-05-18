"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { 
  Search, SlidersHorizontal, X, Star, MapPin, Sparkles, 
  Share2, Heart, Clock, Phone, Globe, FileText, DollarSign, 
  Car, Users, Accessibility, Wind, Baby, ShowerHead, Wifi 
} from "lucide-react";

// Rich data representing toddy shops
const initialToddyShops = [
  {
    id: 1,
    name: "Mullapanthal Toddy Shop",
    malayalamName: "മുള്ളപ്പന്തൽ കള്ള് ഷാപ്പ്",
    locationName: "Tripunithura, Kochi",
    position: [9.9351, 76.3533] as [number, number],
    description: "Famous for its spicy duck curry, beef roast, and pure coconut toddy under the palms.",
    rating: 4.7,
    reviewsCount: 1240,
    specialty: "Duck & Beef",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&auto=format&fit=crop&q=60",
    tsNumber: "4001",
    priceRange: "Moderate",
    hours: "08:00 AM - 08:00 PM",
    phone: "+91 9988 776 655",
    website: "mullapanthalthoddy.com",
    amenities: ["Air Conditioned", "Kids Friendly", "Clean Toilets", "Wi-Fi"],
    accessibility: ["Parking", "Gender Neutral", "Wheel Chair Accessible"]
  },
  {
    id: 2,
    name: "Kadamakkudy Toddy Shop",
    malayalamName: "കടമക്കുടി കള്ള് ഷാപ്പ്",
    locationName: "Kadamakkudy Islands, Kochi",
    position: [10.0528, 76.2482] as [number, number],
    description: "Located amidst scenic backwaters. Perfect sunsets, fresh toddy, and delicious local food.",
    rating: 4.8,
    reviewsCount: 420,
    specialty: "Crab & Sweet Toddy",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
    tsNumber: "4023",
    priceRange: "Budget-Friendly",
    hours: "09:00 AM - 09:00 PM",
    phone: "+91 9447 223 344",
    website: "kadamakkudytoddy.com",
    amenities: ["Kids Friendly", "Clean Toilets", "Wi-Fi"],
    accessibility: ["Parking", "Wheel Chair Accessible"]
  },
  {
    id: 3,
    name: "Nettoor Toddy Shop",
    malayalamName: "നെട്ടൂർ കള്ള് ഷാപ്പ്",
    locationName: "Nettoor, Ernakulam",
    position: [9.9248, 76.3150] as [number, number],
    description: "Traditional lakeside toddy shop serving fiery local delicacies and fresh fish curries.",
    rating: 4.4,
    reviewsCount: 310,
    specialty: "Prawns & Seafood",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60",
    tsNumber: "4115",
    priceRange: "Budget-Friendly",
    hours: "08:00 AM - 08:00 PM",
    phone: "+91 9495 112 233",
    website: "nettoortoddy.in",
    amenities: ["Kids Friendly", "Clean Toilets"],
    accessibility: ["Parking"]
  },
  {
    id: 4,
    name: "Karimpumkala Toddy Shop",
    malayalamName: "കരിമ്പുംകാല കള്ള് ഷാപ്പ്",
    locationName: "Pallom, Kottayam",
    position: [9.5524, 76.5412] as [number, number],
    description: "Legendary culinary spot since 1952. Outstanding food and premium toddy varieties.",
    rating: 4.9,
    reviewsCount: 2315,
    specialty: "Karimeen Pollichathu",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop&q=60",
    tsNumber: "3050",
    priceRange: "Premium",
    hours: "08:00 AM - 10:00 PM",
    phone: "+91 481 243 0500",
    website: "karimpumkala.com",
    amenities: ["Air Conditioned", "Kids Friendly", "Clean Toilets", "Wi-Fi"],
    accessibility: ["Parking", "Gender Neutral", "Wheel Chair Accessible"]
  },
  {
    id: 5,
    name: "Heritage",
    malayalamName: "ഹെറിറ്റേജ്",
    locationName: "Heritage Village, Alappuzha, 600000",
    position: [9.4981, 76.3388] as [number, number],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus, arcu at rhoncus ullamcorper, nulla dui enim, eu laoreet felis nisi ut dolor. Read More",
    rating: 4.0,
    reviewsCount: 106,
    specialty: "Best Cuisine",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=60",
    tsNumber: "4001",
    priceRange: "Moderate",
    hours: "08:00 AM - 08:00 PM",
    phone: "+91 9988 776 655",
    website: "toddy.in",
    amenities: ["Air Conditioned", "Kids Friendly", "Clean Toilets", "Wi-Fi"],
    accessibility: ["Parking", "Gender Neutral", "Wheel Chair Accessible"]
  },
];

// Dynamically import MapView with ssr: false
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
  const [activeCenter, setActiveCenter] = useState<[number, number] | null>(null);
  const [activeShopId, setActiveShopId] = useState<number | null>(null);
  
  // Search & Geocoding loading
  const [isSearching, setIsSearching] = useState(false);

  // Bottom drawer states
  const [activeTab, setActiveTab] = useState("overview"); // overview, reviews, recommended
  const [isFavorite, setIsFavorite] = useState(false);

  // Filter States
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter Logic
  const filteredShops = toddyShops.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating = selectedRating ? shop.rating >= selectedRating : true;

    const matchesCategory = selectedCategory
      ? shop.specialty.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        shop.description.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;

    return matchesSearch && matchesRating && matchesCategory;
  });

  // Suggestions Logic
  const suggestions = searchQuery
    ? toddyShops.filter(
        (shop) =>
          (shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.locationName.toLowerCase().includes(searchQuery.toLowerCase())) &&
          shop.name.toLowerCase() !== searchQuery.toLowerCase()
      )
    : [];

  const handleSelectShop = (shop: typeof toddyShops[0]) => {
    setSearchQuery(shop.name);
    setActiveCenter(shop.position);
    setActiveShopId(shop.id);
    setShowSuggestions(false);
    setActiveTab("overview");
  };

  // Perform a geocoding search using OpenStreetMap Nominatim API
  const handleSearchSubmit = async (queryText: string) => {
    if (!queryText) return;

    // First check if it matches an existing shop locally
    const matchedShop = toddyShops.find(
      (shop) => shop.name.toLowerCase().includes(queryText.toLowerCase())
    );
    if (matchedShop) {
      handleSelectShop(matchedShop);
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          queryText + ", Kerala"
        )}&format=json&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        const locationDisplayName = data[0].display_name;
        const placeName = locationDisplayName.split(",")[0] || queryText;

        // Smooth fly to the coordinates
        setActiveCenter([lat, lon]);

        // Generate a new dynamic shop in that area
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
          image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&auto=format&fit=crop&q=60",
          tsNumber: String(Math.floor(1000 + Math.random() * 8999)),
          priceRange: "Moderate",
          hours: "09:00 AM - 09:00 PM",
          phone: "+91 9447 " + Math.floor(100000 + Math.random() * 899999),
          website: "toddyfinder.in",
          amenities: ["Kids Friendly", "Clean Toilets", "Wi-Fi"],
          accessibility: ["Parking", "Wheel Chair Accessible"]
        };

        // Add this dynamically generated shop to the list
        setToddyShops((prev) => {
          if (prev.some((s) => Math.abs(s.position[0] - lat) < 0.001 && Math.abs(s.position[1] - lon) < 0.001)) {
            return prev;
          }
          return [...prev, dynamicShop];
        });

        // Focus and select the shop
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

  const handleResetFilters = () => {
    setSelectedRating(null);
    setSelectedCategory(null);
  };

  // Get currently selected shop
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
      />

      {/* FLOATING TOP/LEFT CONTROLS (Pointer events disabled on container) */}
      <div className="absolute inset-x-0 top-0 bottom-0 z-[1000] pointer-events-none p-4 flex flex-col gap-4 items-start justify-between">
        
        {/* TOP ROW: FLOATING SEARCH BAR */}
        <div className="relative w-full md:w-[450px] pointer-events-auto self-center md:self-auto md:ml-[350px]">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800/50 flex items-center p-1.5 pl-4 transition-all duration-200 focus-within:ring-2 focus-within:ring-[#003e1c]/25 focus-within:border-[#003e1c]">
            <Search className={`w-5 h-5 text-[#003e1c] dark:text-emerald-500 shrink-0 ${isSearching ? "animate-pulse" : ""}`} />
            
            <input
              type="text"
              placeholder={isSearching ? "Geocoding location..." : "Search district or toddy shops..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit(searchQuery);
                }
              }}
              className="bg-transparent border-none outline-none flex-1 text-sm px-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 w-full"
            />

            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="p-1 mr-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer pointer-events-auto"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl transition-all duration-200 shrink-0 flex items-center justify-center cursor-pointer pointer-events-auto ${
                showFilters
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20"
                  : "bg-[#003e1c] hover:bg-[#002e14] text-white"
              }`}
              title="Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* AUTOCOMPLETE SUGGESTIONS DROPDOWN */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800/50 overflow-hidden max-h-64 overflow-y-auto z-[2000] transition-all duration-150 pointer-events-auto">
              {suggestions.map((shop) => (
                <button
                  key={shop.id}
                  onClick={() => handleSelectShop(shop)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between border-b border-slate-50 last:border-0 dark:border-slate-800/30 transition-colors duration-150 cursor-pointer"
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{shop.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">📍 {shop.locationName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded leaf-chip flex items-center gap-0.5 shrink-0">
                    ★ {shop.rating}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SIDE BAR / TOP CARD & FILTER MENU (Sits on top-left of the viewport on desktop) */}
        <div className="absolute top-4 left-4 flex flex-col gap-3 w-full md:w-[320px] pointer-events-auto shrink-0 z-[1001] hidden md:flex">
          
          {/* BRAND CARD */}
          <div className="p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800/50">
            <h1 className="text-xl font-bold font-heading text-[#003e1c] dark:text-emerald-400">Kerala Toddy Finder</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Discover traditional, authentic toddy shops across Kerala.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  {filteredShops.length} Shops Found
                </span>
              </div>
              
              {(selectedRating || selectedCategory) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[10px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded transition-colors duration-150 cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* ACTIVE FILTER STATUS BADGES */}
          {(selectedRating || selectedCategory) && (
            <div className="flex flex-wrap gap-2">
              {selectedRating && (
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900 flex items-center gap-1">
                  ★ {selectedRating}+ Rating
                  <button onClick={() => setSelectedRating(null)} className="cursor-pointer">
                    <X className="w-3.5 h-3.5 hover:text-red-500" />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 px-2.5 py-1 rounded-full border border-amber-100 dark:border-amber-900 flex items-center gap-1">
                  🔥 {selectedCategory}
                  <button onClick={() => setSelectedCategory(null)} className="cursor-pointer">
                    <X className="w-3.5 h-3.5 hover:text-red-500" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* FILTER PANEL DRAWER */}
          {showFilters && (
            <div className="p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800/50 flex flex-col gap-4 transition-all duration-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" /> Filter Options
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Rating filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Minimum Rating</span>
                <div className="flex gap-2">
                  {[4.5, 4.7, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                      className={`flex-1 text-xs py-1.5 rounded-lg border transition-all duration-200 font-bold cursor-pointer ${
                        selectedRating === rating
                          ? "bg-[#003e1c] border-[#003e1c] text-white"
                          : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      ★ {rating}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialty filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Specialty Category</span>
                <div className="flex flex-wrap gap-2">
                  {["Beef", "Duck", "Seafood", "Crab", "Sweet"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 font-semibold cursor-pointer ${
                        selectedCategory === category
                          ? "bg-[#003e1c] border-[#003e1c] text-white"
                          : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
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

        {/* BOTTOM DETAIL CARD DRAWER (Appears when a toddy shop is selected) */}
        {selectedShop && (
          <div className="w-full pointer-events-auto z-[1002] transition-all duration-300 transform translate-y-0 flex flex-col xl:flex-row gap-4 max-h-[85vh] xl:max-h-[380px] overflow-y-auto xl:overflow-visible">
            
            {/* 1. LEFT CARD: OVERVIEW PANEL */}
            <div className="w-full xl:w-[42%] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden flex flex-col md:flex-row shrink-0">
              
              {/* Image Column */}
              <div className="w-full md:w-[45%] h-44 md:h-auto min-h-[180px] relative bg-slate-100 dark:bg-slate-800 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={selectedShop.image} 
                  alt={selectedShop.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{selectedShop.rating.toFixed(1)} ({selectedShop.reviewsCount})</span>
                </div>
              </div>

              {/* Information details */}
              <div className="w-full md:w-[55%] p-5 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-xl md:text-2xl font-black font-heading text-[#003e1c] dark:text-emerald-400 leading-tight">
                      {selectedShop.name}
                    </h2>
                    <div className="flex items-center gap-1.5 shrink-0 mt-1">
                      <button 
                        onClick={() => {}} 
                        className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full border border-slate-100 dark:border-slate-700 transition-colors"
                        title="Share"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setIsFavorite(!isFavorite)} 
                        className={`p-2 rounded-full border transition-all ${
                          isFavorite 
                            ? "bg-red-50 border-red-200 text-red-500" 
                            : "bg-slate-50 border-slate-100 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                        }`}
                        title="Favorite"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-red-500" : ""}`} />
                      </button>
                    </div>
                  </div>

                  <p className="text-emerald-700 dark:text-emerald-500 font-bold text-sm leading-none mt-0.5 font-sans">
                    {selectedShop.malayalamName}
                  </p>

                  <div className="flex items-start gap-1 text-slate-400 dark:text-slate-500 mt-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-normal">
                      {selectedShop.locationName}
                    </span>
                  </div>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/10">
                      Family-Friendly
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/10">
                      Dine-in
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/10">
                      Best Cuisine
                    </span>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed line-clamp-2 md:line-clamp-3">
                    {selectedShop.description}{" "}
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer">
                      Read More
                    </span>
                  </p>
                </div>

                {/* Left Card Bottom Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  <button className="flex-1 py-2 px-3 border border-slate-200 hover:border-[#003e1c] dark:border-slate-700 dark:hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">
                    View Details
                  </button>
                  <button className="flex-1 py-2 px-3 border border-slate-200 hover:border-[#003e1c] dark:border-slate-700 dark:hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">
                    Write a review
                  </button>
                </div>
              </div>
            </div>

            {/* 2. RIGHT CARD: DETAILS AND TABS PANEL */}
            <div className="w-full xl:w-[58%] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800/80 p-5 flex flex-col justify-between gap-4">
              
              {/* Tabs Navigation Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <div className="flex gap-6">
                  {["overview", "reviews", "recommended"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2.5 text-xs md:text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                        activeTab === tab 
                          ? "text-[#003e1c] dark:text-emerald-400 border-b-2 border-[#003e1c] dark:border-emerald-400" 
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      }`}
                    >
                      {tab === "overview" && "Overview"}
                      {tab === "reviews" && "Review"}
                      {tab === "recommended" && "Recommended for you"}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setActiveShopId(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer pointer-events-auto"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 3. DYNAMIC TAB CONTENT VIEWPORT */}
              <div className="flex-1 min-h-[160px] overflow-y-auto">
                
                {/* A. OVERVIEW TAB: KEY INFO & AMENITIES */}
                {activeTab === "overview" && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    
                    {/* Left Info List Column (7/12 cols) */}
                    <div className="md:col-span-7 flex flex-col gap-3">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide leading-none">Address</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-bold mt-0.5 leading-snug">{selectedShop.locationName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide leading-none">Hours</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-bold mt-0.5 leading-none">
                            {selectedShop.hours} <span className="text-emerald-700 dark:text-emerald-400 font-black ml-1">(Open Today)</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <FileText className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide leading-none">TS Number</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-bold mt-0.5 leading-none">{selectedShop.tsNumber}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Phone className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide leading-none">Phone</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-bold mt-0.5 leading-none">{selectedShop.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <DollarSign className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide leading-none">Price Range</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-bold mt-0.5 leading-none">({selectedShop.priceRange})</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Globe className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide leading-none">Website</p>
                          <a href={`https://${selectedShop.website}`} target="_blank" rel="noreferrer" className="text-xs text-emerald-700 dark:text-emerald-400 font-bold mt-0.5 hover:underline">
                            {selectedShop.website}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Vertical Divider line */}
                    <div className="hidden md:block w-px bg-slate-200 dark:bg-slate-800 self-stretch my-1"></div>

                    {/* Right Amenities List Column (5/12 cols) */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                      
                      {/* Accessibility block */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider leading-none">Accesibility</span>
                        <div className="flex flex-col gap-1.5">
                          {selectedShop.accessibility.map((item) => (
                            <div key={item} className="flex items-center gap-2 bg-[#f4faf7] dark:bg-emerald-950/20 px-2.5 py-1.5 rounded-lg border border-emerald-500/10">
                              {item === "Parking" && <Car className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                              {item === "Gender Neutral" && <Users className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                              {item === "Wheel Chair Accessible" && <Accessibility className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Amenities block */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider leading-none">Amenities</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {selectedShop.amenities.map((item) => (
                            <div key={item} className="flex items-center gap-1.5 bg-[#f4faf7] dark:bg-emerald-950/20 px-2 py-1.5 rounded-lg border border-emerald-500/10">
                              {item === "Air Conditioned" && <Wind className="w-3 h-3 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                              {item === "Kids Friendly" && <Baby className="w-3 h-3 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                              {item === "Clean Toilets" && <ShowerHead className="w-3 h-3 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                              {item === "Wi-Fi" && <Wifi className="w-3 h-3 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                              <span className="text-[9px] font-bold text-emerald-800 dark:text-emerald-300 leading-tight">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* B. REVIEWS TAB */}
                {activeTab === "reviews" && (
                  <div className="flex flex-col gap-3 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Customer Reviews</h4>
                      <button className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer">
                        See All ({selectedShop.reviewsCount})
                      </button>
                    </div>
                    
                    {/* Mock Reviews List */}
                    <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-1">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/60 flex flex-col gap-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Raju V.</span>
                          <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">★ 5.0</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          "Outstanding fresh sweet toddy and fiery duck roast. Truly authentic Kerala vibe. Accessible parking and fast service. Will visit again!"
                        </p>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/60 flex flex-col gap-1 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Anjali Nair</span>
                          <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">★ 4.0</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          "Excellent backwater surroundings and family friendly atmosphere. Spicy crab was mouthwatering, but the seats fill up very quickly."
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* C. RECOMMENDED TAB */}
                {activeTab === "recommended" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    {toddyShops
                      .filter((s) => s.id !== selectedShop.id)
                      .slice(0, 2)
                      .map((shop) => (
                        <div 
                          key={shop.id} 
                          onClick={() => handleSelectShop(shop)}
                          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3 flex gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer pointer-events-auto"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100 leading-tight line-clamp-1">{shop.name}</h5>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-none mt-1">📍 {shop.locationName.split(",")[0]}</p>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1 rounded">{shop.specialty}</span>
                              <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">★ {shop.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
