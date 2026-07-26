import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import type { ReactNode } from "react";

type Language = "fa" | "en";

interface LanguageContextType {
  language: Language;
  dir: "rtl" | "ltr";
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);
const LANG_KEY = "vesta_language";

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === "en" || stored === "fa") return stored;
  return "fa";
}

function getDirection(lang: Language): "rtl" | "ltr" {
  return lang === "fa" ? "rtl" : "ltr";
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split(".").reduce((acc: Record<string, unknown>, key: string) => {
    if (acc && typeof acc === "object" && key in acc) return acc[key] as Record<string, unknown>;
    return undefined;
  }, obj) as unknown as string;
}

let currentTranslations: Record<string, string> = {};

export function setTranslations(lang: Language, translations: Record<string, string>) {
  currentTranslations = translations;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [translations, setTranslationsState] = useState<Record<string, string>>(() => {
    return currentTranslations;
  });

  useEffect(() => {
    const dir = getDirection(language);
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(translations, key) || key;
    },
    [translations]
  );

  const dir = getDirection(language);

  const value = useMemo(() => ({ language, dir, setLanguage, t }), [language, dir, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
