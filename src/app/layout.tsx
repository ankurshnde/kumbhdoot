import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1a40",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kumbhdoot.org"),
  title: "KumbhDoot — World's First AI Agent Framework for a Mass Gathering | Nashik Kumbh Mela 2027",
  description: "Empowering 50 million pilgrims at Nashik Kumbh Mela 2027 with an AI Doot for Every Pilgrim — a voice-first, multilingual system ensuring safety, dignity, and seamless services.",
  authors: [{ name: "Government of Maharashtra" }],
  icons: {
    icon: [
      { url: "/favicon.png?v=3", type: "image/png" },
      { url: "/icon.png?v=3", type: "image/png" }
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/icon.png?v=3",
  },
  openGraph: {
    title: "KumbhDoot — World's First AI Agent Framework for a Mass Gathering",
    description: "Empowering 50 million pilgrims at Nashik Kumbh Mela 2027 with an AI Doot for Every Pilgrim — a voice-first, multilingual system ensuring safety, dignity, and seamless services.",
    type: "website",
    images: ["/assets/launch_delhi.jfif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "KumbhDoot — World's First AI Agent Framework for a Mass Gathering",
    description: "Empowering 50 million pilgrims at Nashik Kumbh Mela 2027 with an AI Doot for Every Pilgrim — a voice-first, multilingual system ensuring safety, dignity, and seamless services.",
    images: ["/assets/launch_delhi.jfif"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentProject",
    "name": "KumbhDoot",
    "url": "https://www.kumbhdoot.org",
    "logo": "https://www.kumbhdoot.org/assets/kumbh-logo-circle-DbUeAwY3.png",
    "description": "KumbhDoot provides a personal AI agent for every pilgrim at Nashik Kumbh Mela 2027. Voice-first, multilingual, privacy-preserving. Led by Chief Advisor Kaustubh Dhavse, Commissioner Shekhar Singh, Dr. Praveen Gedam, and Dr. Ramesh Raskar.",
    "sponsor": {
      "@type": "GovernmentOrganization",
      "name": "Government of Maharashtra"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Kaustubh Dhavse",
        "jobTitle": "Chief Advisor to CM, Maharashtra",
        "sameAs": "https://www.linkedin.com/in/kdhavse/"
      },
      {
        "@type": "Person",
        "name": "Dr. Praveen Gedam",
        "jobTitle": "Divisional Commissioner, Nashik",
        "sameAs": "https://en.wikipedia.org/wiki/Praveen_Gedam"
      },
      {
        "@type": "Person",
        "name": "Shekhar Singh",
        "jobTitle": "Commissioner of Kumbh Mela, Nashik",
        "sameAs": "https://www.linkedin.com/in/shekhar-singh-0297735/"
      },
      {
        "@type": "Person",
        "name": "Dr. Ramesh Raskar",
        "jobTitle": "MIT & Project NANDA Founder",
        "sameAs": "https://www.linkedin.com/in/raskar"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

