"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Lang, type Translations } from "@/lib/i18n";

interface LangContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];
  const toggleLang = () => setLang((prev) => (prev === "en" ? "zh" : "en"));

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
