import { api } from "encore.dev/api";
import type { Doctor, Service, Testimonial } from "./types";

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

// Get patient testimonials
export const getTestimonials = api<void, { testimonials: Testimonial[] }>(
  { method: "GET", path: "/doctor/testimonials", expose: true },
  async () => {
    return {
      testimonials: [
        {
          id: "1",
          patientName: "Sarah Johnson",
          content: "Dr. Sultan's expertise in treating my chronic sinusitis was exceptional. His approach was thorough and the results were remarkable.",
          rating: 5,
          date: new Date("2024-01-15")
        },
        {
          id: "2",
          patientName: "Michael Chen",
          content: "I had been struggling with sleep apnea for years. Dr. Sultan's treatment plan has significantly improved my quality of life.",
          rating: 5,
          date: new Date("2024-01-10")
        }
      ]
    };
  }
);
