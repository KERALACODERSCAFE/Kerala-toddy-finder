import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";

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

export const metadata: Metadata = {
    title: "Shaap | Kerala's Authentic Toddy Finder",
    description:
        "Discover authentic Kerala toddy shop experiences — where tradition meets taste.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${cormorant.variable} ${nunito.variable} antialiased`}
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
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
