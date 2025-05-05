import { api, APIError } from "encore.dev/api";
import type { Testimonial } from "./types";
import { doctorDB } from "./db";

// Get patient testimonials
export const getTestimonials = api<void, { testimonials: Testimonial[] }>(
  { method: "GET", path: "/doctor/testimonials", expose: true },
  async () => {
    try {
      const rows = await doctorDB.queryAll`
        SELECT 
          id::text, patient_name, content, rating, date,
          verified, procedure_type,
          response_content, response_date
        FROM testimonials
        ORDER BY date DESC
      `;

      const testimonials = rows.map(row => ({
        id: row.id,
        patientName: row.patient_name,
        content: row.content,
        rating: row.rating,
        date: new Date(row.date),
        verified: row.verified,
        procedureType: row.procedure_type,
        response: row.response_content ? {
          content: row.response_content,
          date: new Date(row.response_date)
        } : undefined
      }));

      return { testimonials };
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      throw APIError.internal("Failed to fetch testimonials");
    }
  }
);

interface SubmitTestimonialParams {
  patientName: string;
  content: string;
  rating: number;
  procedureType?: string;
}

// Submit a new testimonial
export const submitTestimonial = api<SubmitTestimonialParams, { success: boolean }>(
  { method: "POST", path: "/doctor/testimonials", expose: true },
  async (req) => {
    try {
      await doctorDB.exec`
        INSERT INTO testimonials (
          patient_name, content, rating, procedure_type
        ) VALUES (
          ${req.patientName}, ${req.content}, ${req.rating}, ${req.procedureType}
        )
      `;
      return { success: true };
    } catch (err) {
      console.error("Failed to save testimonial:", err);
      throw APIError.internal("Failed to save testimonial");
    }
  }
);
