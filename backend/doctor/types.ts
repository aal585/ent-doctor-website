// Base types
export interface Doctor {
  name: string;
  title: string;
  qualifications: string[];
  specializations: string[];
  experience: number;
  imageUrl: string;
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

export interface AppointmentRequest {
  patientName: string;
  email: string;
  phone: string;
  preferredDate: Date;
  alternateDate: Date;
  reason: string;
  isNewPatient: boolean;
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
  category: ServiceCategory | null;
}

export interface ServiceDetail {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  benefits: string[];
  procedureSteps: string[];
  recoveryTime: string;
  preparation: string[];
  risks: string[];
  imageUrls: string[];
  videoUrl: string | null;
  priceRange: string;
  results: ServiceResult[];
}

export interface ServiceResult {
  id: string;
  serviceId: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  description: string;
  procedureDate: Date;
}

// Translation type
export interface Translation {
  [key: string]: {
    en: string;
    ar: string;
  };
}
