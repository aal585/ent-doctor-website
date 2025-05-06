import { api, APIError } from "encore.dev/api";
import { doctorDB } from "./db";

interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  procedureType: string;
  createdAt: Date;
}

// Get testimonials
export const getTestimonials = api<void, { testimonials: Testimonial[] }>(
  { method: "GET", path: "/doctor/testimonials", expose: true },
  async () => {
    try {
      const rows = await doctorDB.queryAll`
        SELECT id, patient_name, content, rating, procedure_type, created_at 
        FROM testimonials 
        ORDER BY created_at DESC
      `;

      return {
        testimonials: rows.map(row => ({
          id: row.id.toString(),
          patientName: row.patient_name,
          content: row.content,
          rating: Number(row.rating),
          procedureType: row.procedure_type,
          createdAt: new Date(row.created_at)
        }))
      };
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      throw APIError.internal("Failed to fetch testimonials");
    }
  }
);

// Submit testimonial
export const submitTestimonial = api<{
  patientName: string;
  content: string;
  rating: number;
  procedureType: string;
}, { success: boolean }>(
  { method: "POST", path: "/doctor/testimonials", expose: true },
  async (params) => {
    try {
      // Validate input
      if (!params.patientName?.trim()) {
        throw APIError.invalidArgument("Patient name is required");
      }
      if (!params.content?.trim()) {
        throw APIError.invalidArgument("Content is required");
      }
      if (!params.procedureType?.trim()) {
        throw APIError.invalidArgument("Procedure type is required");
      }
      if (typeof params.rating !== 'number' || params.rating < 1 || params.rating > 5) {
        throw APIError.invalidArgument("Rating must be between 1 and 5");
      }

      // Insert testimonial
      await doctorDB.exec`
        INSERT INTO testimonials (patient_name, content, rating, procedure_type)
        VALUES (${params.patientName}, ${params.content}, ${params.rating}, ${params.procedureType})
      `;

      return { success: true };
    } catch (err) {
      console.error("Failed to submit testimonial:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to submit testimonial");
    }
  }
);
