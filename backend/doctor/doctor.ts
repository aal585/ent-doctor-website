import { api } from "encore.dev/api";
import type { Doctor, Certificate, Procedure, Service, Testimonial, Article, FAQ } from "./types";

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
          date: new Date("2024-01-15"),
          verified: true,
          procedureType: "Sinus Surgery",
          response: {
            content: "Thank you for your kind words, Sarah. I'm glad we could help improve your quality of life.",
            date: new Date("2024-01-16")
          }
        },
        {
          id: "2",
          patientName: "Michael Chen",
          content: "I had been struggling with sleep apnea for years. Dr. Sultan's treatment plan has significantly improved my quality of life.",
          rating: 5,
          date: new Date("2024-01-10"),
          verified: true,
          procedureType: "Sleep Apnea Treatment"
        }
      ]
    };
  }
);

// Get articles
export const getArticles = api<void, { articles: Article[] }>(
  { method: "GET", path: "/doctor/articles", expose: true },
  async () => {
    return {
      articles: [
        {
          id: "1",
          title: "Understanding Sleep Apnea: Causes and Treatment Options",
          content: "...", // Full article content
          summary: "Learn about the common causes of sleep apnea and various treatment options available.",
          author: "Dr. Ahmed Sultan",
          date: new Date("2024-01-20"),
          imageUrl: "/images/articles/sleep-apnea.jpg",
          tags: ["Sleep Apnea", "Treatment", "Health"],
          category: "Patient Education"
        },
        {
          id: "2",
          title: "Latest Advances in Sinus Surgery",
          content: "...", // Full article content
          summary: "Explore the newest technological advances in minimally invasive sinus surgery.",
          author: "Dr. Ahmed Sultan",
          date: new Date("2024-01-18"),
          imageUrl: "/images/articles/sinus-surgery.jpg",
          tags: ["Surgery", "Technology", "Innovation"],
          category: "Medical Advances"
        }
      ]
    };
  }
);

// Get FAQs
export const getFAQs = api<void, { faqs: FAQ[] }>(
  { method: "GET", path: "/doctor/faqs", expose: true },
  async () => {
    return {
      faqs: [
        {
          id: "1",
          question: "What should I expect during my first visit?",
          answer: "During your first visit, we'll review your medical history, perform a comprehensive examination, and discuss your symptoms. This helps us create a personalized treatment plan.",
          category: "Appointments"
        },
        {
          id: "2",
          question: "How long does a typical ENT surgery take?",
          answer: "The duration varies depending on the procedure. Simple procedures might take 30-60 minutes, while more complex surgeries can take 2-3 hours. We'll discuss the specific timeline during your consultation.",
          category: "Procedures"
        },
        {
          id: "3",
          question: "Is sinus surgery painful?",
          answer: "Most patients experience minimal pain after sinus surgery. We use advanced techniques and proper pain management to ensure your comfort during recovery.",
          category: "Procedures"
        }
      ]
    };
  }
);
