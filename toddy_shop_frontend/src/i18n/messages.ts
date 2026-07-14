import type { Locale } from "./config";

export async function getMessages(locale: Locale) {
    return (await import(`./messages/${locale}.json`)).default;
}
