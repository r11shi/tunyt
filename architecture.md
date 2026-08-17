# Tunyt Web Application Architecture

## 1. Overview
Tunyt is a sleek, modern booking application for venues (e.g., Pool Billiards, Cafes, Turf). It is built with **Next.js 15 (App Router)** and utilizes **Framer Motion** for Apple-like, high-fidelity micro-interactions.

## 2. Tech Stack
- **Framework**: Next.js (App Router, React 19)
- **Styling**: Tailwind CSS, PostCSS, Custom utility classes (e.g., iOS-like scrolling masks).
- **Animation**: Framer Motion (fast out, no bounce springs, crossfade transitions).
- **Icons**: Lucide React.
- **Language**: TypeScript.

## 3. Directory Structure
```
src/
├── app/
│   ├── globals.css         # Global Tailwind layers and custom utility classes
│   ├── layout.tsx          # Root layout, fonts (Inter), HTML/Body skeleton
│   └── page.tsx            # Main Venue details page (Hero, Gallery, Info, Booking CTA)
├── components/
│   ├── booking-steps/      # Multi-step booking form UI
│   │   ├── StepDateSlot.tsx # Date & Time slot picker
│   │   ├── StepPlayers.tsx  # Player count adjustment
│   │   ├── StepDetails.tsx  # Dynamic multi-player info collection
│   │   ├── StepReview.tsx   # Booking review and discount entry
│   │   ├── StepPayment.tsx  # Split-payment and final confirmation
│   │   └── StepTicket.tsx   # Final success state and confetti
│   ├── BookingModal.tsx    # Orchestrates steps, manages shared state (`BookingData`)
│   ├── ActivityCard.tsx    # Details card for the selected activity
│   ├── VenueLocation.tsx   # Location card component
│   └── Badge.tsx           # Reusable badge for amenities/tags
└── lib/
    └── utils.ts            # Tailwind `cn` utility
```

## 4. Key Design Patterns
### The Booking Flow (State Machine)
The booking flow is managed entirely in `BookingModal.tsx`. 
- **`step` State**: An integer (1 to 6) representing the current view.
- **`direction` State**: Tracks whether the user is moving forward (1) or backward (-1). This is passed to Framer Motion's `<AnimatePresence custom={direction}>` to determine which way the sliding animation happens.
- **`bookingData` State**: A central object holding all accumulated data (duration, price, date, time, player count, user details, payment preference). Passed down as props to each step.
- **Smart Skipping**: If a single player books, `BookingModal` intelligently skips the "Details" collection step and routes directly to the "Review" step, keeping the UX frictionless.

### UI / UX Philosophy
- **Micro-animations**: Every button uses `active:scale-[0.97]` and transition durations (typically `200ms`) for a tactile feel.
- **Progressive Disclosure**: Information is collected step-by-step rather than via a long scrollable form. 
- **Dark Mode First**: UI relies on highly refined opacities (`rgba(255,255,255,0.04)`) and subtle inset shadows (`box-shadow: inset 0px 1px 1px rgba...`) to create depth and glass-like premium surfaces.
