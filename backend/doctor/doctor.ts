import { api } from "encore.dev/api";
import type { Doctor } from "./types";

// Get doctor profile information
export const getProfile = api<void, Doctor>(
  { method: "GET", path: "/doctor/profile", expose: true },
  async () => {
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
  }
);
