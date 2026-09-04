"use client";

import * as React from "react";
import Image from "next/image";
import {
  MapPin,
  ExternalLink,
  Radio,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackToTop } from "@/components/BackToTop";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { EVENTS, EventItem } from "@/data/events";

// Official Google Form URL provided by user
const GOOGLE_FORM_URL = "https://forms.gle/HWsvSYRXeYdbLTq66";

function JoinContent() {
  const { language, t } = useLanguage();

  const upcomingEvents = React.useMemo(() => {
    return EVENTS.filter((ev) => ev.status === "upcoming");
  }, []);

  const pastEvents = React.useMemo(() => {
    return EVENTS.filter((ev) => ev.status === "past");
  }, []);

  const handleGetInvolved = () => {
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  const renderEventCard = (event: EventItem, isUpcoming: boolean) => {
    return (
      <div
        key={event.id}
        className="relative pl-6 sm:pl-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-0 before:w-[2px] before:bg-border/60 last:before:hidden group"
      >
        {/* Timeline Node Header */}
        <div className="relative flex items-center gap-2 mb-3">
          <div
            className={`w-3 h-3 rounded-full -ml-[23px] sm:-ml-[27px] ring-4 ring-background transition-all ${
              isUpcoming
                ? "bg-primary ring-primary/20 scale-110"
                : "bg-muted-foreground/60"
            }`}
          />
          <span className="text-xs sm:text-sm font-bold text-foreground tracking-tight">
            {event.timelineTag[language]}
          </span>
          {event.isLive && (
            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              {t("Live Now", "थेट सुरू आहे")}
            </span>
          )}
        </div>

        {/* Luma Style Event Card */}
        <div
          className={`mb-8 rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 justify-between items-start bg-[#18191b] dark:bg-[#18191b] text-neutral-100 ${
            isUpcoming
              ? "border-primary/40 shadow-md ring-1 ring-primary/20"
              : "border-neutral-800 hover:border-neutral-700"
          }`}
        >
          {/* Left: Event Details */}
          <div className="flex-1 space-y-2.5 w-full">
            {/* Time string */}
            <div className="text-xs font-semibold text-neutral-400 flex flex-wrap items-center gap-1.5">
              <span className="text-amber-400 font-bold">
                {event.timeDisplay[language]}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight">
              {event.title[language]}
            </h3>

            {/* Host Attribution */}
            <div className="flex items-center gap-2 pt-0.5">
              <div className="flex -space-x-1.5 overflow-hidden">
                {event.hosts.list.map((host, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: host.avatarColor || "#f59e0b" }}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-[#18191b]"
                    title={host.name}
                  >
                    {host.avatarText || host.name.slice(0, 1)}
                  </div>
                ))}
              </div>
              <span className="text-xs text-neutral-300 font-medium">
                {event.hosts[language]}
              </span>
            </div>

            {/* Location */}
            <div className="text-xs text-neutral-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{event.location[language]}</span>
            </div>

            {/* Description (concise) */}
            <p className="text-xs text-neutral-300/90 leading-relaxed pt-1 line-clamp-2">
              {event.description[language]}
            </p>

            {/* Card Action Buttons (Luma + Gov CTAs) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-neutral-800/80 mt-3">
              {/* Live Session Button */}
              {isUpcoming && (
                <a
                  href={event.lumaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-xs"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span>{t("Live Session", "थेट सत्र")}</span>
                </a>
              )}

              {/* Lu.ma Register / View Button */}
              <a
                href={event.lumaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all ${
                  isUpcoming
                    ? "bg-primary hover:bg-primary/90 text-white shadow-xs"
                    : "bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
                }`}
              >
                <span>
                  {isUpcoming
                    ? t("Register on Lu.ma", "Lu.ma वर नोंदणी करा")
                    : t("View Details", "तपशील पहा")}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Get Involved redirect */}
              <button
                type="button"
                onClick={handleGetInvolved}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/90 bg-neutral-800/80 hover:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700 transition-all cursor-pointer"
              >
                <span>{t("Get Involved", "सहभागी व्हा")}</span>
              </button>
            </div>
          </div>

          {/* Right: Square Thumbnail (Luma Image Style) */}
          {event.image ? (
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 bg-neutral-900 border border-neutral-800 self-center sm:self-start">
              <Image
                src={event.image}
                alt={event.title[language]}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 96px, 128px"
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      <SiteHeader />

      <main className="flex-1 animate-fade-in">
        {/* HEADER SECTION */}
        <section className="bg-[#0c1a40] text-white py-10 md:py-14 border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Page Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              {t("Events & Participation", "कार्यक्रम आणि सहभाग")}
            </h1>

            {/* Page Description */}
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl mb-6 font-normal">
              {t(
                "Official schedule of innovation sprints, research salons, and public onboarding tracks for KumbhDoot — the AI Agent Framework for Nashik Simhastha Kumbh Mela 2027.",
                "नाशिक सिंहस्थ कुंभमेळा २०२७ साठी कुंभदूत AI एजंट प्रणालीच्या हॅकाथॉन, संशोधन गोलमेज परिषदा आणि सार्वजनिक सहभाग उपक्रमांचे अधिकृत वेळापत्रक."
              )}
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary "Get Involved" Button */}
              <button
                type="button"
                onClick={handleGetInvolved}
                className="inline-flex items-center justify-center gap-2 bg-[#ff5f00] hover:bg-[#e05300] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>{t("Get Involved", "सहभागी व्हा (फॉर्म भरा)")}</span>
              </button>

              {/* Primary "Live" Button */}
              <a
                href="https://luma.com/umtvs1uk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-all shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>{t("Live Session", "थेट सत्र (Live)")}</span>
                <Radio className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* EVENTS TIMELINE SECTION (LUMA UI FORMAT) */}
        <section className="py-10 md:py-14 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* UPCOMING SECTION */}
            <div className="mb-12">
              <div className="border-b border-border pb-2.5 mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                    {t("Upcoming Events", "आगामी कार्यक्रम")}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t(
                      "Active innovation sprints and open registration sessions",
                      "सक्रिय इनोव्हेशन स्प्रिंट्स आणि चालू नोंदणी सत्रे"
                    )}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                  {upcomingEvents.length} {t("Event", "कार्यक्रम")}
                </span>
              </div>

              <div>
                {upcomingEvents.map((event) => renderEventCard(event, true))}
              </div>
            </div>

            {/* PAST EVENTS SECTION */}
            <div className="mb-12">
              <div className="border-b border-border pb-2.5 mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                    {t("Past Events & Proceedings Archive", "मागील कार्यक्रम आणि इतिवृत्त")}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t(
                      "Historical milestones hosted across Nashik, Mumbai, Delhi, MIT, and Davos",
                      "नाशिक, मुंबई, दिल्ली, MIT आणि दावोस येथे आयोजित झालेले मागील उपक्रम"
                    )}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                  {pastEvents.length} {t("Events", "कार्यक्रम")}
                </span>
              </div>

              <div>
                {pastEvents.map((event) => renderEventCard(event, false))}
              </div>
            </div>
          </div>
        </section>

        {/* PARTICIPATION SECTION */}
        <section id="get-involved" className="py-12 md:py-16 bg-muted/40 border-t border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {language === "en" ? (
                    <>
                      Build AI-First Kumbh<br />With KumbhDoot
                    </>
                  ) : (
                    <>
                      AI-फर्स्ट कुंभ घडवा<br />कुंभदूतसह
                    </>
                  )}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(
                    "Contribute to KumbhDoot for Nashik Kumbh Mela 2027.",
                    "नाशिक कुंभमेळा २०२७ साठी कुंभदूत उपक्रमात सहभागी व्हा."
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={handleGetInvolved}
                className="inline-flex items-center justify-center gap-2 bg-[#ff5f00] hover:bg-[#e05300] text-white font-bold text-sm px-7 py-3 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
              >
                <span>{t("Get Involved", "सहभागी व्हा")}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}

export function makeJoinPage(defaultLang: "en" | "mr") {
  return function JoinPage() {
    return (
      <LanguageProvider defaultLanguage={defaultLang}>
        <JoinContent />
      </LanguageProvider>
    );
  };
}

const Join = makeJoinPage("mr");
export default Join;
