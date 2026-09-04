import type { Metadata } from "next";
import { EVENTS } from "@/data/events";

export const metadata: Metadata = {
  title: "Events & Participation",
  description:
    "Explore upcoming Kumbhathon innovation sprints, hackathons, and global summit milestones from MIT Media Lab, IIT Delhi, and Davos for Nashik Kumbh Mela 2027.",
  alternates: {
    canonical: "https://www.kumbhdoot.org/join",
    languages: {
      "mr-IN": "https://www.kumbhdoot.org/join",
      "en-IN": "https://www.kumbhdoot.org/en/join",
      "x-default": "https://www.kumbhdoot.org/join",
    },
  },
  openGraph: {
    title: "Events & Participation | KumbhDoot — Nashik Kumbh Mela 2027",
    description:
      "Explore upcoming Kumbhathon innovation sprints, hackathons, and global summits. Build AI-First Kumbh with KumbhDoot.",
    url: "https://www.kumbhdoot.org/join",
    siteName: "KumbhDoot",
    type: "website",
    images: [
      {
        url: "/assets/launch_delhi.jfif",
        width: 1200,
        height: 630,
        alt: "KumbhDoot Events & Innovation Sprints",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Participation | KumbhDoot — Nashik Kumbh Mela 2027",
    description:
      "Explore upcoming Kumbhathon innovation sprints, hackathons, and global summits for Nashik 2027.",
    images: ["/assets/launch_delhi.jfif"],
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KumbhDoot Events & Innovation Sprints",
    "itemListElement": EVENTS.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        "name": event.title.en,
        "description": event.description.en,
        "startDate": event.startDate,
        ...(event.endDate ? { "endDate": event.endDate } : {}),
        "eventStatus":
          event.status === "upcoming"
            ? "https://schema.org/EventScheduled"
            : "https://schema.org/EventCompleted",
        "eventAttendanceMode":
          event.location.en.toLowerCase().includes("virtual") ||
          event.location.en.toLowerCase().includes("online")
            ? "https://schema.org/OnlineEventAttendanceMode"
            : "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": event.location.en,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": event.location.city,
            "addressCountry": "IN",
          },
        },
        "organizer": {
          "@type": "Organization",
          "name": "KumbhDoot & Project NANDA",
          "url": "https://www.kumbhdoot.org",
        },
        "offers": {
          "@type": "Offer",
          "url": event.lumaUrl,
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
        },
        ...(event.image ? { image: `https://www.kumbhdoot.org${event.image}` } : {}),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />
      {children}
    </>
  );
}
