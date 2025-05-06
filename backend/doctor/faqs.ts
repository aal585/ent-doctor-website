import { api, APIError } from "encore.dev/api";
import type { FAQ } from "./types";
import { doctorDB } from "./db";

// Get FAQs in specified language
export const getFAQs = api<{ lang: "en" | "ar" }, { faqs: FAQ[] }>(
  { method: "GET", path: "/doctor/faqs", expose: true },
  async (req) => {
    if (!["en", "ar"].includes(req.lang)) {
      throw APIError.invalidArgument("Invalid language specified");
    }

    try {
      const rows = await doctorDB.queryAll`
        SELECT 
          id::text,
          question_${req.lang} as question,
          answer_${req.lang} as answer,
          category,
          icon
        FROM faqs
        ORDER BY category, id
      `;

      return {
        faqs: rows.map(row => ({
          id: row.id,
          question: row.question || '',
          answer: row.answer || '',
          category: row.category,
          icon: row.icon || 'help-circle'
        }))
      };
    } catch (err) {
      console.error("Failed to fetch FAQs:", err);
      throw APIError.internal("Failed to fetch FAQs");
    }
  }
);
