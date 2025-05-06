import { api, APIError } from "encore.dev/api";
import { doctorDB } from "../doctor/db";

// Create FAQ
export const createFAQ = api<{
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  category: string;
}, { success: boolean }>(
  { method: "POST", path: "/admin/faqs", auth: true },
  async (req) => {
    try {
      // Validate all required fields
      if (!req.questionEn?.trim()) throw APIError.invalidArgument("English question is required");
      if (!req.questionAr?.trim()) throw APIError.invalidArgument("Arabic question is required");
      if (!req.answerEn?.trim()) throw APIError.invalidArgument("English answer is required");
      if (!req.answerAr?.trim()) throw APIError.invalidArgument("Arabic answer is required");
      if (!req.category?.trim()) throw APIError.invalidArgument("Category is required");

      await doctorDB.exec`
        INSERT INTO faqs (
          question_en,
          question_ar,
          answer_en,
          answer_ar,
          category
        ) VALUES (
          ${req.questionEn.trim()},
          ${req.questionAr.trim()},
          ${req.answerEn.trim()},
          ${req.answerAr.trim()},
          ${req.category.trim()}
        )
      `;

      return { success: true };
    } catch (err) {
      console.error("Create FAQ error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to create FAQ");
    }
  }
);

// Update FAQ
export const updateFAQ = api<{
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  category: string;
}, { success: boolean }>(
  { method: "PUT", path: "/admin/faqs/:id", auth: true },
  async (req) => {
    try {
      // Validate all required fields
      if (!req.questionEn?.trim()) throw APIError.invalidArgument("English question is required");
      if (!req.questionAr?.trim()) throw APIError.invalidArgument("Arabic question is required");
      if (!req.answerEn?.trim()) throw APIError.invalidArgument("English answer is required");
      if (!req.answerAr?.trim()) throw APIError.invalidArgument("Arabic answer is required");
      if (!req.category?.trim()) throw APIError.invalidArgument("Category is required");

      const id = parseInt(req.id);
      if (isNaN(id)) throw APIError.invalidArgument("Invalid FAQ ID");

      await doctorDB.exec`
        UPDATE faqs 
        SET
          question_en = ${req.questionEn.trim()},
          question_ar = ${req.questionAr.trim()},
          answer_en = ${req.answerEn.trim()},
          answer_ar = ${req.answerAr.trim()},
          category = ${req.category.trim()}
        WHERE id = ${id}
      `;

      return { success: true };
    } catch (err) {
      console.error("Update FAQ error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to update FAQ");
    }
  }
);

// Delete FAQ
export const deleteFAQ = api<{ id: string }, { success: boolean }>(
  { method: "DELETE", path: "/admin/faqs/:id", auth: true },
  async (req) => {
    try {
      const id = parseInt(req.id);
      if (isNaN(id)) throw APIError.invalidArgument("Invalid FAQ ID");

      await doctorDB.exec`
        DELETE FROM faqs WHERE id = ${id}
      `;

      return { success: true };
    } catch (err) {
      console.error("Delete FAQ error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to delete FAQ");
    }
  }
);
