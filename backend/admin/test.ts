import { api } from "encore.dev/api";

// Simple test endpoint with no dependencies
export const hello = api<void, { message: string }>(
  { 
    method: "GET",
    path: "/hello",
    expose: true 
  },
  async () => {
    return { message: "Hello World" };
  }
);
