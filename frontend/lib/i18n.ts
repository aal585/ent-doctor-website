export const translations = {
  "services.title": {
    en: "Our Services",
    ar: "خدماتنا"
  },
  "services.subtitle": {
    en: "Comprehensive ENT care using advanced medical technologies",
    ar: "رعاية شاملة للأنف والأذن والحنجرة باستخدام تقنيات طبية متقدمة"
  },
  "services.learnMore": {
    en: "Learn More",
    ar: "اعرف المزيد"
  }
};

export type Language = "en" | "ar";

export function getTranslation(key: string, lang: Language): string {
  return translations[key]?.[lang] || key;
}
