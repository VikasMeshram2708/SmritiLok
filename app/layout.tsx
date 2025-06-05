import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Explore Life’s Journeys – Inspiring Stories, Travel Diaries & Personal Growth | Smriti Lok",
  description:
    "Discover real-life journeys on Smriti Lok – from Himalayan treks to career reinventions. Explore travel stories, emotional milestones, and personal growth diaries shared by a global community. Start your journey today.",
  keywords: [
    "travel stories",
    "life journeys",
    "personal growth",
    "travel diaries",
    "Smriti Lok",
    "inspirational stories",
    "real experiences",
    "emotional journeys",
    "community memories",
    "explore life",
  ],
  openGraph: {
    title:
      "Explore Life’s Journeys – Inspiring Stories, Travel Diaries & Personal Growth | Smriti Lok",
    description:
      "Discover real-life journeys on Smriti Lok – from Himalayan treks to career reinventions. Explore travel stories, emotional milestones, and personal growth diaries shared by a global community. Start your journey today.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
