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
  }
);

// Submit a new testimonial
export const submitTestimonial = api<SubmitTestimonialParams, { success: boolean }>(
  { method: "POST", path: "/doctor/testimonials", expose: true },
  async (params) => {
    if (!params.patientName || !params.content || !params.procedureType) {
      throw APIError.invalidArgument("Missing required fields");
    }

    if (params.rating < 1 || params.rating > 5) {
      throw APIError.invalidArgument("Rating must be between 1 and 5");
    }

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

    return { success: true };
  }
);
