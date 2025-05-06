import { api, APIError } from "encore.dev/api";

// Define the interface locally to avoid import issues
interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  date: Date;
  verified: boolean;
  procedureType?: string;
  response?: {
    content: string;
    date: Date;
  };
}

// Get patient testimonials
export const getTestimonials = api<void, { testimonials: Testimonial[] }>(
  { method: "GET", path: "/doctor/testimonials", expose: true },
  async () => {
    // Return sample data for now
    return {
      testimonials: [
        {
          id: "1",
          patientName: "John Doe",
          content: "Excellent service and care!",
          rating: 5,
          date: new Date(),
          verified: true,
          procedureType: "Hearing Test"
        }
      ]
    };
  }
);
