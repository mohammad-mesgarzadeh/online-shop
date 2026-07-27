import { useLanguage } from "../context/LanguageContext";

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()} تومان`;
};

export const formatPriceNumber = (price: number): string => {
  return price.toLocaleString();
};

export function useFormatPrice() {
  const { language } = useLanguage();
  const currency = language === "fa" ? "تومان" : "Toman";
  const locale = language === "fa" ? "fa-IR" : "en-US";

  const format = (price: number): string => {
    return `${price.toLocaleString(locale)} ${currency}`;
  };

  const formatNumber = (price: number): string => {
    return price.toLocaleString(locale);
  };

  return { formatPrice: format, formatPriceNumber: formatNumber };
}
