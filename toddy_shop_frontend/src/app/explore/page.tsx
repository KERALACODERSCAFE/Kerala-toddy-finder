import Image from "next/image";
import Link from "next/link";
import {
  MAP_MARKERS,
  FEATURED_EXPLORE_SHOP,
  RECOMMENDED_SHOPS,
  MAP_IMAGE,
} from "@/lib/explore-data";

export const metadata = {
  title: "Explore Shops | Toddy Finder",
  description: "Find toddy shops near you on an interactive map.",
};

export default function ExplorePage() {
  return (
    <div className="relative flex overflow-hidden" style={{ height: "calc(100vh - 72px)" }}>
      {/* Map Area */}
      <div className="relative flex-grow h-full bg-surface-container overflow-hidden">
        <Image
          src={MAP_IMAGE}
          alt="Topographical map of Kerala backwaters with illustrated palm trees and waterway patterns"
          fill
          className="object-cover opacity-60"
          priority
        />

        {/* Map Markers */}
        {MAP_MARKERS.map((marker) => (
          <div
            key={marker.id}
            className="absolute group cursor-pointer"
            style={{ top: marker.top, left: marker.left }}
          >
            <div
              className={`${
                marker.color === "primary"
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-secondary text-on-secondary"
              } p-2 rounded-full shadow-lg border-2 border-surface flex items-center justify-center transition-transform group-hover:scale-110`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {marker.icon}
              </span>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-surface/85 backdrop-blur-sm border border-outline-variant px-3 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <span className="font-[family-name:var(--font-heading)] text-sm font-semibold">
                {marker.name}
              </span>
            </div>
          </div>
        ))}

        {/* Floating Search Bar */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
          <div className="bg-surface/85 backdrop-blur-sm shadow-xl border border-outline-variant rounded-full p-2 flex items-center space-x-2">
            <div className="flex-grow flex items-center px-4">
              <span className="material-symbols-outlined text-outline">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 w-full text-on-surface outline-none ml-2"
                placeholder="Search by location or shop name..."
                type="text"
              />
            </div>
            <div className="h-8 w-[1px] bg-outline-variant" />
            <button className="flex items-center space-x-2 px-4 py-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant text-[14px] font-semibold tracking-wider cursor-pointer">
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-8 right-8 flex flex-col space-y-2">
          <button className="bg-surface border border-outline-variant p-3 shadow-md rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
            <span className="material-symbols-outlined">my_location</span>
          </button>
          <div className="flex flex-col bg-surface border border-outline-variant shadow-md rounded-lg overflow-hidden">
            <button className="p-3 border-b border-outline-variant hover:bg-surface-container-high transition-colors cursor-pointer">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="p-3 hover:bg-surface-container-high transition-colors cursor-pointer">
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side Drawer */}
      <aside className="w-[400px] bg-surface border-l border-outline-variant flex-col h-full z-10 shadow-2xl hidden md:flex">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-primary">
            Discover Nearby
          </h2>
          <button className="text-outline hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined">
              keyboard_double_arrow_right
            </span>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-outline [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          {/* Featured Shop Card */}
          <div className="group border border-outline-variant rounded-xl overflow-hidden bg-white transition-all hover:shadow-md">
            <div className="relative h-48">
              <Image
                src={FEATURED_EXPLORE_SHOP.image}
                alt={FEATURED_EXPLORE_SHOP.alt}
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                {FEATURED_EXPLORE_SHOP.status}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                  {FEATURED_EXPLORE_SHOP.name}
                </h3>
                <div className="flex items-center text-secondary">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-semibold ml-1">
                    {FEATURED_EXPLORE_SHOP.rating}
                  </span>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm line-clamp-2">
                {FEATURED_EXPLORE_SHOP.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {FEATURED_EXPLORE_SHOP.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-tertiary-fixed text-tertiary px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/shops/${FEATURED_EXPLORE_SHOP.id}`}
                className="w-full mt-4 border border-secondary text-secondary py-2 rounded-lg font-semibold text-sm tracking-wider hover:bg-secondary/5 transition-colors flex items-center justify-center"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Recommended List */}
          <div className="space-y-4">
            <h4 className="text-outline uppercase tracking-widest text-[10px] font-semibold">
              Recommended For You
            </h4>
            {RECOMMENDED_SHOPS.map((shop) => (
              <Link
                key={shop.id}
                href={`/shops/${shop.id}`}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors border border-transparent hover:border-outline-variant"
              >
                <Image
                  src={shop.image}
                  alt={shop.alt}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h5 className="font-[family-name:var(--font-heading)] text-sm font-semibold">
                    {shop.name}
                  </h5>
                  <p className="text-xs text-on-surface-variant">
                    {shop.location} &bull; {shop.distance}
                  </p>
                </div>
                <span className="material-symbols-outlined text-outline">
                  chevron_right
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="p-6 bg-surface-container-low border-t border-outline-variant">
          <button className="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-[family-name:var(--font-heading)] font-semibold flex items-center justify-center space-x-3 shadow-lg active:scale-[0.98] transition-transform cursor-pointer">
            <span className="material-symbols-outlined">explore</span>
            <span>Start Heritage Trail</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
