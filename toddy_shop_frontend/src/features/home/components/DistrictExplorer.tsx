"use client";
import Image from "next/image";
import { useState } from "react";
import keralaPaths from "./kerala-paths.json";
const DISTRICTS = keralaPaths.map((p) => p.name).sort();
const MOCK_SHOPS = [
    { id: 1, title: "Heritage", rating: "4.2", tags: "Family Dining" },
    { id: 2, title: "Heritage", rating: "4.2", tags: "Family Dining" },
    { id: 3, title: "Heritage", rating: "4.2", tags: "Family Dining" },
];
export function DistrictExplorer() {
    const [activeDistrict, setActiveDistrict] = useState("Alappuzha");
    const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [page, setPage] = useState(0);
    const ITEMS_PER_PAGE = 7;
    const totalPages = Math.ceil(DISTRICTS.length / ITEMS_PER_PAGE);
    const handleMapClick = (districtName: string) => {
        setActiveDistrict(districtName);
        const districtIndex = DISTRICTS.indexOf(districtName);
        if (districtIndex !== -1) {
            setPage(Math.floor(districtIndex / ITEMS_PER_PAGE));
        }
        setTimeout(() => {
            const element = document.getElementById(`district-${districtName}`);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 100);
    };
    const paginatedDistricts = DISTRICTS.slice(
        page * ITEMS_PER_PAGE,
        (page + 1) * ITEMS_PER_PAGE,
    );
    return (
        <section className="bg-white py-24 px-8 border-b border-stone-100">
            {" "}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
                {" "}
                {/* Left Side: Map graphic */}{" "}
                <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start relative min-h-[600px]">
                    {" "}
                    {/* Abstract stylized Kerala map representation */}{" "}
                    <svg
                        viewBox="0 0 400 800"
                        className="w-[90%] h-auto max-h-[800px] drop-shadow-xl"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                    >
                        {" "}
                        {/* Render all districts as clickable paths */}{" "}
                        {keralaPaths.map((district) => {
                            const isActive = activeDistrict === district.name;
                            return (
                                <path
                                    key={district.name}
                                    d={district.d}
                                    strokeWidth="2"
                                    className={`transition-all duration-300 cursor-pointer ${isActive ? "fill-[#003e1c] stroke-[#003e1c]" : "fill-white stroke-stone-200 hover:fill-sky-50 hover:stroke-sky-300"}`}
                                    onClick={() =>
                                        handleMapClick(district.name)
                                    }
                                    onMouseEnter={() =>
                                        setHoveredDistrict(district.name)
                                    }
                                    onMouseLeave={() =>
                                        setHoveredDistrict(null)
                                    }
                                    onMouseMove={(e) =>
                                        setMousePos({
                                            x: e.clientX,
                                            y: e.clientY,
                                        })
                                    }
                                />
                            );
                        })}{" "}
                    </svg>{" "}
                    {/* Hover Tooltip */}{" "}
                    {hoveredDistrict && (
                        <div
                            className="fixed z-50 pointer-events-none bg-white px-4 py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-sky-500 flex flex-col items-center transform -translate-x-1/2 -translate-y-full transition-opacity duration-200"
                            style={{ left: mousePos.x, top: mousePos.y - 20 }}
                        >
                            {" "}
                            <span className="font-bold text-sky-600 tracking-wide text-sm uppercase">
                                {" "}
                                {hoveredDistrict}{" "}
                            </span>{" "}
                            <span className="text-xs font-bold mt-1 px-2 py-1 bg-sky-50 text-sky-500 rounded-md">
                                {" "}
                                150 Shops{" "}
                            </span>{" "}
                            {/* Tooltip Arrow */}{" "}
                            <div className="absolute bottom-[-6.5px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-sky-500 rotate-45"></div>{" "}
                        </div>
                    )}{" "}
                    <div className="absolute bottom-10 left-0 bg-white shadow-md border border-stone-100 rounded-lg flex flex-col">
                        {" "}
                        <button className="w-10 h-10 border-b border-stone-100 flex items-center justify-center text-stone-600 hover:text-primary transition-colors">
                            {" "}
                            <span className="material-symbols-outlined text-[20px]">
                                {" "}
                                add{" "}
                            </span>{" "}
                        </button>{" "}
                        <button className="w-10 h-10 flex items-center justify-center text-stone-600 hover:text-primary transition-colors">
                            {" "}
                            <span className="material-symbols-outlined text-[20px]">
                                {" "}
                                remove{" "}
                            </span>{" "}
                        </button>{" "}
                    </div>{" "}
                </div>{" "}
                {/* Right Side: Districts List */}{" "}
                <div className="w-full lg:w-1/2 flex flex-col">
                    {" "}
                    <div className="mb-10">
                        {" "}
                        <h2 className="font-[family-name:var(--font-heading)] text-5xl font-semibold text-on-surface mb-3">
                            {" "}
                            Explore by{" "}
                            <span className="text-primary">District.</span>{" "}
                        </h2>{" "}
                        <p className="text-stone-500 font-medium">
                            {" "}
                            choose your district and find best shops
                            nearby.{" "}
                        </p>{" "}
                    </div>{" "}
                    <div className="flex flex-col gap-4">
                        {" "}
                        {paginatedDistricts.map((district) => {
                            const isActive = activeDistrict === district;
                            return (
                                <div
                                    key={district}
                                    id={`district-${district}`}
                                    className={`flex flex-col transition-colors duration-300 ease-in-out border border-stone-200 rounded-2xl overflow-hidden ${isActive ? "bg-stone-50 shadow-sm border-primary/20" : "bg-white hover:border-stone-300"}`}
                                >
                                    {" "}
                                    {/* Accordion Header */}{" "}
                                    <div
                                        className="flex items-center justify-between p-6 cursor-pointer"
                                        onClick={() =>
                                            setActiveDistrict(
                                                activeDistrict === district
                                                    ? ""
                                                    : district,
                                            )
                                        }
                                    >
                                        {" "}
                                        <div className="flex flex-col">
                                            {" "}
                                            <span
                                                className={`text-lg font-bold ${isActive ? "text-primary" : "text-stone-700"}`}
                                            >
                                                {" "}
                                                {district}{" "}
                                            </span>{" "}
                                            <span className="text-xs text-stone-400 font-medium mt-1">
                                                {" "}
                                                12 Top Rating • 150 Shops{" "}
                                            </span>{" "}
                                        </div>{" "}
                                        <button className="bg-primary text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                                            {" "}
                                            View all{" "}
                                            <span className="material-symbols-outlined text-[14px]">
                                                {" "}
                                                arrow_forward{" "}
                                            </span>{" "}
                                        </button>{" "}
                                    </div>{" "}
                                    {/* Expanded Content (Cards) */}{" "}
                                    <div
                                        className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"}`}
                                    >
                                        {" "}
                                        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x hide-scrollbar ">
                                            {" "}
                                            {MOCK_SHOPS.map((shop) => (
                                                <div
                                                    key={shop.id}
                                                    className="min-w-[240px] bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm snap-start group cursor-pointer hover:shadow-md transition-all"
                                                >
                                                    {" "}
                                                    <div className="relative h-[140px] w-full bg-stone-100">
                                                        {" "}
                                                        <Image
                                                            src="/kerala-hero.png"
                                                            alt="Shop"
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />{" "}
                                                        <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                                            {" "}
                                                            Popular{" "}
                                                        </div>{" "}
                                                    </div>{" "}
                                                    <div className="p-4">
                                                        {" "}
                                                        <div className="flex justify-between items-start mb-2">
                                                            {" "}
                                                            <span className="font-bold text-stone-800">
                                                                {" "}
                                                                {
                                                                    shop.title
                                                                }{" "}
                                                            </span>{" "}
                                                            <span className="material-symbols-outlined text-stone-400 text-[18px]">
                                                                {" "}
                                                                arrow_forward{" "}
                                                            </span>{" "}
                                                        </div>{" "}
                                                        <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-md mb-3 inline-block">
                                                            {" "}
                                                            our Village{" "}
                                                        </span>{" "}
                                                        <p className="text-[11px] text-stone-400 leading-tight mb-4">
                                                            {" "}
                                                            The overall rating
                                                            is based on verified
                                                            reviews and food
                                                            quality.{" "}
                                                        </p>{" "}
                                                        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                                                            {" "}
                                                            <span className="text-xs font-bold text-primary flex items-center gap-1">
                                                                {" "}
                                                                <span className="material-symbols-outlined text-[14px] text-[#ffb148]">
                                                                    {" "}
                                                                    star{" "}
                                                                </span>{" "}
                                                                {
                                                                    shop.rating
                                                                }{" "}
                                                                Rating{" "}
                                                            </span>{" "}
                                                            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                                                                {" "}
                                                                {shop.tags}{" "}
                                                            </span>{" "}
                                                        </div>{" "}
                                                    </div>{" "}
                                                </div>
                                            ))}{" "}
                                        </div>{" "}
                                    </div>{" "}
                                </div>
                            );
                        })}{" "}
                    </div>{" "}
                    {/* Pagination Controls */}{" "}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-100">
                            {" "}
                            <span className="text-sm text-stone-500 font-medium">
                                {" "}
                                Showing {page * ITEMS_PER_PAGE + 1} to{" "}
                                {Math.min(
                                    (page + 1) * ITEMS_PER_PAGE,
                                    DISTRICTS.length,
                                )}{" "}
                                of {DISTRICTS.length} Districts{" "}
                            </span>{" "}
                            <div className="flex gap-2">
                                {" "}
                                <button
                                    onClick={() =>
                                        setPage((p) => Math.max(0, p - 1))
                                    }
                                    disabled={page === 0}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${page === 0 ? "bg-stone-50 text-stone-300 cursor-not-allowed" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-primary"}`}
                                >
                                    {" "}
                                    <span className="material-symbols-outlined text-[18px]">
                                        {" "}
                                        arrow_back{" "}
                                    </span>{" "}
                                    Previous{" "}
                                </button>{" "}
                                <button
                                    onClick={() =>
                                        setPage((p) =>
                                            Math.min(totalPages - 1, p + 1),
                                        )
                                    }
                                    disabled={page === totalPages - 1}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${page === totalPages - 1 ? "bg-stone-50 text-stone-300 cursor-not-allowed" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-primary"}`}
                                >
                                    {" "}
                                    Next{" "}
                                    <span className="material-symbols-outlined text-[18px]">
                                        {" "}
                                        arrow_forward{" "}
                                    </span>{" "}
                                </button>{" "}
                            </div>{" "}
                        </div>
                    )}{" "}
                </div>{" "}
            </div>{" "}
        </section>
    );
}
