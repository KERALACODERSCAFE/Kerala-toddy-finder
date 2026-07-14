import { cookies } from "next/headers";
import { defaultLocale, locales, type Locale } from "./config";

const LOCALE_COOKIE = "locale";

export async function getLocale(): Promise<Locale> {
    const cookieStore = await cookies();
    const value = cookieStore.get(LOCALE_COOKIE)?.value;

    if (locales.includes(value as Locale)) {
        return value as Locale;
    }

    return defaultLocale;
}
