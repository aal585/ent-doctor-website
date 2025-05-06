import { api, APIError } from "encore.dev/api";
import { Bucket } from "encore.dev/storage/objects";
import { doctorDB } from "../doctor/db";

// Create a bucket for article images
const articleImages = new Bucket("article-images", { public: true });

interface CreateArticleParams {
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  summaryEn: string;
  summaryAr: string;
  author: string;
  imageData: string; // Base64 encoded image
  tags: string[];
  category: string;
  readTimeMinutes: number;
}

interface UpdateArticleParams extends CreateArticleParams {
  id: string;
}

// Create article
export const createArticle = api<CreateArticleParams, { id: string }>(
  { method: "POST", path: "/admin/articles", auth: true },
  async (params) => {
    try {
      // Basic validation
      if (!params.titleEn || !params.titleAr || !params.contentEn || !params.contentAr || 
          !params.summaryEn || !params.summaryAr || !params.author || !params.category) {
        throw APIError.invalidArgument("All required fields must be provided");
      }

      // Use default image
      const imageUrl = "/images/articles/default.jpg";

      // Insert article with minimal fields first
      const result = await doctorDB.queryRow<{ id: number }>`
        INSERT INTO articles (
          title_en,
          title_ar,
          content_en,
          content_ar,
          summary_en,
          summary_ar,
          author,
          image_url,
          category
        ) VALUES (
          ${params.titleEn},
          ${params.titleAr},
          ${params.contentEn},
          ${params.contentAr},
          ${params.summaryEn},
          ${params.summaryAr},
          ${params.author},
          ${imageUrl},
          ${params.category}
        )
        RETURNING id
      `;

      if (!result?.id) {
        throw new Error("No ID returned from insert");
      }

      return { id: result.id.toString() };
    } catch (err) {
      console.error("Create article error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to create article");
    }
  }
);

// Update article
export const updateArticle = api<UpdateArticleParams, { success: boolean }>(
  { method: "PUT", path: "/admin/articles/:id", auth: true },
  async (params) => {
    try {
      // Basic validation
      if (!params.titleEn || !params.titleAr || !params.contentEn || !params.contentAr || 
          !params.summaryEn || !params.summaryAr || !params.author || !params.category) {
        throw APIError.invalidArgument("All required fields must be provided");
      }

      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        throw APIError.invalidArgument("Invalid article ID");
      }

      // Update only essential fields
      const result = await doctorDB.queryRow<{ id: number }>`
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
        RETURNING id
      `;

      if (!result?.id) {
        throw APIError.notFound("Article not found");
      }

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
  { method: "DELETE", path: "/admin/articles/:id", auth: true },
  async (params) => {
    try {
      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        throw APIError.invalidArgument("Invalid article ID");
      }

      const result = await doctorDB.queryRow<{ id: number }>`
        DELETE FROM articles WHERE id = ${id} RETURNING id
      `;

      if (!result?.id) {
        throw APIError.notFound("Article not found");
      }

      return { success: true };
    } catch (err) {
      console.error("Delete article error:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to delete article");
    }
  }
);
