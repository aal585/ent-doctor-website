import { api } from "encore.dev/api";

// Define interface for response
interface HelloResponse {
  message: string;
}

// Basic endpoint with proper interface types
export const hello = api<void, HelloResponse>(
  { 
    method: "GET",
    path: "/hello",
    expose: true
  },
  async () => {
    return {
      message: "Hello World"
    };
  }
);
