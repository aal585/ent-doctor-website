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

  // Testimonials
  "testimonials.title": { en: "Patient Testimonials", ar: "آراء المرضى" },
  "testimonials.subtitle": { 
    en: "See what our patients say about their experience",
    ar: "اطلع على ما يقوله مرضانا عن تجربتهم"
  },
  "testimonials.share": { en: "Share Your Experience", ar: "شارك تجربتك" },
  "testimonials.write": { en: "Write a Testimonial", ar: "اكتب تقييماً" },
  "testimonials.verified": { en: "Verified", ar: "موثق" },
  "testimonials.procedure": { en: "Procedure", ar: "الإجراء" },
  "testimonials.doctorResponse": { en: "Doctor's Response", ar: "رد الطبيب" },
  "testimonials.filter": { en: "Filter", ar: "تصفية" },
  "testimonials.allRatings": { en: "All Ratings", ar: "جميع التقييمات" },
  "testimonials.onlyRating": { en: "Only", ar: "فقط" },
  "testimonials.sortDate": { en: "Sort by Date", ar: "ترتيب حسب التاريخ" },
  "testimonials.sortRating": { en: "Sort by Rating", ar: "ترتيب حسب التقييم" },
  "testimonials.name": { en: "Your Name", ar: "اسمك" },
  "testimonials.rating": { en: "Rating", ar: "التقييم" },
  "testimonials.experience": { en: "Your Experience", ar: "تجربتك" },
  "testimonials.selectProcedure": { en: "Select Procedure", ar: "اختر الإجراء" },
  "testimonials.submit": { en: "Submit Testimonial", ar: "إرسال التقييم" },
  "testimonials.submitSuccess": { en: "Thank You!", ar: "شكراً لك!" },
  "testimonials.submitSuccessDesc": { 
    en: "Your testimonial has been submitted successfully",
    ar: "تم إرسال تقييمك بنجاح"
  },
  "testimonials.submitError": { en: "Error", ar: "خطأ" },
  "testimonials.submitErrorDesc": {
    en: "Failed to submit testimonial. Please try again.",
    ar: "فشل إرسال التقييم. يرجى المحاولة مرة أخرى."
  },

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
