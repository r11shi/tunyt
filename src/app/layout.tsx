import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nine Ball Cafe — TUNYT",
  description:
    "Book pool billiards tables at Nine Ball Cafe, Saharanpur. Professional-quality tables, premium cues, and comfortable seating.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white font-sans antialiased tracking-[-0.02em]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
