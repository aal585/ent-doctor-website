import { api, APIError } from "encore.dev/api";
import type { FAQ } from "./types";
import { doctorDB } from "./db";

interface FAQRow {
  id: string;
  question_en: string;
  question_ar: string;
  answer_en: string;
  answer_ar: string;
  category: string;
}

// Get FAQs in specified language
export const getFAQs = api<{ lang: "en" | "ar" }, { faqs: FAQ[] }>(
  { method: "GET", path: "/doctor/faqs", expose: true },
  async (req) => {
    try {
      const rows = await doctorDB.queryAll<FAQRow>`
        SELECT 
          id::text, question_en, question_ar,
          answer_en, answer_ar, category
        FROM faqs
        ORDER BY category, id
      `;

      const faqs = rows.map(row => ({
        id: row.id,
        question: req.lang === "en" ? row.question_en : row.question_ar,
        answer: req.lang === "en" ? row.answer_en : row.answer_ar,
        category: row.category
      }));

      return { faqs };
    } catch (err) {
      console.error("Failed to fetch FAQs:", err);
      throw APIError.internal("Failed to fetch FAQs");
    }
  }
);
