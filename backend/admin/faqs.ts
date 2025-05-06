import { api, APIError } from "encore.dev/api";
import { db } from "../doctor/db";

// Create FAQ
export const create = api<{
  questionEn: string;
  questionAr: string;
  answer: string;
}, { success: boolean }>(
  { method: "POST", path: "/admin/faqs", expose: true },
  async (req) => {
    try {
      if (!req.questionEn || !req.questionAr || !req.answer) {
        throw APIError.invalidArgument("Missing required fields");
      }

      await db.exec`
        INSERT INTO faqs (question_en, question_ar, answer_en)
        VALUES (${req.questionEn}, ${req.questionAr}, ${req.answer})
      `;

      return { success: true };
    } catch (err) {
      console.error("Create FAQ error:", err);
      throw APIError.internal("Failed to create FAQ");
    }
  }
);

// Update FAQ
export const update = api<{
  id: string;
  questionEn: string;
  questionAr: string;
  answer: string;
}, { success: boolean }>(
  { method: "PUT", path: "/admin/faqs/:id", expose: true },
  async (req) => {
    try {
      if (!req.questionEn || !req.questionAr || !req.answer) {
        throw APIError.invalidArgument("Missing required fields");
      }

      await db.exec`
        UPDATE faqs 
        SET question_en = ${req.questionEn},
            question_ar = ${req.questionAr},
            answer_en = ${req.answer}
        WHERE id = ${req.id}
      `;

      return { success: true };
    } catch (err) {
      console.error("Update FAQ error:", err);
      throw APIError.internal("Failed to update FAQ");
    }
  }
);

// Delete FAQ
export const remove = api<{ id: string }, { success: boolean }>(
  { method: "DELETE", path: "/admin/faqs/:id", expose: true },
  async (req) => {
    try {
      await db.exec`DELETE FROM faqs WHERE id = ${req.id}`;
      return { success: true };
    } catch (err) {
      console.error("Delete FAQ error:", err);
      throw APIError.internal("Failed to delete FAQ");
    }
  }
);
