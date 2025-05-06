import type { Translation } from "~backend/doctor/types";

export const translations: Translation = {
  // Navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "عن الدكتور" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.testimonials": { en: "Testimonials", ar: "آراء المرضى" },
  "nav.articles": { en: "Articles", ar: "المقالات" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.book": { en: "Book Appointment", ar: "حجز موعد" },

  // Services
  "services.title": { en: "Our Services", ar: "خدماتنا" },
  "services.subtitle": {
    en: "Comprehensive ENT care using advanced medical technologies",
    ar: "رعاية شاملة للأنف والأذن والحنجرة باستخدام تقنيات طبية متقدمة"
  },
  "services.learnMore": { en: "Learn More", ar: "اعرف المزيد" },

  // Common
  "common.loading": { en: "Loading...", ar: "جار التحميل..." },
  "common.error": { en: "Error", ar: "خطأ" },
  "common.success": { en: "Success", ar: "نجاح" },
  "common.cancel": { en: "Cancel", ar: "إلغاء" },
  "common.submit": { en: "Submit", ar: "إرسال" },
  "common.submitting": { en: "Submitting...", ar: "جار الإرسال..." }
};

export type Language = "en" | "ar";

export function getTranslation(key: string, lang: Language): string {
  return translations[key]?.[lang] || key;
}
