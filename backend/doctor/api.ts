import { api, APIError } from "encore.dev/api";
import { doctorDB } from "./db";

// Simple test endpoint to verify database connection
export const hello = api<void, { message: string }>(
  { 
    method: "GET", 
    path: "/hello", 
    expose: true 
  },
  async () => {
    try {
      // Test database connection
      await doctorDB.queryRow`SELECT 1`;
      
      return {
        message: "Hello World"
      };
    } catch (err) {
      console.error("Database connection test failed:", err);
      throw APIError.internal("Failed to connect to database");
    }
  }
);
