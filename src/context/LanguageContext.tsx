"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";

export type Language = "en" | "mr";

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (en: string, mr: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  defaultLanguage = "mr",
}: {
  children: React.ReactNode;
  defaultLanguage?: Language;
}) {
  const [language, setLanguageState] = React.useState<Language>(defaultLanguage);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      setLanguageState("en");
    } else {
      setLanguageState("mr");
    }
  }, [pathname]);

  const toggleLanguage = React.useCallback(() => {
    if (language === "en") {
      // Switch to Marathi route
      if (pathname.startsWith("/en/")) {
        const target = pathname.replace(/^\/en/, "");
        router.push(target || "/");
      } else if (pathname === "/en") {
        router.push("/");
      } else {
        setLanguageState("mr");
      }
    } else {
      // Switch to English route
      if (pathname === "/") {
        router.push("/en");
      } else if (!pathname.startsWith("/en")) {
        router.push(`/en${pathname}`);
      } else {
        setLanguageState("en");
      }
    }
  }, [language, pathname, router]);

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = React.useCallback(
    (en: string, mr: string) => {
      return language === "en" ? en : mr;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function useAccessibility() {
  const [fontSize, setFontSize] = React.useState(100);
  const [highContrast, setHighContrast] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.fontSize = `${fontSize}%`;
    }
  }, [fontSize]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (highContrast) {
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("high-contrast");
      }
    }
  }, [highContrast]);

  const increaseFontSize = React.useCallback(() => {
    setFontSize((prev) => Math.min(prev + 10, 150));
  }, []);

  const decreaseFontSize = React.useCallback(() => {
    setFontSize((prev) => Math.max(prev - 10, 80));
  }, []);

  const toggleHighContrast = React.useCallback(() => {
    setHighContrast((prev) => !prev);
  }, []);

  return {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    highContrast,
    toggleHighContrast,
  };
}
