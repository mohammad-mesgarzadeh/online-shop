import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import fa from "../locales/fa";
import en from "../locales/en";

type Language = "fa" | "en";

interface LanguageContextType {
  language: Language;
  dir: "rtl" | "ltr";
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);
const LANG_KEY = "vesta_language";
const translations = { fa, en } as const;

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === "en" || stored === "fa") return stored;
  return "fa";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const dir = language === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[language];
      return (dict as Record<string, string>)[key] || key;
    },
    [language]
  );

  const dir = language === "fa" ? ("rtl" as const) : ("ltr" as const);

  const value = useMemo(() => ({ language, dir, setLanguage, t }), [language, dir, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
