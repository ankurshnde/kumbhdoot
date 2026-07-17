"use client";

import * as React from "react";
import Image from "next/image";
import { 
  Users, 
  Calendar, 
  Languages, 
  Cpu, 
  Sparkles, 
  Waves, 
  MapPin, 
  Heart, 
  Map, 
  Building, 
  Store, 
  CheckCircle2, 
  Menu, 
  Eye, 
  Minus, 
  Plus, 
  ArrowDown, 
  X,
  ExternalLink
} from "lucide-react";

// Custom LinkedIn Icon because the icon is not exported in this environment's lucide-react version
function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

// Language State Context
type Language = "en" | "mr";
interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (en: string, mr: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

function LanguageProvider({ children, defaultLanguage = "mr" }: { children: React.ReactNode; defaultLanguage?: Language }) {
  const [language, setLanguage] = React.useState<Language>(defaultLanguage);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      setLanguage("en");
    } else {
      setLanguage("mr");
    }
  }, [pathname]);

  const toggleLanguage = React.useCallback(() => {
    if (language === "en") {
      router.push("/");
    } else {
      router.push("/en");
    }
  }, [language, router]);

  const t = React.useCallback((en: string, mr: string) => {
    return language === "en" ? en : mr;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

// Accessibility Hook
function useAccessibility() {
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

// Scroll reveal hook
function useScrollReveal() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-in-up");
          el.classList.remove("opacity-0");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// Components
function Header({
  fontSize,
  increaseFontSize,
  decreaseFontSize,
  highContrast,
  toggleHighContrast,
}: {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
}) {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: t("About", "माहिती"), href: "#challenge" },
    { label: t("Vision", "दृष्टी"), href: "#vision" },
    { label: t("Architecture", "रचना"), href: "#architecture" },
    { label: t("Agentic App Features", "एजेंटिक ॲप वैशिष्ट्ये"), href: "#features" },
    { label: t("Services", "सेवा"), href: "#services" },
    { label: t("Contact", "संपर्क"), href: "#footer" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border transition-colors duration-300">
      {/* Top Accessibility Bar */}
      <div className="bg-muted border-b border-border py-1 text-muted-foreground transition-colors duration-300">
        <div className="container mx-auto px-4 flex items-center justify-end gap-3 text-xs">
          {/* Language Toggle */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className={`text-[10px] font-semibold transition-colors duration-300 ${language === "en" ? "text-foreground" : "text-muted-foreground/60"}`}>
              EN
            </span>
            <Switch
              checked={language === "mr"}
              onCheckedChange={toggleLanguage}
              aria-label="Toggle Marathi language"
              className="cursor-pointer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
            <span className={`text-[10px] font-semibold transition-colors duration-300 ${language === "mr" ? "text-foreground" : "text-muted-foreground/60"}`}>
              मराठी
            </span>
          </div>

          <Separator orientation="vertical" className="h-4 bg-border/80 hidden sm:block" />

          {/* Text Size Control */}
          <span className="text-[10px] hidden sm:inline">{t("Accessibility:", "सुलभता:")}</span>
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
          <span className="text-[10px] w-8 text-center font-medium text-foreground">{fontSize}%</span>
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
            <span className="hidden sm:inline">{t("Contrast", "कॉन्ट्रास्ट")}</span>
          </Button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Name */}
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="relative h-14 w-14 rounded-full overflow-hidden border border-border shadow-sm flex items-center justify-center bg-card transition-transform duration-300 hover:scale-110">
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
              {t("Kumbhdoot", "कुंभदूत")}
            </p>
          </div>
        </a>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const id = link.href.replace("#", "");
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/proposal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold border border-primary text-primary hover:bg-primary hover:text-white px-4 py-1.5 rounded-full transition-all duration-300 inline-flex items-center"
          >
            {t("View Proposal", "प्रस्ताव पहा")}
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
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
            className="fixed inset-y-0 right-0 w-64 bg-background border-l border-border p-6 shadow-xl flex flex-col gap-8 animate-in slide-in-from-right duration-300 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
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
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const id = link.href.replace("#", "");
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-xl transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <div className="h-[1px] bg-border my-2" />
              <a
                href="/proposal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("View Proposal", "प्रस्ताव पहा")}
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  const { t, language } = useLanguage();
  const revealRef = useScrollReveal();
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { icon: Users, value: "50M+", label: t("Pilgrims", "भाविक") },
    { icon: Calendar, value: "45", label: t("Days", "दिवस") },
    { icon: Languages, value: "20+", label: t("Languages", "भाषा") },
    { icon: Cpu, value: "7+", label: t("National DPI Integrations", "राष्ट्रीय DPI एकत्रीकरण") },
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-cream py-14 md:py-20 transition-colors duration-300">
      {/* Parallax Background Blobs */}
      <div 
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      />
      <div 
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Heading and Details */}
          <div className="text-left space-y-6">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary">
              {t("Nashik Kumbh Mela 2027", "नाशिक कुंभमेळा २०२७")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
              {t("World's First AI Agent Framework ", "जगातील पहिली AI एजंट फ्रेमवर्क ")}
              <span className="text-primary">{t("for a Mass Gathering", "अथांग जनसमुदायासाठी")}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {language === "en" ? (
                <>
                  Empowering 50 million pilgrims at Nashik Kumbh Mela 2027 with an{" "}
                  <span className="underline decoration-primary decoration-2 underline-offset-4 font-semibold text-foreground">
                    AI Doot for Every Pilgrim
                  </span>{" "}
                  — a voice-first, multilingual system ensuring safety, dignity, and seamless services.
                </>
              ) : (
                <>
                  <span className="underline decoration-primary decoration-2 underline-offset-4 font-semibold text-foreground">
                    प्रत्येक भाविकासाठी एक AI दूत
                  </span>{" "}
                  द्वारे नाशिक कुंभमेळा २०२७ मधील ५ कोटी भाविकांना सक्षम करणे — सुरक्षा, सन्मान आणि अखंड सेवा सुनिश्चित करणारी व्हॉइस-फर्स्ट, बहुभाषिक प्रणाली.
                </>
              )}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="https://kumbhdoot.app" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 px-6 rounded-lg transition-all flex items-center justify-center text-sm shadow-sm">
                  {t("See It In Action", "प्रत्यक्ष पहा")}
                </Button>
              </a>
              <a href="/proposal" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button variant="outline" className="border border-primary/30 hover:bg-accent text-foreground font-semibold h-11 px-6 rounded-lg transition-all flex items-center justify-center text-sm shadow-sm">
                  {t("View Proposal", "प्रस्ताव पहा")}
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: YouTube Iframe */}
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-primary/20 bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/zrCArI6xmjk?autoplay=1&loop=1&playlist=zrCArI6xmjk&mute=0"
              title="KumbhDoot Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={revealRef}
          className="opacity-0 grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-opacity duration-300"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/40 group"
            >
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
              <p className="text-3xl font-extrabold text-primary tracking-tight">
                {stat.value}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground/80 mt-1.5 tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChallengeSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  return (
    <section id="challenge" className="py-14 md:py-20 bg-background transition-colors duration-300">
      <div
        ref={revealRef}
        className="opacity-0 container mx-auto px-4 text-center max-w-4xl space-y-6"
      >
        <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary">
          {t("Understanding the Scale", "व्याप्ती समजून घेणे")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {t("The Challenge", "आव्हान")}
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg sm:text-xl">
          {t("Kumbh Mela is the largest peaceful gathering on Earth. Over ", "कुंभमेळा हा पृथ्वीवरील सर्वात मोठा शांततापूर्ण मेळावा आहे. केवळ ४५ दिवसांत ")}
          <span className="font-bold text-foreground text-primary underline underline-offset-4 decoration-wavy decoration-primary/30">
            {t("50 million pilgrims", "५ कोटी भाविक")}
          </span>
          {t(
            " converge on a single city in just 45 days. Traditional systems cannot coordinate real-time crowd flow, multilingual communication, and health emergencies at this scale. A fundamentally new, decentralized, doot-driven approach is required.",
            " एकाच शहरात एकत्र येतात. पारंपारिक यंत्रणा या प्रमाणात रिअल-टाइम गर्दी व्यवस्थापन, बहुभाषिक संवाद आणि आरोग्य आणीबाणी समन्वयित करू शकत नाहीत. मूलभूतपणे नवीन, विकेंद्रित, दूत-चालित दृष्टिकोन आवश्यक आहे."
          )}
        </p>
      </div>
    </section>
  );
}

function VisionSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const personas = [
    {
      name: t("Sitabai", "सीताबाई"),
      detail: t("60-year-old Bhojpuri-speaking pilgrim", "६० वर्षीय भोजपुरी भाषिक भाविक"),
      quote: t(
        "She speaks to her KumbhDoot in Bhojpuri. It books her dharamshala, finds her a vegetarian thali nearby, reminds her of her medicine, and guides her to the safest bathing ghat — all by voice. She navigates Kumbh with dignity, without depending on anyone.",
        "ती तिच्या कुंभदूतशी भोजपुरीत बोलते. तो तिची धर्मशाळा बुक करतो, जवळचे शाकाहारी थाळी शोधतो, तिला औषधाची आठवण करून देतो आणि तिला सर्वात सुरक्षित स्नानघाटाकडे मार्गदर्शन करतो — सर्व काही आवाजाद्वारे. ती कोणावरही अवलंबून न राहता सन्मानाने कुंभमेळा अनुभवते."
      ),
    },
    {
      name: t("Murugan Family", "मुरुगन कुटुंब"),
      detail: t("Tamil family arriving at midnight", "मध्यरात्री पोहोचणारे तमिळ कुटुंब"),
      quote: t(
        "Their KumbhDoot doot arranges Tamil-speaking accommodation, finds a South Indian restaurant open late, and creates a next-day itinerary aligned with auspicious timings — all before they even ask.",
        "त्यांचा कुंभदूत तमिळ भाषिक निवास व्यवस्था करतो, रात्री उशीरा उघडे असलेले दक्षिण भारतीय रेस्टॉरंट शोधतो आणि शुभ मुहूर्तांनुसार दुसऱ्या दिवसाचे वेळापत्रक तयार करतो — त्यांनी विचारण्यापूर्वीच."
      ),
    },
    {
      name: t("Raju", "राजू"),
      detail: t("Local flower seller", "स्थानिक फुलविक्रेता"),
      quote: t(
        "Through KumbhDoot's vendor discovery, Raju is now visible to pilgrims searching for 'puja flowers near me' in any language. His daily income triples during Kumbh.",
        "कुंभदूतच्या विक्रेता शोध यंत्रणेद्वारे, राजू आता कोणत्याही भाषेत 'जवळची पूजा फुले' शोधणाऱ्या भाविकांना दिसतो. कुंभमेळ्यात त्याचे दैनंदिन उत्पन्न तिपटीने वाढते."
      ),
    },
  ];

  return (
    <section id="vision" className="py-14 md:py-20 bg-cream transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary">
            {t("The Vision", "दृष्टी")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("Agentic Kumbh", "एजेंटिक कुंभ")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {t(
              "One personal AI doot for every pilgrim. Voice-first, multilingual, and privacy-preserving. Intelligent enough to anticipate needs, contextual enough to act on them, and personal enough to earn trust.",
              "प्रत्येक भाविकासाठी एक वैयक्तिक AI दूत. व्हॉइस-फर्स्ट, बहुभाषिक आणि गोपनीयता-जपणारे. गरजा ओळखण्याइतके बुद्धिमान, त्यावर कृती करण्याइतके संदर्भ-जाणकार आणि विश्वास कमावण्याइतके वैयक्तिक."
            )}
          </p>
        </div>

        {/* Personas Cards */}
        <div
          ref={revealRef}
          className="opacity-0 grid md:grid-cols-3 gap-8"
        >
          {personas.map((persona) => (
            <div
              key={persona.name}
              className="bg-card border-l-4 border-l-primary border-t border-r border-b border-border rounded-r-xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="space-y-3">
                <p className="font-bold text-foreground text-lg leading-snug">
                  {persona.name}
                </p>
                <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  {persona.detail}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                  &ldquo;{persona.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();
  const [zoomOpen, setZoomOpen] = React.useState(false);

  const layers = [
    {
      icon: Users,
      title: t("Layer 3: Citizen Doots", "स्तर ३: नागरिक दूत"),
      description: t(
        "Every pilgrim gets a Personal AI Twin — a voice-first, multilingual doot that understands their needs, preferences, and context. It acts as their trusted digital companion throughout the Kumbh journey.",
        "प्रत्येक भाविकाला एक वैयक्तिक AI ट्विन मिळतो — एक व्हॉइस-फर्स्ट, बहुभाषिक दूत जो त्यांच्या गरजा, प्राधान्ये आणि संदर्भ समजतो. तो संपूर्ण कुंभ प्रवासात त्यांचा विश्वसनीय डिजिटल साथीदार म्हणून काम करतो."
      ),
    },
    {
      icon: Cpu,
      title: t("Layer 2: Uber Doots / Infrastructure", "स्तर २: उबर दूत / पायाभूत सुविधा"),
      description: t(
        "A routing and orchestration layer that connects citizen doots to services. Handles Identity, Context, Health, Payment, Commerce, and Governance — ensuring seamless, secure interactions.",
        "नागरिक दूतांना सेवांशी जोडणारा राउटिंग आणि ऑर्केस्ट्रेशन स्तर. ओळख, संदर्भ, आरोग्य, पेमेंट, वाणिज्य आणि शासन हाताळतो — अखंड, सुरक्षित परस्परसंवाद सुनिश्चित करतो."
      ),
    },
    {
      icon: Sparkles,
      title: t("Layer 1: Service Startups", "स्तर १: सेवा स्टार्टअप्स"),
      description: t(
        "14,500+ providers including Homestays, Doctors, Food Vendors, Govt Schemes, and NGOs — all discoverable and bookable through the doot network.",
        "होमस्टे, डॉक्टर, खाद्य विक्रेते, सरकारी योजना आणि NGO यांसह १४,५००+ प्रदाते — सर्व दूत नेटवर्कद्वारे शोधता आणि बुक करता येतात."
      ),
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary">
            {t("System Design", "प्रणाली रचना")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("The 3-Layer Architecture", "३-स्तरीय रचना")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
            {t(
              "A decentralized, doot-driven architecture that connects pilgrims to services through intelligent orchestration.",
              "एक विकेंद्रित, दूत-चालित रचना जी बुद्धिमान ऑर्केस्ट्रेशनद्वारे भाविकांना सेवांशी जोडते."
            )}
          </p>
        </div>

        {/* Diagram and Layers List Grid */}
        <div
          ref={revealRef}
          className="opacity-0 grid md:grid-cols-2 gap-10 items-stretch"
        >
          {/* Left: Architecture Diagram clickable */}
          <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
            <DialogTrigger
              nativeButton={false}
              render={
                <div className="rounded-xl overflow-hidden border border-border shadow-sm flex items-center justify-center bg-muted cursor-pointer group relative min-h-[300px]">
                  <Image
                    src="/assets/architecture-diagram-B7ABMi_U.jpg"
                    alt={t("KumbhDoot 3-Layer Architecture Diagram", "कुंभदूत ३-स्तरीय रचना आकृती")}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              }
            />
            <DialogContent className="max-w-4xl w-[95vw] sm:max-w-4xl p-0 bg-transparent border-none ring-0 shadow-none overflow-hidden outline-none">
              <img
                src="/assets/architecture-diagram-B7ABMi_U.jpg"
                alt={t("KumbhDoot 3-Layer Architecture Diagram", "कुंभदूत ३-स्तरीय रचना आकृती")}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </DialogContent>
          </Dialog>

          {/* Right: Architectural Stack List */}
          <div className="flex flex-col justify-center">
            {layers.map((layer, idx) => (
              <div key={layer.title} className="flex flex-col items-center">
                <div className="w-full bg-card border border-border rounded-xl p-5 flex gap-4 items-start shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                    <layer.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-bold text-foreground text-base">
                      {layer.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </div>
                {idx < layers.length - 1 && (
                  <div className="flex justify-center my-3">
                    <div className="p-1 bg-primary/10 rounded-full border border-primary/20">
                      <ArrowDown className="h-5 w-5 text-primary animate-bounce duration-1000" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const features = [
    {
      icon: Sparkles,
      title: t("Smart Services", "स्मार्ट सेवा"),
      desc: t(
        "Travel, housing, food, health, maps, and event schedules in one place.",
        "प्रवास, निवास, अन्न, आरोग्य, नकाशे आणि कार्यक्रम वेळापत्रक एकाच ठिकाणी."
      ),
    },
    {
      icon: Waves,
      title: t("Holy Dip Scheduling", "पवित्र स्नान वेळापत्रक"),
      desc: t(
        "Color Sync system allocates safe, crowd-managed bathing time slots.",
        "कलर सिंक प्रणाली सुरक्षित, गर्दी-व्यवस्थापित स्नानाचे वेळापत्रक ठरवते."
      ),
    },
    {
      icon: MapPin,
      title: t("Nearby Discovery", "जवळचे शोधा"),
      desc: t(
        "Find vendors, medical aid, water stations, and puja items around you.",
        "तुमच्या जवळचे विक्रेते, वैद्यकीय मदत, पाण्याची ठिकाणे आणि पूजा साहित्य शोधा."
      ),
    },
    {
      icon: Users,
      title: t("Co-Traveller Groups", "सह-प्रवासी गट"),
      desc: t(
        "Form safe travel circles with AI-powered safety scans and tracking.",
        "AI-सक्षम सुरक्षा स्कॅन आणि ट्रॅकिंगसह सुरक्षित प्रवास गट तयार करा."
      ),
    },
    {
      icon: Heart,
      title: t("Health & Wellness", "आरोग्य आणि कल्याण"),
      desc: t(
        "Personalized health tips, medication reminders, and one-tap SOS.",
        "वैयक्तिक आरोग्य टिप्स, औषध स्मरणपत्रे आणि एक-टॅप SOS."
      ),
    },
    {
      icon: Map,
      title: t("Navigation", "मार्गदर्शन"),
      desc: t(
        "Zone maps, step-by-step directions, and real-time crowd density alerts.",
        "झोन नकाशे, चरण-दर-चरण दिशानिर्देश आणि रिअल-टाइम गर्दी घनता सूचना."
      ),
    },
  ];

  return (
    <section id="features" className="py-14 md:py-20 bg-cream transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary">
            {t("What It Does", "काय करते")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("Agentic App Features", "एजेंटिक ॲप वैशिष्ट्ये")}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
            {t(
              "The Kumbhdoot app is the Agentic AI doot designed to assist pilgrims during their sacred journey to Nashik, Maharashtra in 2026. It offers features like booking holy dip slots, Agents process your travel bookings (trains and buses), accommodation assistance (homestays, camps, dharamshalas), a co-traveller matching service, health and safety tools (emergency SOS, health tracking), and live navigation with real-time maps and crowd alerts.",
              "कुंभ दूत ॲप हे एजेंटिक AI दूत आहे जे 2026 मध्ये नाशिक, महाराष्ट्र येथील पवित्र यात्रेदरम्यान भाविकांना मदत करण्यासाठी तयार केले आहे. यात पवित्र स्नान स्लॉट बुकिंग, एजंट्सद्वारे प्रवास बुकिंग (रेल्वे आणि बस), निवास व्यवस्था (होमस्टे, शिबिरे, धर्मशाळा), सह-प्रवासी जुळणी सेवा, आरोग्य आणि सुरक्षा साधने (आपत्कालीन SOS, आरोग्य ट्रॅकिंग), आणि रिअल-टाइम नकाशे व गर्दी सूचनांसह लाइव्ह नेव्हिगेशन यासारखी वैशिष्ट्ये आहेत."
            )}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          ref={revealRef}
          className="opacity-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border-t-4 border-t-primary border-l border-r border-b border-border rounded-xl p-6 text-center space-y-3.5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-accent text-primary transition-transform duration-300 group-hover:scale-105">
                <feature.icon className="h-5 w-5" />
              </div>
              <p className="font-bold text-foreground text-base">
                {feature.title}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const services = [
    {
      icon: Building,
      title: t("Government-to-Pilgrim", "शासन-ते-भाविक"),
      tag: "G2P",
      items: [
        t("Crowd management & alerts", "गर्दी व्यवस्थापन आणि सूचना"),
        t("Health advisories & SOS", "आरोग्य सल्ला आणि SOS"),
        t("Scheme eligibility checks", "योजना पात्रता तपासणी"),
        t("Emergency coordination", "आणीबाणी समन्वय"),
      ],
    },
    {
      icon: Store,
      title: t("Business-to-Pilgrim", "व्यवसाय-ते-भाविक"),
      tag: "B2P",
      items: [
        t("Housing & dharamshala booking", "निवास आणि धर्मशाळा बुकिंग"),
        t("Transport scheduling", "वाहतूक वेळापत्रक"),
        t("Food & restaurant discovery", "अन्न आणि रेस्टॉरंट शोध"),
        t("Vendor & artisan marketplace", "विक्रेता आणि कारागीर बाजार"),
      ],
    },
    {
      icon: Users,
      title: t("Pilgrim-to-Pilgrim", "भाविक-ते-भाविक"),
      tag: "P2P",
      items: [
        t("Family group coordination", "कुटुंब गट समन्वय"),
        t("Co-traveller formation", "सह-प्रवासी गट निर्मिती"),
        t("Safety network alerts", "सुरक्षा नेटवर्क सूचना"),
        t("Shared itineraries", "सामायिक प्रवास वेळापत्रक"),
      ],
    },
  ];

  return (
    <section id="services" className="py-14 md:py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary">
            {t("Ecosystem", "परिसंस्था")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("Three Service Layers", "तीन सेवा स्तर")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-base sm:text-lg">
            {t(
              "KumbhDoot serves as the connective layer between government, businesses, and pilgrims.",
              "कुंभदूत शासन, व्यवसाय आणि भाविक यांच्यातील जोडणारा स्तर म्हणून काम करतो."
            )}
          </p>
        </div>

        {/* Services Cards */}
        <div
          ref={revealRef}
          className="opacity-0 grid md:grid-cols-3 gap-8"
        >
          {services.map((layer) => (
            <div
              key={layer.tag}
              className="bg-card border-t-4 border-t-primary border-l border-r border-b border-border rounded-xl p-6 shadow-sm flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="text-center pb-4 space-y-3.5">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-accent text-primary">
                  <layer.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {layer.title} <span className="text-primary">({layer.tag})</span>
                </h3>
              </div>
              <Separator className="bg-border/60 mb-4" />
              <ul className="space-y-3 flex-1 flex flex-col justify-center">
                {layer.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2.5">
                    <span className="text-primary text-base font-bold shrink-0 leading-none">•</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FoundationsSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const foundations = [
    {
      title: t("Digital Kumbh 2015 & 2019", "डिजिटल कुंभ २०१५ आणि २०१९"),
      description: t(
        "Deployed real-time crowd monitoring, digital ticketing, and smart sanitation across multiple Kumbh Melas — serving tens of millions.",
        "अनेक कुंभमेळ्यांमध्ये रिअल-टाइम गर्दी निरीक्षण, डिजिटल तिकिट आणि स्मार्ट स्वच्छता उपलब्ध केली — कोट्यवधी लोकांची सेवा केली."
      ),
    },
    {
      title: t("MahaDBT & Aaple Sarkar", "महाDBT आणि आपले सरकार"),
      description: t(
        "Digitized direct benefit transfers and citizen grievance redressal, processing millions of transactions annually across Maharashtra.",
        "थेट लाभ हस्तांतरण आणि नागरिक तक्रार निवारण डिजिटल केले, संपूर्ण महाराष्ट्रात दरवर्षी लाखो व्यवहारांवर प्रक्रिया केली."
      ),
    },
    {
      title: t("Sovereign Cloud & AI Infrastructure", "सॉव्हरिन क्लाउड आणि AI पायाभूत सुविधा"),
      description: t(
        "Invested in MeitY-empanelled sovereign clouds and Bhashini-powered multilingual AI — building the national foundation for agentic governance.",
        "MeitY-सूचीबद्ध सॉव्हरिन क्लाउड आणि भाषिणी-सक्षम बहुभाषिक AI मध्ये गुंतवणूक — दूत-आधारित शासनासाठी राष्ट्रीय पाया बांधणे."
      ),
    },
    {
      title: t("India Stack & DPI Leadership", "इंडिया Stack आणि DPI नेतृत्व"), // changed Stack to Stack as in trans
      description: t(
        "Pioneered Aadhaar, UPI, DigiLocker, and ABDM — enabling consent-driven, privacy-preserving digital infrastructure at population scale.",
        "आधार, UPI, डिजिलॉकर आणि ABDM चे अग्रदूत — लोकसंख्येच्या प्रमाणात संमती-चालित, गोपनीयता-जपणारी डिजिटल पायाभूत सुविधा सक्षम केली."
      ),
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-cream transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary">
            {t("Built on Proven Foundations", "सिद्ध पायावर बांधलेले")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("From Digital Governance to AI Doots", "डिजिटल शासनापासून AI दूतांपर्यंत")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {t(
              "India's prior investments in digital public infrastructure are the training set for KumbhDoot — replacing situational luck with systemic safety.",
              "भारताच्या डिजिटल सार्वजनिक पायाभूत सुविधांमधील पूर्वीच्या गुंतवणुका कुंभदूतसाठी प्रशिक्षण संच आहेत — परिस्थितीजन्य नशिबाची जागा पद्धतशीर सुरक्षिततेने घेत."
            )}
          </p>
        </div>

        {/* Foundations Cards Grid */}
        <div
          ref={revealRef}
          className="opacity-0 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {foundations.map((foundation) => (
            <div
              key={foundation.title}
              className="flex gap-4 items-start p-6 bg-card border border-border rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="shrink-0 mt-0.5">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1.5">
                <p className="font-bold text-foreground text-base leading-snug">
                  {foundation.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {foundation.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContributorsSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const coreTeam = [
    {
      name: t("Kaustubh Dhavse", "कौस्तुभ धवसे"),
      role: t("Chief Advisor to CM, Maharashtra", "मुख्यमंत्री सल्लागार, महाराष्ट्र"),
      image: "/assets/kaustubh_dhavse-C-ejc_C6.jpeg",
      link: "https://www.linkedin.com/in/kdhavse/",
    },
    {
      name: t("Dr. Praveen Gedam", "डॉ. प्रवीण गेडाम"),
      role: t("Divisional Commissioner, Nashik", "विभागीय आयुक्त, नाशिक"),
      image: "/assets/praveen_gedam-CcrrKbSU.avif",
      link: "https://en.wikipedia.org/wiki/Praveen_Gedam",
    },
    {
      name: t("Shekhar Singh", "शेखर सिंग"),
      role: t("Commissioner of Kumbh Mela, Nashik", "कुंभमेळा आयुक्त, नाशिक"),
      image: "/assets/shekhar_singh-UvKUPOVg.jpeg",
      link: "https://www.linkedin.com/in/shekhar-singh-0297735/",
    },
    {
      name: t("Dr. Ramesh Raskar", "डॉ. रमेश रासकर"),
      role: t("MIT & Project NANDA", "MIT आणि प्रोजेक्ट NANDA"),
      image: "/assets/ramesh_raskar-DJ54gFQy.png",
      link: "https://www.linkedin.com/in/raskar",
    },
  ];

  const supportingTeam = [
    {
      name: t("Mahesh Lambe", "महेश लंबे"),
      image: "/assets/mahesh_lambe-Bkgez0kk.jpeg",
      link: "https://www.linkedin.com/in/maheshlambe/",
    },
    {
      name: t("Saurabh Sakalkar", "सौरभ सकळकर"),
      image: "/assets/saurabh_sakalkar-CHCBhIg5.jpeg",
      link: "https://www.linkedin.com/in/peshwa/",
    },
    {
      name: t("Ankur Shinde", "अंकुर शिंदे"),
      image: "/assets/ankur_shinde-ClBdfsF4.png",
      link: "https://www.linkedin.com/in/ankurshinde/",
    },
    {
      name: t("Rekha Singhal", "रेखा सिंगल"),
      image: "/assets/rekha_singhal-9Jhs2r-y.jpeg",
      link: "https://www.linkedin.com/in/rekha-s-7122635/",
    },
    {
      name: t("Gurusha Raskar", "गुरुशा रासकर"),
      image: "/assets/gurusha_raskar-D3Fi9ivX.jpeg",
      link: "https://www.linkedin.com/in/gurusharesearcher/",
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-cream transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-4">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary">
            {t("The Team", "संघ")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("Key Contributors", "प्रमुख योगदानकर्ते")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {t(
              "Key officials, advisors, and institutional partners driving the Agentic Kumbh vision.",
              "एजेंटिक कुंभ दृष्टी चालवणारे प्रमुख अधिकारी, सल्लागार आणि संस्थात्मक भागीदार."
            )}
          </p>
        </div>

        {/* Core Contributors Profiles */}
        <div
          ref={revealRef}
          className="opacity-0 space-y-14"
        >
          <div className="flex flex-wrap justify-center gap-10">
            {coreTeam.map((contributor) => (
              <a
                key={contributor.name}
                href={contributor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 text-center group hover:opacity-95 transition-opacity cursor-pointer"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(217,107,39,0.35)]">
                  <Image
                    src={contributor.image}
                    alt={contributor.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                    itemProp="image"
                  />
                </div>
                <div className="space-y-0.5">
                  <p itemProp="name" className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                    {contributor.name}
                  </p>
                  <p itemProp="jobTitle" className="text-xs text-muted-foreground/80 font-medium">
                    {contributor.role}
                  </p>
                  <meta itemProp="url" content={contributor.link} />
                </div>
              </a>
            ))}
          </div>

          {/* Supporting Contributors Pills */}
          <div className="pt-6">
            <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground/80 text-center mb-6">
              {t("Team", "संघ")}
            </h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {supportingTeam.map((member) => (
                <a
                  key={member.name}
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-card border border-border rounded-full pl-2 pr-4 py-1.5 shadow-sm hover:border-primary/30 hover:scale-[1.03] transition-all cursor-pointer"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-primary/10 shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="28px"
                      itemProp="image"
                    />
                  </div>
                  <p itemProp="name" className="text-xs font-bold text-foreground leading-none hover:text-primary transition-colors">
                    {member.name}
                  </p>
                  <meta itemProp="url" content={member.link} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CMQuoteSection() {
  const { t } = useLanguage();
  return (
    <section className="py-16 bg-cream/30 border-y border-border/50 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-md relative overflow-hidden">
          {/* Left: CM Image Column (5/12 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 bg-muted transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/assets/devendra_fadnavis_final.png"
                alt="Shri Devendra Fadnavis"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="mt-4 text-center space-y-1">
              <p className="font-bold text-foreground text-base">
                {t("Shri Devendra Fadnavis", "श्री. देवेंद्र फडणवीस")}
              </p>
              <p className="text-xs text-primary font-semibold tracking-wide uppercase">
                {t("Hon. Chief Minister of Maharashtra", "मा. मुख्यमंत्री, महाराष्ट्र राज्य")}
              </p>
            </div>
          </div>

          {/* Right: Message Content (7/12 cols) */}
          <div className="md:col-span-7 space-y-6 text-left">
            <div className="relative">
              <span className="absolute -top-6 -left-4 text-6xl text-primary/10 font-serif leading-none">“</span>
              <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed italic relative z-10">
                {t(
                  "Together, let us create a Kumbh that honors tradition while illuminating the future of devotion empowered by technology.",
                  "परंपरेचा सन्मान राखत तंत्रज्ञानाच्या साहाय्याने भक्तीचे भविष्य उजळून टाकणारा कुंभमेळा आपण मिळून साकारूया."
                )}
              </p>
              <span className="absolute -bottom-10 right-4 text-6xl text-primary/10 font-serif leading-none">”</span>
            </div>
            <div className="pt-4 border-t border-border/60">
              <p className="text-sm font-bold text-foreground">
                {t("Government of Maharashtra", "महाराष्ट्र शासन")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("Simhastha Kumbh Mela 2027 Initiative", "सिंहस्थ कुंभमेळा २०२७ उपक्रम")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaunchSection() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  return (
    <section className="py-14 md:py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-6 text-left">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-primary">
              {t("Launch At", "येथे उद्घाटन")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight">
              {t(
                "Official Launch at India AI Impact Summit New Delhi",
                "नवी दिल्ली येथील इंडिया AI इम्पॅक्ट समिटमध्ये अधिकृत उद्घाटन"
              )}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                {t(
                  "At the India AI Impact Summit 2026 in New Delhi, Hon. Chief Minister Devendra Fadnavis launched KumbhDoot - an AI Doot initiative for the upcoming Simhastha Kumbh Mela 2027 in Nashik.",
                  "नवी दिल्ली येथील 'इंडिया AI इम्पॅक्ट समिट २०२६' मध्ये, श्री. मुख्यमंत्री देवेंद्र फडणवीस यांनी नाशिक येथील आगामी सिंहस्थ कुंभमेळा २०२७ साठी 'कुंभदूत' या AI दूत उपक्रमाचे उद्घाटन केले."
                )}
              </p>
              <p>
                {t(
                  "The launch took place in the presence of Minister Adv. Ashish Shelar, Minister Nitesh Rane, and Chief Advisor to the CM Mr. Kaustubh Dhavse, along with senior ministry leadership and the Nashik administration, including Divisional Commissioner Dr. Praveen Gedam and Commissioner of Kumbh Mela Mr. Shekhar Singh.",
                  "या उद्घाटनास आमदार व मंत्री ॲड. आशिष शेलार, मंत्री नितेश राणे, आणि मुख्यमंत्र्यांचे मुख्य सल्लागार श्री. कौस्तुभ धवसे, तसेच विभागीय आयुक्त डॉ. प्रवीण गेडाम आणि कुंभमेळा आयुक्त श्री. शेखर सिंग यांच्यासह वरिष्ठ मंत्रालय नेतृत्व आणि नाशिक प्रशासनाची उपस्थिती होती."
                )}
              </p>
            </div>
          </div>

          {/* Right Column: Launch Image */}
          <div ref={revealRef} className="opacity-0 w-full relative rounded-2xl overflow-hidden shadow-lg border border-border bg-muted aspect-[4/3] flex items-center justify-center transition-all duration-500 ease-out hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-2xl">
            <img
              src="/assets/launch_delhi.jfif"
              alt={t("KumbhDoot launch at India AI Impact Summit in New Delhi", "नवी दिल्ली येथील इंडिया AI इम्पॅक्ट समिटमध्ये कुंभदूतचे उद्घाटन")}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="bg-foreground text-background py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Main Columns */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10 text-left">
          {/* Column 1: App Brief */}
          <div className="space-y-3">
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:opacity-90 transition-opacity cursor-pointer inline-block"
            >
              <p className="font-bold text-base tracking-wide text-background">
                {t("KumbhDoot", "कुंभदूत")}
              </p>
            </a>
            <p className="text-xs leading-relaxed text-background/80">
              {t("A Personal AI Doot for Every Pilgrim.", "प्रत्येक भाविकासाठी एक वैयक्तिक AI दूत.")}
              <br />
              {t("Nashik Simhastha Kumbh Mela 2027.", "नाशिक सिंहस्थ कुंभमेळा २०२७.")}
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-3">
            <p className="font-bold text-base tracking-wide text-background">
              {t("Quick Links", "जलद दुवे")}
            </p>
            <ul className="space-y-2 text-xs text-background/80 font-medium">
              <li>
                <a
                  href="https://www.projectnanda.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                >
                  ProjectNANDA.org
                </a>
              </li>
              <li>
                <a
                  href="https://www.kumbhdoot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                >
                  {t("KumbhDoot App", "कुंभदूत ॲप")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect / Social */}
          <div className="space-y-3">
            <p className="font-bold text-base tracking-wide text-background">
              {t("Connect", "सोशल मीडिया")}
            </p>
            <ul className="space-y-2 text-xs text-background/80 font-medium">
              <li>
                <a
                  href="https://www.whatsapp.com/channel/0029VbCrREfAInPicPeRcR42"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                >
                  WhatsApp Channel
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@kumbhdoot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/showcase/nandakumbh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/kumbhdoot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/kumbhdoot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/KumbhDoot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                >
                  Twitter (X)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="space-y-3">
            <p className="font-bold text-base tracking-wide text-background">
              {t("Contact", "संपर्क")}
            </p>
            <p className="text-xs leading-relaxed text-background/80">
              <a href="mailto:contact@kumbhdoot.app" className="hover:text-primary transition-colors">
                contact@kumbhdoot.app
              </a>
            </p>
          </div>
        </div>

        <Separator className="bg-background/10 mb-6" />

        {/* Official Authority declaration */}
        <div className="text-center text-xs text-background/70 mb-5 space-y-1">
          <p className="font-semibold text-background/90">
            {t(
              "Government of Maharashtra · Nashik Kumbh Mela Authority",
              "महाराष्ट्र शासन · नाशिक कुंभमेळा प्राधिकरण"
            )}
          </p>
          <p className="italic text-[10px] text-background/60">
            {t(
              '"Official AI Doot for Nashik Kumbh Mela 2027"',
              '"नाशिक कुंभमेळा २०२७ साठी अधिकृत AI दूत"'
            )}
          </p>
        </div>

        <Separator className="bg-background/10 mb-5" />

        {/* Legal & accessibility footnotes */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-background/50 text-center md:text-left">
          <p>
            {t(
              "© 2027 Government of Maharashtra. All rights reserved.",
              "© २०२७ महाराष्ट्र शासन. सर्व हक्क राखीव."
            )}
          </p>
          <p className="font-medium max-w-md">
            {t(
              "Accessibility & Language Support: Screen reader compatible · 20+ languages · Voice-first access",
              "सुलभता आणि भाषा समर्थन: स्क्रीन रीडर सुसंगत · २०+ भाषा · व्हॉइस-फर्स्ट प्रवेश"
            )}
          </p>
          <p>
            {t(
              "Designed in collaboration with ProjectNANDA.org",
              "ProjectNANDA.org सोबत सहकार्याने डिझाइन केलेले"
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

function HomeContent({
  fontSize,
  increaseFontSize,
  decreaseFontSize,
  highContrast,
  toggleHighContrast,
}: {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
}) {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      <Header
        fontSize={fontSize}
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
        highContrast={highContrast}
        toggleHighContrast={toggleHighContrast}
      />
      <main key={language} className="flex-1 animate-fade-in">
        <HeroSection />
        <CMQuoteSection />
        <ChallengeSection />
        <LaunchSection />
        <VisionSection />
        <ArchitectureSection />
        <FeaturesSection />
        <ServicesSection />
        <FoundationsSection />
        <ContributorsSection />
      </main>
      <Footer />
    </div>
  );
}

export function makeHomePage(defaultLang: "en" | "mr") {
  return function HomePage() {
    const {
      fontSize,
      increaseFontSize,
      decreaseFontSize,
      highContrast,
      toggleHighContrast,
    } = useAccessibility();

    return (
      <LanguageProvider defaultLanguage={defaultLang}>
        <HomeContent
          fontSize={fontSize}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          highContrast={highContrast}
          toggleHighContrast={toggleHighContrast}
        />
      </LanguageProvider>
    );
  };
}

const Home = makeHomePage("mr");
export default Home;
