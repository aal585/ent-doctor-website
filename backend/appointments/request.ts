import { api, APIError } from "encore.dev/api";
import type { AppointmentRequest } from "../doctor/types";
import { appointmentsDB } from "./db";

// Submit appointment request
export const requestAppointment = api<AppointmentRequest, { success: boolean }>(
  { method: "POST", path: "/appointments/request", expose: true },
  async (req) => {
    try {
      // Validate input
      if (!req.patientName || !req.email || !req.phone || !req.reason) {
        throw APIError.invalidArgument("Missing required fields");
      }

      // Validate email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
        throw APIError.invalidArgument("Invalid email format");
      }

      // Validate dates
      const now = new Date();
      const preferredDate = new Date(req.preferredDate);
      const alternateDate = new Date(req.alternateDate);

      if (preferredDate < now || alternateDate < now) {
        throw APIError.invalidArgument("Appointment dates must be in the future");
      }

      await appointmentsDB.exec`
        INSERT INTO appointments (
          patient_name, email, phone, preferred_date, alternate_date, 
          reason, is_new_patient
        ) VALUES (
          ${req.patientName}, ${req.email}, ${req.phone}, ${preferredDate},
          ${alternateDate}, ${req.reason}, ${req.isNewPatient}
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
