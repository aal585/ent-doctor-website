import { api } from "encore.dev/api";

interface SimpleService {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// Simplified service endpoint
export const listServices = api<
  { lang: string },
  { services: SimpleService[] }
>(
  { 
    method: "GET", 
    path: "/doctor/services", 
    expose: true 
  },
  async (req) => {
    // Return minimal hardcoded data
    return {
      services: [
        {
          id: "1",
          name: req.lang === "ar" ? "فحص السمع" : "Hearing Test",
          description: req.lang === "ar" 
            ? "تقييم شامل للسمع" 
            : "Complete hearing evaluation",
          imageUrl: "/images/services/hearing.jpg"
        },
        {
          id: "2",
          name: req.lang === "ar" ? "جراحة الأنف" : "Nasal Surgery",
          description: req.lang === "ar"
            ? "علاج مشاكل الأنف والجيوب الأنفية"
            : "Treatment for nasal and sinus problems",
          imageUrl: "/images/services/nasal.jpg"
        }
      ]
    };
  }
);
