"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { STATS, LEADERBOARD } from "@/lib/constants";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Hide arrow once user scrolls past 60% of the hero
      setShowArrow(rect.bottom > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    if (!sectionRef.current) return;
    const next = sectionRef.current.nextElementSibling as HTMLElement | null;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-[720px] flex items-center text-white overflow-hidden py-20 px-8">
      {/* Kerala background image */}
      <Image
        src="/kerala-hero.png"
        alt="Kerala backwaters at golden hour"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Green overlay — matches reference design */}
      <div className="absolute inset-0 bg-[#1a3a1a]/70" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        {/* Hero Left */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex bg-secondary-container/20 text-secondary-container px-4 py-1 rounded-full text-[13px] font-bold tracking-wider w-fit mb-6 border border-secondary-container/30">
            Kerala&apos;s First Verified Finder
          </div>
          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl leading-tight mb-4 font-semibold">
            Discover<br />
            <span className="text-secondary-container">Authentic</span><br />
            Toddy Shops
          </h1>
          <p className="opacity-90 mb-12 text-lg">
            Find the best toddy shops near you — verified, rated, and loved by the community.
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-2xl p-4 shadow-xl flex flex-col md:flex-row gap-4 max-w-2xl text-on-surface">
            <div className="flex-1 md:border-r border-stone-100 pr-4">
              <label className="block text-[13px] font-bold tracking-wider text-stone-500 mb-1 px-3">
                Search
              </label>
              <div className="flex items-center px-3">
                <span className="material-symbols-outlined text-primary mr-2">search</span>
                <input
                  className="w-full border-none focus:ring-0 p-0 placeholder-stone-400 bg-transparent outline-none"
                  placeholder="Shop name or location..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex-1 md:border-r border-stone-100 pr-4">
              <label className="block text-[13px] font-bold tracking-wider text-stone-500 mb-1 px-3">
                District
              </label>
              <select className="w-full border-none focus:ring-0 p-0 bg-transparent outline-none cursor-pointer">
                <option>All Districts</option>
                <option>Alappuzha</option>
                <option>Kottayam</option>
                <option>Thrissur</option>
              </select>
            </div>
            <div className="flex-1 pr-4">
              <label className="block text-[13px] font-bold tracking-wider text-stone-500 mb-1 px-3">
                Food
              </label>
              <select className="w-full border-none focus:ring-0 p-0 bg-transparent outline-none cursor-pointer">
                <option>Signature Dishes</option>
                <option>Karimeen Pollichathu</option>
                <option>Kappa &amp; Meen Curry</option>
              </select>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer">
              Search
            </button>
          </div>
        </div>

        {/* Hero Right: Stats & Leaderboard */}
        <div className="hidden lg:flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl"
              >
                <div className="text-3xl font-[family-name:var(--font-heading)] text-secondary-container font-semibold">
                  {stat.value}
                </div>
                <div className="text-[13px] font-bold tracking-wider opacity-70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="font-[family-name:var(--font-heading)] text-xl mb-4 flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-secondary-container">
                military_tech
              </span>
              Top Rated This Week
            </h3>
            <div className="space-y-4">
              {LEADERBOARD.map((shop) => (
                <div
                  key={shop.name}
                  className="flex justify-between items-center bg-white/5 p-3 rounded-xl"
                >
                  <span>{shop.name}</span>
                  <span className="text-secondary-container font-bold">
                    {shop.rating} ★
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-down arrow — fixed, fades out as user scrolls past hero */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-1 group cursor-pointer transition-all duration-500 ${showArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <span className="text-[11px] font-bold tracking-[3px] uppercase text-white/50 group-hover:text-white/80 transition-colors">
          Explore
        </span>
        <span className="hero-scroll-arrow material-symbols-outlined text-[32px] text-[#ffb148] group-hover:text-white transition-colors">
          expand_more
        </span>
      </button>
    </section>
  );
}
