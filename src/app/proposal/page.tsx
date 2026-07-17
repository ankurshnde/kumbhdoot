import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KumbhDoot Proposal PDF",
  description: "Official Proposal Document for KumbhDoot - Agentic AI doot for pilgrims.",
  icons: {
    icon: [
      { url: "/favicon.png?v=3", type: "image/png" },
      { url: "/icon.png?v=3", type: "image/png" }
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/icon.png?v=3",
  },
};

export default function ProposalPage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <iframe
        src="/docs/KumbhDoot_Proposal.pdf"
        className="w-full h-full border-none"
        title="KumbhDoot Proposal PDF"
      />
    </div>
  );
}
