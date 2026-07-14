"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";

const LOCALE_COOKIE = "locale";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export default function LanguageToggle() {
    const locale = useLocale() as Locale;
    const t = useTranslations("LanguageToggle");
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const nextLocale: Locale = locale === "en" ? "ml" : "en";

    const handleToggle = () => {
        document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}`;
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            aria-label={t("label")}
            className="rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-black/35 disabled:opacity-50"
        >
            {locale === "en" ? "EN / ML" : "ML / EN"}
        </button>
    );
}
