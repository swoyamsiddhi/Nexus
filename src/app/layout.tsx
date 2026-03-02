import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Campus Nexus — Your Academic Network",
        template: "%s | Campus Nexus",
    },
    description:
        "Connect with students, faculty, and organizers. Discover events, research opportunities, and team up for projects on your campus.",
    keywords: ["campus", "students", "research", "events", "hackathon", "networking", "college"],
    openGraph: {
        title: "Campus Nexus",
        description: "The academic connection platform for college students",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
