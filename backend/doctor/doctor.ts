import { api } from "encore.dev/api";
import type { Doctor, Service } from "./types";

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
      imageUrl: "/images/doctor-profile.jpg",
      certificates: [
        {
          id: "cert1",
          title: "Fellowship in Advanced Endoscopic Sinus Surgery",
          institution: "Johns Hopkins Hospital",
          year: 2010,
          imageUrl: "/images/certificates/hopkins.jpg"
        },
        {
          id: "cert2",
          title: "Advanced Training in Pediatric ENT",
          institution: "Great Ormond Street Hospital",
          year: 2012,
          imageUrl: "/images/certificates/gosh.jpg"
        }
      ],
      procedures: [
        {
          id: "proc1",
          title: "Endoscopic Sinus Surgery",
          date: new Date("2024-01-15"),
          description: "Complex case of chronic sinusitis with polyps",
          mediaUrls: ["/images/procedures/sinus1.jpg", "/images/procedures/sinus2.jpg"],
          type: "image"
        },
        {
          id: "proc2",
          title: "Cochlear Implant Procedure",
          date: new Date("2024-01-10"),
          description: "Successful cochlear implant in a 5-year-old patient",
          mediaUrls: ["/videos/procedures/cochlear.mp4"],
          type: "video"
        }
      ]
    };
  }
);

// Get list of services offered
export const getServices = api<void, { services: Service[] }>(
  { method: "GET", path: "/doctor/services", expose: true },
  async () => {
    return {
      services: [
        {
          id: "ear-treatment",
          name: "Ear Treatment",
          description: "Comprehensive diagnosis and treatment of ear conditions including hearing loss, infections, and balance disorders.",
          imageUrl: "/images/ear-treatment.jpg"
        },
        {
          id: "sinus-surgery",
          name: "Sinus Surgery",
          description: "Advanced surgical procedures for chronic sinusitis and nasal polyps using minimally invasive techniques.",
          imageUrl: "/images/sinus-surgery.jpg"
        },
        {
          id: "throat-disorders",
          name: "Throat Disorders",
          description: "Treatment of throat conditions including tonsillitis, voice disorders, and swallowing difficulties.",
          imageUrl: "/images/throat-disorders.jpg"
        },
        {
          id: "sleep-apnea",
          name: "Sleep Apnea Treatment",
          description: "Diagnosis and treatment of sleep-related breathing disorders and snoring.",
          imageUrl: "/images/sleep-apnea.jpg"
        }
      ]
    };
  }
);
