import { api } from "encore.dev/api";
import type { AppointmentRequest } from "../doctor/types";

// Submit appointment request
export const requestAppointment = api<AppointmentRequest, { success: boolean }>(
  { method: "POST", path: "/appointments/request", expose: true },
  async (req) => {
    // In a real implementation, this would save to a database and send notifications
    return { success: true };
  }
);
