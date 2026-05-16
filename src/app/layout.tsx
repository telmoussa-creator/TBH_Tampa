import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ChatConcierge } from "@/components/ChatConcierge";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tarekbuyshouses.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Tarek Buys Houses — Cash for Tampa Homes in 7 Days",
    template: "%s · Tarek Buys Houses",
  },
  description:
    "Get a fair, AI-powered cash offer on your Tampa-area home in under 24 hours. No fees, no repairs, no agents. Close in as little as 7 days.",
  openGraph: {
    type: "website",
    url: SITE,
    title: "Tarek Buys Houses — Cash for Tampa Homes",
    description:
      "AI-powered cash offers for Tampa homeowners. No fees. No repairs. Close in 7 days.",
    siteName: "Tarek Buys Houses",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
        <ChatConcierge />
      </body>
    </html>
  );
}
