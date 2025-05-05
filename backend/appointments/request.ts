import { api, APIError } from "encore.dev/api";
import type { AppointmentRequest } from "../doctor/types";
import { appointmentsDB } from "./db";

// Submit appointment request
export const requestAppointment = api<AppointmentRequest, { success: boolean }>(
  { method: "POST", path: "/appointments/request", expose: true },
  async (req) => {
    try {
      await appointmentsDB.exec`
        INSERT INTO appointments (
          patient_name, email, phone, preferred_date, alternate_date, 
          reason, is_new_patient
        ) VALUES (
          ${req.patientName}, ${req.email}, ${req.phone}, ${req.preferredDate},
          ${req.alternateDate}, ${req.reason}, ${req.isNewPatient}
        )
      `;
      return { success: true };
    } catch (err) {
      console.error("Failed to save appointment:", err);
      throw APIError.internal("Failed to save appointment");
    }
  }
);
