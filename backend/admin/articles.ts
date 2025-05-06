import { api, APIError } from "encore.dev/api";
import { doctorDB } from "../doctor/db";

interface CreateArticleParams {
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  summaryEn: string;
  summaryAr: string;
  author: string;
  category: string;
}

// Create article
export const createArticle = api<CreateArticleParams, { id: string }>(
  { method: "POST", path: "/admin/articles", auth: true },
  async (params) => {
    try {
      // Simple validation
      if (!params.titleEn || !params.titleAr || !params.contentEn || !params.contentAr || 
          !params.summaryEn || !params.summaryAr || !params.author || !params.category) {
        throw APIError.invalidArgument("All fields are required");
      }

      // Insert with minimal fields
      const result = await doctorDB.queryRow<{ id: number }>`
        INSERT INTO articles (
          title_en,
          title_ar,
          content_en,
          content_ar,
          summary_en,
          summary_ar,
          author,
          category
        ) VALUES (
          ${params.titleEn},
          ${params.titleAr},
          ${params.contentEn},
          ${params.contentAr},
          ${params.summaryEn},
          ${params.summaryAr},
          ${params.author},
          ${params.category}
        )
        RETURNING id
      `;

      return { id: result?.id?.toString() || '0' };
    } catch (err) {
      console.error("Create article error:", err);
      throw APIError.internal("Failed to create article");
    }
  }
);

// Update article
export const updateArticle = api<CreateArticleParams & { id: string }, { success: boolean }>(
  { method: "PUT", path: "/admin/articles/:id", auth: true },
  async (params) => {
    try {
      // Simple validation
      if (!params.titleEn || !params.titleAr || !params.contentEn || !params.contentAr || 
          !params.summaryEn || !params.summaryAr || !params.author || !params.category) {
        throw APIError.invalidArgument("All fields are required");
      }

      const id = parseInt(params.id);
      if (isNaN(id)) {
        throw APIError.invalidArgument("Invalid ID");
      }

      await doctorDB.exec`
        UPDATE articles 
        SET 
          title_en = ${params.titleEn},
          title_ar = ${params.titleAr},
          content_en = ${params.contentEn},
          content_ar = ${params.contentAr},
          summary_en = ${params.summaryEn},
          summary_ar = ${params.summaryAr},
          author = ${params.author},
          category = ${params.category}
        WHERE id = ${id}
      `;

      return { success: true };
    } catch (err) {
      console.error("Update article error:", err);
      throw APIError.internal("Failed to update article");
    }
  }
);

// Delete article
export const deleteArticle = api<{ id: string }, { success: boolean }>(
  { method: "DELETE", path: "/admin/articles/:id", auth: true },
  async (params) => {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        throw APIError.invalidArgument("Invalid ID");
      }

      await doctorDB.exec`
        DELETE FROM articles WHERE id = ${id}
      `;

      return { success: true };
    } catch (err) {
      console.error("Delete article error:", err);
      throw APIError.internal("Failed to delete article");
    }
  }
);
