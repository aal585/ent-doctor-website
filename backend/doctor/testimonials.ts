import { api, APIError } from "encore.dev/api";
import { doctorDB } from "./db";

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

interface SubmitTestimonialParams {
  patientName: string;
  content: string;
  rating: number;
  procedureType: string;
}

// Get patient testimonials
export const getTestimonials = api<void, { testimonials: Testimonial[] }>(
  { method: "GET", path: "/doctor/testimonials", expose: true },
  async () => {
    try {
      const testimonials = await doctorDB.queryAll<Testimonial>`
        SELECT 
          id::text,
          patient_name as "patientName",
          content,
          rating,
          date,
          verified,
          procedure_type as "procedureType",
          response_content as "responseContent",
          response_date as "responseDate"
        FROM testimonials
        ORDER BY date DESC
      `;

      return {
        testimonials: testimonials.map(t => ({
          id: t.id,
          patientName: t.patientName,
          content: t.content,
          rating: t.rating,
          date: t.date,
          verified: t.verified,
          procedureType: t.procedureType,
          response: t.responseContent ? {
            content: t.responseContent,
            date: t.responseDate
          } : undefined
        }))
      };
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      throw APIError.internal("Failed to fetch testimonials");
    }
  }
);

// Submit a new testimonial
export const submitTestimonial = api<SubmitTestimonialParams, void>(
  { method: "POST", path: "/doctor/testimonials", expose: true },
  async (params) => {
    try {
      await doctorDB.exec`
        INSERT INTO testimonials (
          patient_name,
          content,
          rating,
          procedure_type
        ) VALUES (
          ${params.patientName},
          ${params.content},
          ${params.rating},
          ${params.procedureType}
        )
      `;
    } catch (err) {
      console.error("Failed to submit testimonial:", err);
      throw APIError.internal("Failed to submit testimonial");
    }
  }
);
