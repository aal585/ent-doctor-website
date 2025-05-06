import { api, APIError } from "encore.dev/api";

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

      // For now, just return success
      return { success: true };
    } catch (err) {
      console.error("Failed to save appointment:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to save appointment");
    }
  }
);
