export interface Doctor {
  name: string;
  title: string;
  qualifications: string[];
  specializations: string[];
  experience: number;
  imageUrl: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  date: Date;
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
