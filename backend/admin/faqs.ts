import { api, APIError } from "encore.dev/api";
import { doctorDB } from "../doctor/db";

interface CreateFAQParams {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  category: string;
}

// Create FAQ
export const createFAQ = api<CreateFAQParams, { id: string }>(
  { method: "POST", path: "/admin/faqs", auth: true },
  async (params) => {
    try {
      // Simple validation
      if (!params.questionEn || !params.questionAr || !params.answerEn || 
          !params.answerAr || !params.category) {
        throw APIError.invalidArgument("All fields are required");
      }

      const result = await doctorDB.queryRow<{ id: number }>`
        INSERT INTO faqs (
          question_en,
          question_ar,
          answer_en,
          answer_ar,
          category
        ) VALUES (
          ${params.questionEn},
          ${params.questionAr},
          ${params.answerEn},
          ${params.answerAr},
          ${params.category}
        )
        RETURNING id
      `;

      return { id: result?.id?.toString() || '0' };
    } catch (err) {
      console.error("Create FAQ error:", err);
      throw APIError.internal("Failed to create FAQ");
    }
  }
);

// Update FAQ
export const updateFAQ = api<CreateFAQParams & { id: string }, { success: boolean }>(
  { method: "PUT", path: "/admin/faqs/:id", auth: true },
  async (params) => {
    try {
      // Simple validation
      if (!params.questionEn || !params.questionAr || !params.answerEn || 
          !params.answerAr || !params.category) {
        throw APIError.invalidArgument("All fields are required");
      }

      const id = parseInt(params.id);
      if (isNaN(id)) {
        throw APIError.invalidArgument("Invalid ID");
      }

      await doctorDB.exec`
        UPDATE faqs 
        SET
          question_en = ${params.questionEn},
          question_ar = ${params.questionAr},
          answer_en = ${params.answerEn},
          answer_ar = ${params.answerAr},
          category = ${params.category}
        WHERE id = ${id}
      `;

      return { success: true };
    } catch (err) {
      console.error("Update FAQ error:", err);
      throw APIError.internal("Failed to update FAQ");
    }
  }
);

// Delete FAQ
export const deleteFAQ = api<{ id: string }, { success: boolean }>(
  { method: "DELETE", path: "/admin/faqs/:id", auth: true },
  async (params) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        throw APIError.invalidArgument("Invalid ID");
      }

      await doctorDB.exec`
        DELETE FROM faqs WHERE id = ${id}
      `;

      return { success: true };
    } catch (err) {
      console.error("Delete FAQ error:", err);
      throw APIError.internal("Failed to delete FAQ");
    }
  }
);
