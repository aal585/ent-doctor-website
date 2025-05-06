import { api, APIError } from "encore.dev/api";
import type { Article } from "./types";
import { doctorDB } from "./db";

// Get articles in specified language
export const getArticles = api<{ lang: "en" | "ar" }, { articles: Article[] }>(
  { method: "GET", path: "/doctor/articles", expose: true },
  async (req) => {
    if (!["en", "ar"].includes(req.lang)) {
      throw APIError.invalidArgument("Invalid language specified");
    }

    try {
      const rows = await doctorDB.queryAll`
        SELECT 
          id::text,
          title_${req.lang} as title,
          content_${req.lang} as content,
          summary_${req.lang} as summary,
          author,
          date,
          image_url as "imageUrl",
          tags,
          category,
          read_time_minutes as "readTimeMinutes",
          view_count as "viewCount"
        FROM articles
        ORDER BY date DESC
      `;

      return {
        articles: rows.map(row => ({
          id: row.id,
          title: row.title || '',
          content: row.content || '',
          summary: row.summary || '',
          author: row.author,
          date: new Date(row.date),
          imageUrl: row.imageUrl,
          tags: row.tags || [],
          category: row.category,
          readTimeMinutes: row.readTimeMinutes || 5,
          viewCount: row.viewCount || 0
        }))
      };
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
    if (!["en", "ar"].includes(req.lang)) {
      throw APIError.invalidArgument("Invalid language specified");
    }

    try {
      const row = await doctorDB.queryRow`
        SELECT 
          id::text,
          title_${req.lang} as title,
          content_${req.lang} as content,
          summary_${req.lang} as summary,
          author,
          date,
          image_url as "imageUrl",
          tags,
          category,
          read_time_minutes as "readTimeMinutes",
          view_count as "viewCount"
        FROM articles
        WHERE id = ${req.id}::bigint
      `;

      if (!row) {
        throw APIError.notFound("Article not found");
      }

      return {
        id: row.id,
        title: row.title || '',
        content: row.content || '',
        summary: row.summary || '',
        author: row.author,
        date: new Date(row.date),
        imageUrl: row.imageUrl,
        tags: row.tags || [],
        category: row.category,
        readTimeMinutes: row.readTimeMinutes || 5,
        viewCount: row.viewCount || 0
      };
    } catch (err) {
      if (err instanceof APIError) throw err;
      console.error("Failed to fetch article:", err);
      throw APIError.internal("Failed to fetch article");
    }
  }
);
