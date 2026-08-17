"use client";

import { useState } from "react";
import Image from "next/image";

import Header from "@/components/Header";
import Badge from "@/components/Badge";
import ActivityCard from "@/components/ActivityCard";
import VenueLocation from "@/components/VenueLocation";
import BookingBar from "@/components/BookingBar";
import BookingModal from "@/components/BookingModal";

export default function VenuePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // For the horizontal gallery, we'll repeat the hero image 3 times to simulate multiple photos
  const galleryImages = [
    "/assets/venue-hero.png",
    "/assets/venue-hero.png",
    "/assets/venue-hero.png"
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative pb-32 lg:pb-0">
      <Header />
      <main className="max-w-[1440px] mx-auto lg:px-10 pb-20 pt-0 lg:pt-6">
        <div className="flex flex-col lg:flex-row lg:gap-14 xl:gap-20 items-start justify-center">
          
          {/* ── LEFT: Scrollable Image Gallery (Mobile: full bleed, Desktop: sticky) ── */}
          <div className="w-full lg:w-[45%] xl:w-[48%] lg:sticky lg:top-10 shrink-0">
            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-2 px-4 sm:px-6 lg:px-0 lg:gap-4 h-[350px] sm:h-[450px] lg:h-auto lg:aspect-[640/867] lg:flex-col lg:overflow-y-auto">
              {galleryImages.map((src, i) => (
                <div 
                  key={i} 
                  className="relative w-[85vw] sm:w-[60vw] lg:w-full h-full lg:h-auto lg:aspect-[640/867] shrink-0 snap-center rounded-[24px] lg:rounded-[var(--r-hero)] overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#111]"
                >
                  <Image
                    src={src}
                    alt={`Venue photo ${i + 1}`}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 85vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Venue Info ───────────────────── */}
          <div className="w-full lg:w-[55%] xl:w-[50%] flex flex-col pt-6 lg:pt-2 max-w-[700px] px-6 sm:px-10 lg:px-0">
            <h1 className="text-white text-[36px] sm:text-[46px] lg:text-[54px] font-bold tracking-[-0.05em] leading-[1.1] mb-5 lg:mb-7">
              Nine Ball Cafe
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 mb-8 lg:mb-9">
              <Badge icon="/assets/icon-activity.svg" iconAlt="Activity count" label="1 Activity" />
              <Badge icon="/assets/icon-clock.svg" iconAlt="Price per hour" label="from 500/hr" />
              <Badge icon="/assets/icon-cash.svg" iconAlt="Payment method" label="Cash Accepted" variant="green" />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <ActivityCard />
              <VenueLocation />
              
              {/* Desktop Booking Bar (Hidden on Mobile) */}
              <div className="hidden lg:block mt-4">
                <BookingBar onBookClick={() => setIsBookingOpen(true)} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── FLOATING MOBILE CTA ────────────────────── */}
      <div className="fixed lg:hidden bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-[400px]">
        <div className="shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-[32px] overflow-hidden backdrop-blur-xl bg-black/40 border border-[rgba(255,255,255,0.08)] p-1">
          <BookingBar onBookClick={() => setIsBookingOpen(true)} />
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
