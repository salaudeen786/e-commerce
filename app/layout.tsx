import type { Metadata } from "next";
import { playfairDisplay, poppins } from "@/lib/fonts";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sweet Moments — Premium Cakes, Coffee, Chocolates & Gifts",
    template: "%s — Sweet Moments",
  },
  description:
    "Discover handcrafted premium cakes, artisanal chocolates, and curated gifts for every celebration. Sweet Moments makes every occasion special.",
  openGraph: {
    title: "Sweet Moments — Premium Cakes, Coffee, Chocolates & Gifts",
    description:
      "Discover handcrafted premium cakes, artisanal chocolates, and curated gifts for every celebration.",
    siteName: "Sweet Moments",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweet Moments — Premium Cakes, Coffee, Chocolates & Gifts",
    description:
      "Discover handcrafted premium cakes, artisanal chocolates, and curated gifts for every celebration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex w-full min-h-full flex-col overflow-x-hidden">
        <div className="fixed inset-x-0 top-0 z-50 flex flex-col">
          <AnnouncementBar />
          <Navbar />
        </div>
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
