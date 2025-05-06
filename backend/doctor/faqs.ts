import { api, APIError } from "encore.dev/api";

// Define the interface locally to avoid import issues
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon?: string;
}

// Get FAQs in specified language
export const getFAQs = api<{ lang: "en" | "ar" }, { faqs: FAQ[] }>(
  { method: "GET", path: "/doctor/faqs", expose: true },
  async (req) => {
    if (!["en", "ar"].includes(req.lang)) {
      throw APIError.invalidArgument("Invalid language specified");
    }

    // Return sample data for now
    return {
      faqs: [
        {
          id: "1",
          question: "What should I expect during my first visit?",
          answer: "During your first visit, we will conduct a thorough examination...",
          category: "Appointments",
          icon: "calendar"
        }
      ]
    };
  }
);
