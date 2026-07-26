import fa from "./fa";
import en from "./en";
import { setTranslations, useLanguage } from "../context/LanguageContext";

export { fa, en };

export function initTranslations(lang: "fa" | "en") {
  const translations = lang === "fa" ? fa : en;
  setTranslations(lang, translations);
}

export function useTranslation() {
  const { language, t } = useLanguage();
  return { t, language, dir: language === "fa" ? ("rtl" as const) : ("ltr" as const) };
}
