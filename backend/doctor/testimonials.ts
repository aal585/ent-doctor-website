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
        testimonials: rows.map(row => ({
          id: row.id,
          patientName: row.patientName,
          content: row.content,
          rating: row.rating,
          date: new Date(row.date),
          verified: row.verified,
          procedureType: row.procedureType,
          response: row.responseContent ? {
            content: row.responseContent,
            date: new Date(row.responseDate)
          } : undefined
        }))
      };
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      throw APIError.internal("Failed to fetch testimonials");
    }
  }
);
