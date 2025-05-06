import { api, APIError } from "encore.dev/api";

// Define the interface locally to avoid import issues
interface Doctor {
  name: string;
  title: string;
  qualifications: string[];
  specializations: string[];
  experience: number;
  imageUrl: string;
}

// Get doctor profile information
export const getProfile = api<void, Doctor>(
  { method: "GET", path: "/doctor/profile", expose: true },
  async () => {
    try {
      return {
        name: "Dr. Ahmed Sultan",
        title: "ENT Specialist & Surgeon",
        qualifications: [
          "MBBS",
          "MS - Otorhinolaryngology",
          "DNB - Otorhinolaryngology"
        ],
        specializations: [
          "Ear Surgery",
          "Sinus Surgery",
          "Voice Disorders",
          "Sleep Apnea",
          "Pediatric ENT"
        ],
        experience: 15,
        imageUrl: "/images/doctor-profile.jpg"
      };
    } catch (err) {
      console.error("Failed to fetch doctor profile:", err);
      throw APIError.internal("Failed to fetch doctor profile");
    }
  }
);
