export interface Doctor {
  name: string;
  title: string;
  qualifications: string[];
  specializations: string[];
  experience: number;
  imageUrl: string;
  certificates: Certificate[];
  procedures: Procedure[];
}

export interface Certificate {
  id: string;
  title: string;
  institution: string;
  year: number;
  imageUrl: string;
}

export interface Procedure {
  id: string;
  title: string;
  date: Date;
  description: string;
  mediaUrls: string[];
  type: "image" | "video";
}

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
  category: ServiceCategory;
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
  videoUrl?: string;
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
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
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

export interface Translation {
  [key: string]: {
    en: string;
    ar: string;
  };
}
