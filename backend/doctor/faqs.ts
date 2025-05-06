import { api, APIError } from "encore.dev/api";
import { doctorDB } from "./db";

// Define the interface locally to avoid import issues
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon?: string;
}

// Get FAQs in specified language
export const getFAQs = api<{ lang: "en" | "ar" }, { faqs: FAQ[] }>(
  { method: "GET", path: "/doctor/faqs", expose: true },
  async (req) => {
    try {
      if (!["en", "ar"].includes(req.lang)) {
        throw APIError.invalidArgument("Invalid language specified");
      }

      const rows = await doctorDB.queryAll`
        SELECT 
          id,
          question_${req.lang} as question,
          answer_${req.lang} as answer,
          category,
          icon
        FROM faqs
        ORDER BY category, id
      `;

      const faqs = rows.map(row => ({
        id: row.id.toString(),
        question: row.question,
        answer: row.answer,
        category: row.category,
        icon: row.icon
      }));

      return { faqs };
    } catch (err) {
      console.error("Failed to fetch FAQs:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch FAQs");
    }
  }
);
