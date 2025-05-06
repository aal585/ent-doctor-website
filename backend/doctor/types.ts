// Base types
export interface Doctor {
  name: string;
  title: string;
  qualifications: string[];
  specializations: string[];
  experience: number;
  imageUrl: string;
}

export interface AppointmentRequest {
  patientName: string;
  email: string;
  phone: string;
  preferredDate: Date;
  alternateDate: Date;
  reason: string;
  isNewPatient: boolean;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  date: Date;
  imageUrl: string;
  tags: string[];
  category: string;
  readTimeMinutes?: number;
  viewCount?: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  date: Date;
  verified: boolean;
  procedureType?: string;
  response?: {
    content: string;
    date: Date;
  };
}

// Service related types
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceRange: string;
  category: ServiceCategory | null;
}

// Translation type
export interface Translation {
  [key: string]: {
    en: string;
    ar: string;
  };
}
