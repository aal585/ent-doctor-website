import { api, APIError } from "encore.dev/api";
import { doctorDB } from "../doctor/db";

interface CreateFAQParams {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  category: string;
  icon?: string;
}

interface UpdateFAQParams extends CreateFAQParams {
  id: string;
}

// Create FAQ
export const createFAQ = api<CreateFAQParams, { id: string }>(
  { method: "POST", path: "/admin/faqs", auth: true },
  async (params) => {
    try {
      // Basic validation
      if (!params.questionEn || !params.questionAr || !params.answerEn || 
          !params.answerAr || !params.category) {
        throw APIError.invalidArgument("All required fields must be provided");
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

      if (!result?.id) {
        throw new Error("No ID returned from insert");
      }

      return { id: result.id.toString() };
    } catch (err) {
      console.error("Create FAQ error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to create FAQ");
    }
  }
);

// Update FAQ
export const updateFAQ = api<UpdateFAQParams, { success: boolean }>(
  { method: "PUT", path: "/admin/faqs/:id", auth: true },
  async (params) => {
    try {
      // Basic validation
      if (!params.questionEn || !params.questionAr || !params.answerEn || 
          !params.answerAr || !params.category) {
        throw APIError.invalidArgument("All required fields must be provided");
      }

      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        throw APIError.invalidArgument("Invalid FAQ ID");
      }

      const result = await doctorDB.queryRow<{ id: number }>`
        UPDATE faqs 
        SET
          question_en = ${params.questionEn},
          question_ar = ${params.questionAr},
          answer_en = ${params.answerEn},
          answer_ar = ${params.answerAr},
          category = ${params.category}
        WHERE id = ${id}
        RETURNING id
      `;

      if (!result?.id) {
        throw APIError.notFound("FAQ not found");
      }

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
  async (params) => {
    try {
      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        throw APIError.invalidArgument("Invalid FAQ ID");
      }

      const result = await doctorDB.queryRow<{ id: number }>`
        DELETE FROM faqs WHERE id = ${id} RETURNING id
      `;

      if (!result?.id) {
        throw APIError.notFound("FAQ not found");
      }

      return { success: true };
    } catch (err) {
      console.error("Delete FAQ error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to delete FAQ");
    }
  }
);
