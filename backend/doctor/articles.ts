import { api, APIError } from "encore.dev/api";
import type { Article } from "./types";
import { doctorDB } from "./db";

interface ArticleRow {
  id: string;
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  summary_en: string;
  summary_ar: string;
  author: string;
  date: Date;
  image_url: string;
  tags: string[];
  category: string;
}

// Get articles in specified language
export const getArticles = api<{ lang: "en" | "ar" }, { articles: Article[] }>(
  { method: "GET", path: "/doctor/articles", expose: true },
  async (req) => {
    try {
      const rows = await doctorDB.queryAll<ArticleRow>`
        SELECT 
          id::text, title_en, title_ar, content_en, content_ar,
          summary_en, summary_ar, author, date, image_url,
          tags, category
        FROM articles
        ORDER BY date DESC
      `;

      const articles = rows.map(row => ({
        id: row.id,
        title: req.lang === "en" ? row.title_en : row.title_ar,
        content: req.lang === "en" ? row.content_en : row.content_ar,
        summary: req.lang === "en" ? row.summary_en : row.summary_ar,
        author: row.author,
        date: new Date(row.date),
        imageUrl: row.image_url,
        tags: row.tags,
        category: row.category
      }));

      return { articles };
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      throw APIError.internal("Failed to fetch articles");
    }
  }
);

// Get a single article by ID
export const getArticle = api<{ id: string; lang: "en" | "ar" }, Article>(
  { method: "GET", path: "/doctor/articles/:id", expose: true },
  async (req) => {
    try {
      const row = await doctorDB.queryRow<ArticleRow>`
        SELECT 
          id::text, title_en, title_ar, content_en, content_ar,
          summary_en, summary_ar, author, date, image_url,
          tags, category
        FROM articles
        WHERE id = ${req.id}::bigint
      `;

      if (!row) {
        throw APIError.notFound("Article not found");
      }

      return {
        id: row.id,
        title: req.lang === "en" ? row.title_en : row.title_ar,
        content: req.lang === "en" ? row.content_en : row.content_ar,
        summary: req.lang === "en" ? row.summary_en : row.summary_ar,
        author: row.author,
        date: new Date(row.date),
        imageUrl: row.image_url,
        tags: row.tags,
        category: row.category
      };
    } catch (err) {
      if (err instanceof APIError) throw err;
      console.error("Failed to fetch article:", err);
      throw APIError.internal("Failed to fetch article");
    }
  }
);
