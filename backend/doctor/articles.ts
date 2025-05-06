import { api, APIError } from "encore.dev/api";
import { doctorDB } from "./db";

// Define the interface locally to avoid import issues
interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  date: Date;
  imageUrl: string;
  tags: string[];
  category: string;
  readTimeMinutes?: number;
  viewCount?: number;
}

// Get articles in specified language
export const getArticles = api<{ lang: "en" | "ar" }, { articles: Article[] }>(
  { method: "GET", path: "/doctor/articles", expose: true },
  async (req) => {
    try {
      if (!["en", "ar"].includes(req.lang)) {
        throw APIError.invalidArgument("Invalid language specified");
      }

      const rows = await doctorDB.queryAll`
        SELECT 
          id,
          title_${req.lang} as title,
          content_${req.lang} as content,
          summary_${req.lang} as summary,
          author,
          date,
          image_url,
          tags,
          category,
          read_time_minutes,
          view_count
        FROM articles
        ORDER BY date DESC
      `;

      const articles = rows.map(row => ({
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        summary: row.summary,
        author: row.author,
        date: new Date(row.date),
        imageUrl: row.image_url,
        tags: row.tags,
        category: row.category,
        readTimeMinutes: row.read_time_minutes,
        viewCount: row.view_count
      }));

      return { articles };
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch articles");
    }
  }
);

// Get a single article by ID
export const getArticle = api<{ id: string; lang: "en" | "ar" }, Article>(
  { method: "GET", path: "/doctor/articles/:id", expose: true },
  async (req) => {
    try {
      if (!["en", "ar"].includes(req.lang)) {
        throw APIError.invalidArgument("Invalid language specified");
      }

      const row = await doctorDB.queryRow`
        SELECT 
          id,
          title_${req.lang} as title,
          content_${req.lang} as content,
          summary_${req.lang} as summary,
          author,
          date,
          image_url,
          tags,
          category,
          read_time_minutes,
          view_count
        FROM articles
        WHERE id = ${req.id}
      `;

      if (!row) {
        throw APIError.notFound("Article not found");
      }

      // Update view count
      await doctorDB.exec`
        UPDATE articles 
        SET view_count = view_count + 1 
        WHERE id = ${req.id}
      `;

      return {
        id: row.id.toString(),
        title: row.title,
        content: row.content,
        summary: row.summary,
        author: row.author,
        date: new Date(row.date),
        imageUrl: row.image_url,
        tags: row.tags,
        category: row.category,
        readTimeMinutes: row.read_time_minutes,
        viewCount: row.view_count + 1
      };
    } catch (err) {
      console.error("Failed to fetch article:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch article");
    }
  }
);
