import type { Translation } from "~backend/doctor/types";

export const translations: Translation = {
  // Navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "عن الدكتور" },
  "nav.services": { en: "Services", ar: "الخدمات" },
  "nav.testimonials": { en: "Testimonials", ar: "آراء المرضى" },
  "nav.articles": { en: "Articles", ar: "المقالات" },
  "nav.certificates": { en: "Certificates", ar: "الشهادات" },
  "nav.procedures": { en: "Procedures", ar: "العمليات" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.book": { en: "Book Appointment", ar: "حجز موعد" },

  // Hero Section
  "hero.title": { en: "Expert ENT Care with", ar: "رعاية متخصصة في الأنف والأذن والحنجرة مع" },
  "hero.subtitle": {
    en: "Specialized care for ear, nose, and throat conditions using the latest medical technologies and treatments.",
    ar: "رعاية متخصصة لحالات الأذن والأنف والحنجرة باستخدام أحدث التقنيات والعلاجات الطبية"
  },
  "hero.book": { en: "Book Appointment", ar: "حجز موعد" },
  "hero.learn": { en: "Learn More", ar: "اعرف المزيد" },

  // About Section
  "about.title": { en: "About Dr. Ahmed Sultan", ar: "عن الدكتور أحمد سلطان" },
  "about.experience": { en: "Years Experience", ar: "سنوات الخبرة" },
  "about.patients": { en: "Patients Treated", ar: "المرضى المعالجين" },
  "about.certifications": { en: "Certifications", ar: "الشهادات" },
  "about.specializations": { en: "Specializations", ar: "التخصصات" },

  // Services Section
  "services.title": { en: "Our Services", ar: "خدماتنا" },
  "services.subtitle": {
    en: "Comprehensive ENT care using advanced medical technologies",
    ar: "رعاية شاملة للأنف والأذن والحنجرة باستخدام تقنيات طبية متقدمة"
  },

  // Testimonials Section
  "testimonials.title": { en: "Patient Testimonials", ar: "آراء المرضى" },
  "testimonials.subtitle": {
    en: "What our patients say about their experience",
    ar: "ما يقوله مرضانا عن تجربتهم"
  },
  "testimonials.verified": { en: "Verified Patient", ar: "مريض موثق" },
  "testimonials.procedure": { en: "Procedure", ar: "العملية" },

  // Articles Section
  "articles.title": { en: "Latest Articles", ar: "أحدث المقالات" },
  "articles.subtitle": {
    en: "Expert insights and medical advice from Dr. Sultan",
    ar: "رؤى خبير ونصائح طبية من الدكتور سلطان"
  },
  "articles.readMore": { en: "Read More", ar: "اقرأ المزيد" },

  // FAQ Section
  "faq.title": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  "faq.subtitle": {
    en: "Find answers to common questions about our services, appointments, and procedures",
    ar: "اعثر على إجابات للأسئلة الشائعة حول خدماتنا ومواعيدنا وإجراءاتنا"
  },

  // Contact Section
  "contact.title": { en: "Contact Us", ar: "اتصل بنا" },
  "contact.subtitle": {
    en: "Get in touch with us for appointments and inquiries",
    ar: "تواصل معنا للمواعيد والاستفسارات"
  },
  "contact.location": { en: "Location", ar: "الموقع" },
  "contact.phone": { en: "Phone", ar: "الهاتف" },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.hours": { en: "Working Hours", ar: "ساعات العمل" },

  // Appointment Form
  "form.fullName": { en: "Full Name", ar: "الاسم الكامل" },
  "form.email": { en: "Email", ar: "البريد الإلكتروني" },
  "form.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "form.preferredDate": { en: "Preferred Date", ar: "التاريخ المفضل" },
  "form.alternateDate": { en: "Alternate Date", ar: "تاريخ بديل" },
  "form.reason": { en: "Reason for Visit", ar: "سبب الزيارة" },
  "form.newPatient": { en: "I am a new patient", ar: "أنا مريض جديد" },
  "form.submit": { en: "Request Appointment", ar: "طلب موعد" },
  "form.submitting": { en: "Submitting...", ar: "جاري الإرسال..." },

  // Certificates & Procedures
  "certificates.title": { en: "Certificates & Qualifications", ar: "الشهادات والمؤهلات" },
  "certificates.subtitle": {
    en: "Professional certifications and specialized training",
    ar: "الشهادات المهنية والتدريب المتخصص"
  },
  "procedures.title": { en: "Featured Procedures", ar: "العمليات المميزة" },
  "procedures.subtitle": {
    en: "Explore our successful medical procedures",
    ar: "استكشف عملياتنا الطبية الناجحة"
  }
};

export type Language = "en" | "ar";

export function getTranslation(key: string, lang: Language): string {
  return translations[key]?.[lang] || key;
}
