import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Nexus — College Club Hub",
        template: "%s | Nexus",
    },
    description:
        "Discover and join college clubs, attend events, and connect with fellow students on Nexus.",
    keywords: ["college clubs", "student organizations", "campus events", "student community"],
    authors: [{ name: "Nexus Team" }],
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    openGraph: {
        title: "Nexus — College Club Hub",
        description:
            "Discover and join college clubs, attend events, and connect with fellow students.",
        type: "website",
        siteName: "Nexus",
    },
    twitter: {
        card: "summary_large_image",
        title: "Nexus — College Club Hub",
        description: "Discover and join college clubs on Nexus.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
