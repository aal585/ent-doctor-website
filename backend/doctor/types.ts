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
