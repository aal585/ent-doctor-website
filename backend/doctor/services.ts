import { api } from "encore.dev/api";

// Simplest possible service endpoint
export const listServices = api<void, { services: Array<{
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}> }>(
  { 
    method: "GET", 
    path: "/doctor/services", 
    expose: true 
  },
  async () => {
    // Return minimal static data
    return {
      services: [
        {
          id: "1",
          name: "Hearing Test",
          description: "Complete hearing evaluation",
          imageUrl: "/images/services/hearing.jpg"
        },
        {
          id: "2",
          name: "Nasal Surgery",
          description: "Treatment for nasal problems",
          imageUrl: "/images/services/nasal.jpg"
        }
      ]
    };
  }
);
