import { api, APIError } from "encore.dev/api";
import { doctorDB } from "./db";

interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  date: Date;
  verified: boolean;
  procedureType: string;
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
      const rows = await doctorDB.queryAll`
        SELECT 
          id,
          patient_name,
          content,
          rating,
          date,
          verified,
          procedure_type
        FROM testimonials
        WHERE verified = true
        ORDER BY date DESC
      `;

      const testimonials = rows.map(row => ({
        id: row.id.toString(),
        patientName: row.patient_name,
        content: row.content,
        rating: Number(row.rating),
        date: new Date(row.date),
        verified: Boolean(row.verified),
        procedureType: row.procedure_type
      }));

      return { testimonials };
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch testimonials");
    }
  }
);

// Submit a new testimonial
export const submitTestimonial = api<SubmitTestimonialParams, { success: boolean }>(
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

      // Sanitize input
      const sanitizedData = {
        patientName: params.patientName.trim(),
        content: params.content.trim(),
        rating: Math.round(params.rating),
        procedureType: params.procedureType.trim()
      };

      await doctorDB.exec`
        INSERT INTO testimonials (
          patient_name,
          content,
          rating,
          procedure_type
        ) VALUES (
          ${sanitizedData.patientName},
          ${sanitizedData.content},
          ${sanitizedData.rating},
          ${sanitizedData.procedureType}
        )
      `;

      return { success: true };
    } catch (err) {
      console.error("Failed to submit testimonial:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to submit testimonial");
    }
  }
);
