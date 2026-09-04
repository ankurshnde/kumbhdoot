import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KumbhDoot — World's First AI Agent Framework for a Mass Gathering | Nashik Kumbh Mela 2027",
  description:
    "Empowering 50 million pilgrims at Nashik Kumbh Mela 2027 with an AI Doot for Every Pilgrim — a voice-first, multilingual system ensuring safety, dignity, and seamless services.",
  alternates: {
    canonical: "https://www.kumbhdoot.org/en",
    languages: {
      "mr-IN": "https://www.kumbhdoot.org",
      "en-IN": "https://www.kumbhdoot.org/en",
      "x-default": "https://www.kumbhdoot.org",
    },
  },
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
