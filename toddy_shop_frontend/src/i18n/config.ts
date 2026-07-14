export const locales = ["en", "ml"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
