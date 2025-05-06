import { api, APIError } from "encore.dev/api";

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
    if (!["en", "ar"].includes(req.lang)) {
      throw APIError.invalidArgument("Invalid language specified");
    }

    // Return sample data for now
    return {
      articles: [
        {
          id: "1",
          title: "Understanding ENT Health",
          content: "Content here...",
          summary: "A comprehensive guide to ENT health",
          author: "Dr. Ahmed Sultan",
          date: new Date(),
          imageUrl: "/images/articles/ent-health.jpg",
          tags: ["health", "education"],
          category: "Education",
          readTimeMinutes: 5,
          viewCount: 100
        }
      ]
    };
  }
);

// Get a single article by ID
export const getArticle = api<{ id: string; lang: "en" | "ar" }, Article>(
  { method: "GET", path: "/doctor/articles/:id", expose: true },
  async (req) => {
    if (!["en", "ar"].includes(req.lang)) {
      throw APIError.invalidArgument("Invalid language specified");
    }

    // Return sample data for now
    return {
      id: req.id,
      title: "Understanding ENT Health",
      content: "Content here...",
      summary: "A comprehensive guide to ENT health",
      author: "Dr. Ahmed Sultan",
      date: new Date(),
      imageUrl: "/images/articles/ent-health.jpg",
      tags: ["health", "education"],
      category: "Education",
      readTimeMinutes: 5,
      viewCount: 100
    };
  }
);
