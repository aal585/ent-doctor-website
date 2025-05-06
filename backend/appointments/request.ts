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

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format (basic international format)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{8,}$/;
  return phoneRegex.test(phone);
}

// Validate date is in the future
function isValidFutureDate(date: Date): boolean {
  const now = new Date();
  return new Date(date) > now;
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

      // Validate field formats
      if (!isValidEmail(req.email)) {
        throw APIError.invalidArgument("Invalid email format");
      }
      if (!isValidPhone(req.phone)) {
        throw APIError.invalidArgument("Invalid phone number format");
      }

      // Validate dates
      const preferredDate = new Date(req.preferredDate);
      const alternateDate = new Date(req.alternateDate);

      if (isNaN(preferredDate.getTime())) {
        throw APIError.invalidArgument("Invalid preferred date format");
      }
      if (isNaN(alternateDate.getTime())) {
        throw APIError.invalidArgument("Invalid alternate date format");
      }
      if (!isValidFutureDate(preferredDate)) {
        throw APIError.invalidArgument("Preferred date must be in the future");
      }
      if (!isValidFutureDate(alternateDate)) {
        throw APIError.invalidArgument("Alternate date must be in the future");
      }

      // Check if dates are too far in the future (e.g., 6 months)
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
      if (preferredDate > sixMonthsFromNow || alternateDate > sixMonthsFromNow) {
        throw APIError.invalidArgument("Appointment dates cannot be more than 6 months in the future");
      }

      // Check if alternate date is after preferred date
      if (alternateDate <= preferredDate) {
        throw APIError.invalidArgument("Alternate date must be after preferred date");
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

      // Check for existing appointments
      const existingAppointment = await appointmentsDB.queryRow`
        SELECT id FROM appointments 
        WHERE email = ${sanitizedData.email}
        AND status = 'pending'
        AND created_at > NOW() - INTERVAL '24 hours'
      `;

      if (existingAppointment) {
        throw APIError.failedPrecondition(
          "You already have a pending appointment request. Please wait 24 hours before submitting another request."
        );
      }

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
      
      // Handle specific database errors
      if (err instanceof Error && err.message.includes('duplicate key')) {
        throw APIError.alreadyExists("An appointment with this email already exists");
      }
      
      // Re-throw API errors
      if (err instanceof APIError) throw err;
      
      // Log unexpected errors and return generic error
      console.error("Unexpected error in requestAppointment:", err);
      throw APIError.internal("Failed to save appointment. Please try again later.");
    }
  }
);

// Get appointment by ID
export const getAppointment = api<{ id: string }, AppointmentRequest>(
  { method: "GET", path: "/appointments/:id", expose: true },
  async (req) => {
    try {
      // Validate ID format
      const appointmentId = parseInt(req.id);
      if (isNaN(appointmentId)) {
        throw APIError.invalidArgument("Invalid appointment ID format");
      }

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
        WHERE id = ${appointmentId}
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
      
      // Re-throw API errors
      if (err instanceof APIError) throw err;
      
      // Log unexpected errors and return generic error
      console.error("Unexpected error in getAppointment:", err);
      throw APIError.internal("Failed to fetch appointment. Please try again later.");
    }
  }
);
