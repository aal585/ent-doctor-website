import { api, APIError } from "encore.dev/api";
import { doctorDB } from "../doctor/db";

// Simple test endpoint
export const test = api<void, { message: string }>(
  { method: "GET", path: "/admin/test", expose: true },
  async () => {
    return { message: "Admin API is working" };
  }
);

interface Content {
  title: string;
  content: string;
  author: string;
}

// Create content
export const create = api<Content, { id: string }>(
  { method: "POST", path: "/admin/content", expose: true },
  async (req) => {
    try {
      // Basic validation
      if (!req.title?.trim()) {
        throw APIError.invalidArgument("Title is required");
      }
      if (!req.content?.trim()) {
        throw APIError.invalidArgument("Content is required");
      }
      if (!req.author?.trim()) {
        throw APIError.invalidArgument("Author is required");
      }

      // Insert into articles table
      const result = await doctorDB.queryRow<{ id: number }>`
        INSERT INTO articles (title, content, author)
        VALUES (${req.title}, ${req.content}, ${req.author})
        RETURNING id
      `;

      return { id: result.id.toString() };
    } catch (err) {
      console.error("Create content error:", err);
      throw APIError.internal("Failed to create content");
    }
  }
);

// Update content
export const update = api<Content & { id: string }, { success: boolean }>(
  { method: "PUT", path: "/admin/content/:id", expose: true },
  async (req) => {
    try {
      // Basic validation
      if (!req.title?.trim()) {
        throw APIError.invalidArgument("Title is required");
      }
      if (!req.content?.trim()) {
        throw APIError.invalidArgument("Content is required");
      }
      if (!req.author?.trim()) {
        throw APIError.invalidArgument("Author is required");
      }

      // Update article
      const result = await doctorDB.queryRow<{ id: number }>`
        UPDATE articles 
        SET title = ${req.title}, content = ${req.content}, author = ${req.author}
        WHERE id = ${req.id}
        RETURNING id
      `;

      if (!result) {
        throw APIError.notFound("Content not found");
      }

      return { success: true };
    } catch (err) {
      console.error("Update content error:", err);
      throw APIError.internal("Failed to update content");
    }
  }
);

// Delete content
export const remove = api<{ id: string }, { success: boolean }>(
  { method: "DELETE", path: "/admin/content/:id", expose: true },
  async (req) => {
    try {
      const result = await doctorDB.queryRow<{ id: number }>`
        DELETE FROM articles WHERE id = ${req.id}
        RETURNING id
      `;

      if (!result) {
        throw APIError.notFound("Content not found");
      }

      return { success: true };
    } catch (err) {
      console.error("Delete content error:", err);
      throw APIError.internal("Failed to delete content");
    }
  }
);
