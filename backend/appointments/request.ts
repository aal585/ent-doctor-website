import { api, APIError } from "encore.dev/api";
import { appointmentsDB } from "./db";

// Define the interface locally to avoid import issues
interface AppointmentRequest {
  patientName: string;
  email: string;
  phone: string;
  preferredDate: Date;
  alternateDate: Date;
  reason: string;
  isNewPatient: boolean;
}

// Submit appointment request
export const requestAppointment = api<AppointmentRequest, { success: boolean }>(
  { method: "POST", path: "/appointments/request", expose: true },
  async (req) => {
    try {
      // Validate required fields
      if (!req.patientName?.trim()) {
        throw APIError.invalidArgument("Patient name is required");
      }
      if (!req.email?.trim()) {
        throw APIError.invalidArgument("Email is required");
      }
      if (!req.phone?.trim()) {
        throw APIError.invalidArgument("Phone number is required");
      }
      if (!req.reason?.trim()) {
        throw APIError.invalidArgument("Reason for visit is required");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.email)) {
        throw APIError.invalidArgument("Invalid email format");
      }

      // Validate dates
      const now = new Date();
      const preferredDate = new Date(req.preferredDate);
      const alternateDate = new Date(req.alternateDate);

      if (isNaN(preferredDate.getTime())) {
        throw APIError.invalidArgument("Invalid preferred date");
      }
      if (isNaN(alternateDate.getTime())) {
        throw APIError.invalidArgument("Invalid alternate date");
      }
      if (preferredDate < now) {
        throw APIError.invalidArgument("Preferred date must be in the future");
      }
      if (alternateDate < now) {
        throw APIError.invalidArgument("Alternate date must be in the future");
      }

      // Sanitize input
      const sanitizedData = {
        patientName: req.patientName.trim(),
        email: req.email.trim().toLowerCase(),
        phone: req.phone.trim(),
        preferredDate,
        alternateDate,
        reason: req.reason.trim(),
        isNewPatient: Boolean(req.isNewPatient)
      };

      // Save to database
      await appointmentsDB.exec`
        INSERT INTO appointments (
          patient_name,
          email,
          phone,
          preferred_date,
          alternate_date,
          reason,
          is_new_patient,
          status
        ) VALUES (
          ${sanitizedData.patientName},
          ${sanitizedData.email},
          ${sanitizedData.phone},
          ${sanitizedData.preferredDate},
          ${sanitizedData.alternateDate},
          ${sanitizedData.reason},
          ${sanitizedData.isNewPatient},
          'pending'
        )
      `;

      return { success: true };
    } catch (err) {
      console.error("Failed to save appointment:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to save appointment");
    }
  }
);

// Get appointment by ID
export const getAppointment = api<{ id: string }, AppointmentRequest>(
  { method: "GET", path: "/appointments/:id", expose: true },
  async (req) => {
    try {
      const row = await appointmentsDB.queryRow`
        SELECT 
          patient_name,
          email,
          phone,
          preferred_date,
          alternate_date,
          reason,
          is_new_patient
        FROM appointments
        WHERE id = ${req.id}
      `;

      if (!row) {
        throw APIError.notFound("Appointment not found");
      }

      return {
        patientName: row.patient_name,
        email: row.email,
        phone: row.phone,
        preferredDate: new Date(row.preferred_date),
        alternateDate: new Date(row.alternate_date),
        reason: row.reason,
        isNewPatient: row.is_new_patient
      };
    } catch (err) {
      console.error("Failed to fetch appointment:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch appointment");
    }
  }
);
