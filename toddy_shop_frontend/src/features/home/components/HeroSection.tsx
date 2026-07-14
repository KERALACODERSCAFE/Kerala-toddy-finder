"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const isMl = locale === "ml";
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden px-4 pb-10 pt-28 text-white sm:min-h-[720px] sm:px-6 sm:pt-32 lg:min-h-[840px] lg:px-10">
      <Image
        src="/hero-bg-mobile.jpg"
        alt="Aerial view of Kerala landscape"
        fill
        priority
        className="object-cover object-center md:hidden"
        sizes="(max-width: 768px) 100vw, 0vw"
      />
      <Image
        src="/hero-bg.jpg"
        alt="Aerial view of Kerala landscape"
        fill
        priority
        className="hidden object-cover object-center md:block"
        sizes="(max-width: 768px) 0vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/35 md:from-black/60 md:via-black/30 md:to-black/45" />
      <div className="absolute inset-0 bg-[#022612]/40" />

      <div className="relative z-10 mx-auto w-full max-w-[1240px]">
        <div className="max-w-[620px]">
          <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/95 px-3 py-1 text-[12px] font-bold tracking-[0.14em] text-emerald-900 shadow-sm sm:mb-6 sm:px-4 sm:py-1.5 sm:text-[11px]">
          {t("badge")}
          </span>

          <h1 
            className={`font-[family-name:var(--font-body)] text-[34px] font-extrabold drop-shadow-sm sm:text-[42px] md:text-[52px] ${
              isMl ? "leading-[1.6] sm:leading-[1.5] md:leading-[1.4]" : "leading-[1.12]"
            }`}
          >
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
            {t("titleLine3")?.trim() !== "" && (
              <>
                <br />
                {t("titleLine3")}
              </>
            )}
          </h1>

          <p className="mt-3 max-w-[460px] text-sm font-semibold text-white/90 sm:text-base">
            {t("descriptionMalayalam")}
          </p>

          <p className="mt-2 max-w-[500px] text-xs text-white/80 sm:text-sm">
            {t("descriptionEnglish")}
          </p>

          <div className="mt-6 flex w-full max-w-[420px] items-center rounded-lg border border-white/20 bg-white p-1.5 shadow-xl sm:mt-7">
            <Search size={17} className="mx-2 shrink-0 text-zinc-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="h-9 w-full bg-transparent pr-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-700 text-white transition hover:bg-emerald-600"
              aria-label={t("searchAria")}
            >
              <Search size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
