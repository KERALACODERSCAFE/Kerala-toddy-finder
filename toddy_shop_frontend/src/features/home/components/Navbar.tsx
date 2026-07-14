"use client";

import { useState, useEffect } from "react";
import { Menu, Search, User, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
    const t = useTranslations("Navbar");
    const navLinks = [
        { key: "home", name: t("links.home"), href: "/" },
        { key: "exploreMap", name: t("links.exploreMap"), href: "/explore" },
        { key: "districts", name: t("links.districts"), href: "#districts" },
        { key: "community", name: t("links.community"), href: "/community" },
        { key: "about", name: t("links.about"), href: "/about" },
    ];
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed left-0 top-0 z-30 w-full transition-all duration-300 ${
                    isScrolled
                        ? "bg-black/40 backdrop-blur-md border-b border-white/10"
                        : "bg-transparent border-b border-transparent"
                }`}
            >
                <nav className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-4 text-white sm:px-6 lg:px-8">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-black/35 sm:text-sm"
                        aria-label={t("openMenu")}
                    >
                        <Menu size={16} />
                        <span>{t("menu")}</span>
                    </button>

                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Image
                            src="/logo.png"
                            alt={t("logoAlt")}
                            width={32}
                            height={32}
                            className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                            style={{ width: "auto", height: "auto" }}
                            priority
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageToggle />
                        <button
                            className="rounded-full border border-white/30 bg-black/20 p-2 backdrop-blur-sm transition hover:bg-black/35"
                            aria-label={t("search")}
                        >
                            <Search size={15} />
                        </button>
                        <button
                            className="rounded-full border border-white/30 bg-black/20 p-2 backdrop-blur-sm transition hover:bg-black/35"
                            aria-label={t("profile")}
                        >
                            <User size={15} />
                        </button>
                    </div>
                </nav>
            </header>

            <div
                className={`fixed inset-0 z-50 transition-all duration-300 ${
                    mobileMenuOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
            >
                <div
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute inset-0 bg-black/65 backdrop-blur-[1px]"
                />
                <aside
                    className={`absolute left-0 top-0 h-full w-[280px] border-r border-white/10 bg-[#05170f] p-5 text-white transition-transform duration-300 ${
                        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="mb-8 flex items-center justify-between">
                        <Image
                            src="/logo.png"
                            alt={t("logoAlt")}
                            width={26}
                            height={26}
                            style={{ width: "auto", height: "auto" }}
                        />
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="rounded-full border border-white/20 p-2"
                            aria-label={t("closeMenu")}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="space-y-2 text-sm font-semibold">
                        {navLinks.map((link) => (
                            <a
                                key={link.key}
                                href={link.href}
                                className="block rounded-lg px-3 py-2 hover:bg-white/10"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </aside>
            </div>
        </>
    );
}
