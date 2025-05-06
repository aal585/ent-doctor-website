import { api, APIError } from "encore.dev/api";
import { doctorDB } from "../doctor/db";

// Create article
export const createArticle = api<{
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  summaryEn: string;
  summaryAr: string;
  author: string;
  category: string;
}, { success: boolean }>(
  { method: "POST", path: "/admin/articles", expose: true },
  async (req) => {
    try {
      // Validate all required fields
      if (!req.titleEn?.trim()) throw APIError.invalidArgument("English title is required");
      if (!req.titleAr?.trim()) throw APIError.invalidArgument("Arabic title is required");
      if (!req.contentEn?.trim()) throw APIError.invalidArgument("English content is required");
      if (!req.contentAr?.trim()) throw APIError.invalidArgument("Arabic content is required");
      if (!req.summaryEn?.trim()) throw APIError.invalidArgument("English summary is required");
      if (!req.summaryAr?.trim()) throw APIError.invalidArgument("Arabic summary is required");
      if (!req.author?.trim()) throw APIError.invalidArgument("Author is required");
      if (!req.category?.trim()) throw APIError.invalidArgument("Category is required");

      await doctorDB.exec`
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
          ${req.titleEn.trim()},
          ${req.titleAr.trim()},
          ${req.contentEn.trim()},
          ${req.contentAr.trim()},
          ${req.summaryEn.trim()},
          ${req.summaryAr.trim()},
          ${req.author.trim()},
          ${req.category.trim()}
        )
      `;

      return { success: true };
    } catch (err) {
      console.error("Create article error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to create article");
    }
  }
);

// Update article
export const updateArticle = api<{
  id: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  summaryEn: string;
  summaryAr: string;
  author: string;
  category: string;
}, { success: boolean }>(
  { method: "PUT", path: "/admin/articles/:id", expose: true },
  async (req) => {
    try {
      // Validate all required fields
      if (!req.titleEn?.trim()) throw APIError.invalidArgument("English title is required");
      if (!req.titleAr?.trim()) throw APIError.invalidArgument("Arabic title is required");
      if (!req.contentEn?.trim()) throw APIError.invalidArgument("English content is required");
      if (!req.contentAr?.trim()) throw APIError.invalidArgument("Arabic content is required");
      if (!req.summaryEn?.trim()) throw APIError.invalidArgument("English summary is required");
      if (!req.summaryAr?.trim()) throw APIError.invalidArgument("Arabic summary is required");
      if (!req.author?.trim()) throw APIError.invalidArgument("Author is required");
      if (!req.category?.trim()) throw APIError.invalidArgument("Category is required");

      const id = parseInt(req.id);
      if (isNaN(id)) throw APIError.invalidArgument("Invalid article ID");

      await doctorDB.exec`
        UPDATE articles 
        SET 
          title_en = ${req.titleEn.trim()},
          title_ar = ${req.titleAr.trim()},
          content_en = ${req.contentEn.trim()},
          content_ar = ${req.contentAr.trim()},
          summary_en = ${req.summaryEn.trim()},
          summary_ar = ${req.summaryAr.trim()},
          author = ${req.author.trim()},
          category = ${req.category.trim()}
        WHERE id = ${id}
      `;

      return { success: true };
    } catch (err) {
      console.error("Update article error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to update article");
    }
  }
);

// Delete article
export const deleteArticle = api<{ id: string }, { success: boolean }>(
  { method: "DELETE", path: "/admin/articles/:id", expose: true },
  async (req) => {
    try {
      const id = parseInt(req.id);
      if (isNaN(id)) throw APIError.invalidArgument("Invalid article ID");

      await doctorDB.exec`
        DELETE FROM articles WHERE id = ${id}
      `;

      return { success: true };
    } catch (err) {
      console.error("Delete article error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to delete article");
    }
  }
);
