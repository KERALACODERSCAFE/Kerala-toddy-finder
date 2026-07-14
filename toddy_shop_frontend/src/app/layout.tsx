import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito, Noto_Sans_Malayalam } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/features/home/components/Navbar";
import { getLocale } from "@/i18n/getLocale";
import { getMessages } from "@/i18n/messages";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-heading",
});

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-body",
});

const malayalam = Noto_Sans_Malayalam({
    subsets: ["malayalam"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-malayalam",
});

export const metadata: Metadata = {
    title: "Shaap | Kerala's Authentic Toddy Finder",
    description:
        "Discover authentic Kerala toddy shop experiences — where tradition meets taste.",
};

import { MobileNav } from "@/components/layout/MobileNav";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages(locale);
    
    // Use Noto Sans Malayalam as a fallback when the locale is ml
    const fontClasses = locale === "ml" 
        ? `${malayalam.variable} font-malayalam antialiased` 
        : `${cormorant.variable} ${nunito.variable} antialiased`;

    return (
        <html
            lang={locale}
            className={fontClasses}
            suppressHydrationWarning
        >
            <head>
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen flex flex-col">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Navbar />
                    <main className="flex-1 pb-16 md:pb-0">{children}</main>
                    <Footer />
                    <MobileNav />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
