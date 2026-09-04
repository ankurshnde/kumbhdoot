"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Eye, Minus, Plus, X, Calendar, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useLanguage, useAccessibility } from "@/context/LanguageContext";

export function SiteHeader() {
  const { language, toggleLanguage, t } = useLanguage();
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    highContrast,
    toggleHighContrast,
  } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isEnglish = language === "en";
  const homeUrl = isEnglish ? "/en" : "/";
  const joinUrl = isEnglish ? "/en/join" : "/join";
  const isJoinPage = pathname === "/join" || pathname === "/en/join";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    const isHomePage = pathname === "/" || pathname === "/en";
    if (isHomePage) {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home page with hash
      e.preventDefault();
      router.push(`${homeUrl}#${hash}`);
    }
  };

  const [isVisible, setIsVisible] = React.useState(true);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < 60 || mobileMenuOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 8) {
        // Scrolling down -> hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current && lastScrollY.current - currentScrollY > 8) {
        // Scrolling up -> show
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t("About", "माहिती"), hash: "challenge" },
    { label: t("Vision", "दृष्टी"), hash: "vision" },
    { label: t("Architecture", "रचना"), hash: "architecture" },
    { label: t("Agentic App Features", "एजेंटिक ॲप वैशिष्ट्ये"), hash: "features" },
    { label: t("Services", "सेवा"), hash: "services" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "shadow-md" : ""}`}
    >
      {/* Top Accessibility Bar */}
      <div className="bg-muted border-b border-border py-1 text-muted-foreground transition-colors duration-300">
        <div className="container mx-auto px-4 flex items-center justify-end gap-3 text-xs">
          {/* Language Toggle */}
          <div className="flex items-center gap-1.5 mr-2">
            <span
              className={`text-[10px] font-semibold transition-colors duration-300 ${
                language === "en"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground/60"
              }`}
            >
              EN
            </span>
            <Switch
              checked={language === "mr"}
              onCheckedChange={toggleLanguage}
              aria-label="Toggle Marathi language"
              className="cursor-pointer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
            <span
              className={`text-[10px] font-semibold transition-colors duration-300 ${
                language === "mr"
                  ? "text-foreground font-bold"
                  : "text-muted-foreground/60"
              }`}
            >
              मराठी
            </span>
          </div>

          <Separator
            orientation="vertical"
            className="h-4 bg-border/80 hidden sm:block"
          />

          {/* Text Size Control */}
          <span className="text-[10px] hidden sm:inline">
            {t("Accessibility:", "सुलभता:")}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseFontSize}
            className="h-6 w-6 border-border hover:bg-accent text-foreground"
            title="Decrease text size"
            aria-label="Decrease text size"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-[10px] w-8 text-center font-medium text-foreground">
            {fontSize}%
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={increaseFontSize}
            className="h-6 w-6 border-border hover:bg-accent text-foreground"
            title="Increase text size"
            aria-label="Increase text size"
          >
            <Plus className="h-3 w-3" />
          </Button>

          <Separator orientation="vertical" className="h-4 bg-border/80" />

          {/* Contrast Toggle */}
          <Button
            variant={highContrast ? "default" : "outline"}
            size="sm"
            onClick={toggleHighContrast}
            className={`h-6 px-2 flex items-center gap-1 text-[10px] font-medium border-border transition-all ${
              highContrast
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "hover:bg-accent text-foreground"
            }`}
            title="Toggle contrast mode"
            aria-label="Toggle high contrast mode"
          >
            <Eye className="h-3 w-3" />
            <span className="hidden sm:inline">
              {t("Contrast", "कॉन्ट्रास्ट")}
            </span>
          </Button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Name */}
        <Link
          href={homeUrl}
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden border border-border shadow-sm flex items-center justify-center bg-card transition-transform duration-300 hover:scale-105">
            <Image
              src="/assets/kumbh-logo-circle-DbUeAwY3.png"
              alt="KumbhDoot Logo"
              fill
              className="object-cover p-0.5"
              sizes="56px"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground leading-tight tracking-wide">
              {t("KumbhDoot", "कुंभदूत")}
            </p>
          </div>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.hash}
              href={`${homeUrl}#${link.hash}`}
              onClick={(e) => handleNavClick(e, link.hash)}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Join Us Button */}
          <Link
            href={joinUrl}
            className="text-xs font-bold bg-primary text-white hover:bg-primary/90 px-4 py-1.5 rounded-full transition-all duration-300 inline-flex items-center shadow-xs"
          >
            {t("Join Us", "सहभागी व्हा")}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href={joinUrl}
            className="text-xs font-bold bg-primary text-white hover:bg-primary/90 px-3 py-1 rounded-full shadow-xs"
          >
            {t("Join Us", "सहभागी व्हा")}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            className="text-foreground hover:bg-accent"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Drawer (Dialog Overlay) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden bg-black/80 animate-in fade-in-0 duration-200 cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-72 bg-background border-l border-border p-6 shadow-xl flex flex-col gap-6 animate-in slide-in-from-right duration-300 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/kumbh-logo-circle-DbUeAwY3.png"
                  alt="KumbhDoot"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span className="font-bold text-sm text-foreground">
                  {t("KumbhDoot", "कुंभदूत")}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:bg-accent"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex flex-col gap-2">
              <Link
                href={homeUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-foreground hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-all duration-200"
              >
                {t("Home", "मुख्यपृष्ठ")}
              </Link>
              {navLinks.map((link) => (
                <a
                  key={link.hash}
                  href={`${homeUrl}#${link.hash}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, link.hash);
                  }}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}

              <div className="h-[1px] bg-border my-2" />

              <Link
                href={joinUrl}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold bg-primary text-white hover:bg-primary/90 px-4 py-2.5 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-1 shadow-sm"
              >
                <span>{t("Join Us", "सहभागी व्हा")}</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
