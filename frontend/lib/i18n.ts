import type { Translation } from "~backend/doctor/types";

export const translations: Translation = {
  "nav.home": {
    en: "Home",
    ar: "الرئيسية"
  },
  "nav.about": {
    en: "About",
    ar: "عن الدكتور"
  },
  "nav.services": {
    en: "Services",
    ar: "الخدمات"
  },
  "nav.testimonials": {
    en: "Testimonials",
    ar: "آراء المرضى"
  },
  "nav.articles": {
    en: "Articles",
    ar: "المقالات"
  },
  "nav.contact": {
    en: "Contact",
    ar: "اتصل بنا"
  },
  "nav.book": {
    en: "Book Appointment",
    ar: "حجز موعد"
  },
  // Add more translations as needed
};

export type Language = "en" | "ar";

export function getTranslation(key: string, lang: Language): string {
  return translations[key]?.[lang] || key;
}
