"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const isEnglish = pathname ? pathname === "/en" || pathname.startsWith("/en/") : false;

  React.useEffect(() => {
    setMounted(true);

    const checkScroll = () => {
      const scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      const launchSection = document.getElementById("launch-section");

      if (launchSection) {
        // Calculate the position of the Launch Section
        const rect = launchSection.getBoundingClientRect();
        // Visible when user has scrolled to or past the launch section
        const isPastLaunch =
          rect.top <= window.innerHeight * 0.4 ||
          (launchSection.offsetTop > 0 && scrollY >= launchSection.offsetTop - 150);
        setVisible(isPastLaunch);
      } else {
        // Fallback for pages without a launch section (such as /join, /en/join)
        setVisible(scrollY > 350);
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    // Initial check
    checkScroll();

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!mounted) return null;

  const content = (
    <div
      id="floating-back-to-top"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 2147483647,
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.85)",
        transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s ease",
      }}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={isEnglish ? "Back to top" : "वर जा"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          backgroundColor: "#ff5f00",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "14px",
          padding: "12px 22px",
          borderRadius: "9999px",
          border: "2px solid #ffffff",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 95, 0, 0.6)",
          cursor: "pointer",
          outline: "none",
          userSelect: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#e05300";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ff5f00";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <ArrowUp style={{ width: "20px", height: "20px", strokeWidth: 3 }} />
        <span>{isEnglish ? "Back to Top" : "वर जा"}</span>
      </button>
    </div>
  );

  return createPortal(content, document.body);
}
