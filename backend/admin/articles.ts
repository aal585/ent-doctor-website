import { api, APIError } from "encore.dev/api";
import { db } from "../doctor/db";

// Test endpoint
export const test = api<void, { message: string }>(
  { method: "GET", path: "/admin/test", expose: true },
  async () => {
    return { message: "API is working" };
  }
);

// Create article
export const create = api<{
  title: string;
  content: string;
}, { success: boolean }>(
  { method: "POST", path: "/admin/articles", expose: true },
  async (req) => {
    try {
      if (!req.title || !req.content) {
        throw APIError.invalidArgument("Title and content are required");
      }

      await db.exec`
        INSERT INTO articles (title, content)
        VALUES (${req.title}, ${req.content})
      `;

      return { success: true };
    } catch (err) {
      console.error("Create article error:", err);
      throw APIError.internal("Failed to create article");
    }
  }
);
