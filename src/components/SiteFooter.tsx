"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function SiteFooter() {
  const { language, t } = useLanguage();
  const homeUrl = language === "en" ? "/en" : "/";
  const joinUrl = language === "en" ? "/en/join" : "/join";

  return (
    <footer id="footer" className="bg-foreground text-background py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Main Columns */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10 text-left">
          {/* Column 1: App Brief */}
          <div className="space-y-3">
            <a 
              href={homeUrl} 
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
                  href={joinUrl}
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex text-primary font-semibold"
                >
                  {t("Join Us & Events", "सहभागी व्हा / कार्यक्रम")}
                </a>
              </li>
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
                  href="https://kumbhlabs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1 inline-flex"
                >
                  kumbhlabs.org
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
              <a href="mailto:contact@kumbhlabs.org" className="hover:text-primary transition-colors">
                contact@kumbhlabs.org
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
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 bg-primary/20 hover:bg-primary text-primary hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border border-primary/40 cursor-pointer shadow-sm"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{t("Back to Top", "वर जा")}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
