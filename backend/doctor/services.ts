import { api, APIError } from "encore.dev/api";
import { doctorDB } from "./db";

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: ServiceCategory | null;
}

// Get all service categories
export const getServiceCategories = api<{ lang: "en" | "ar" }, { categories: ServiceCategory[] }>(
  { method: "GET", path: "/doctor/service-categories", expose: true },
  async (req) => {
    try {
      if (!["en", "ar"].includes(req.lang)) {
        throw APIError.invalidArgument("Invalid language specified");
      }

      const rows = await doctorDB.queryAll`
        SELECT 
          id,
          name_${req.lang} as name,
          description_${req.lang} as description,
          icon
        FROM service_categories
        ORDER BY id
      `;

      return {
        categories: rows.map(row => ({
          id: row.id.toString(),
          name: row.name,
          description: row.description,
          icon: row.icon
        }))
      };
    } catch (err) {
      console.error("Failed to fetch service categories:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch service categories");
    }
  }
);

// Get all services
export const getServices = api<{ lang: "en" | "ar" }, { services: Service[] }>(
  { method: "GET", path: "/doctor/services", expose: true },
  async (req) => {
    try {
      if (!["en", "ar"].includes(req.lang)) {
        throw APIError.invalidArgument("Invalid language specified");
      }

      const rows = await doctorDB.queryAll`
        SELECT 
          s.id,
          s.name_${req.lang} as name,
          s.description_${req.lang} as description,
          s.image_url,
          c.id as category_id,
          c.name_${req.lang} as category_name,
          c.description_${req.lang} as category_description,
          c.icon as category_icon
        FROM services s
        LEFT JOIN service_categories c ON s.category_id = c.id
        ORDER BY s.id
      `;

      return {
        services: rows.map(row => ({
          id: row.id.toString(),
          name: row.name,
          description: row.description,
          imageUrl: row.image_url,
          category: row.category_id ? {
            id: row.category_id.toString(),
            name: row.category_name,
            description: row.category_description,
            icon: row.category_icon
          } : null
        }))
      };
    } catch (err) {
      console.error("Failed to fetch services:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch services");
    }
  }
);

// Get service by ID
export const getService = api<{ id: string; lang: "en" | "ar" }, Service>(
  { method: "GET", path: "/doctor/services/:id", expose: true },
  async (req) => {
    try {
      if (!["en", "ar"].includes(req.lang)) {
        throw APIError.invalidArgument("Invalid language specified");
      }

      const row = await doctorDB.queryRow`
        SELECT 
          s.id,
          s.name_${req.lang} as name,
          s.description_${req.lang} as description,
          s.image_url,
          c.id as category_id,
          c.name_${req.lang} as category_name,
          c.description_${req.lang} as category_description,
          c.icon as category_icon
        FROM services s
        LEFT JOIN service_categories c ON s.category_id = c.id
        WHERE s.id = ${req.id}
      `;

      if (!row) {
        throw APIError.notFound("Service not found");
      }

      return {
        id: row.id.toString(),
        name: row.name,
        description: row.description,
        imageUrl: row.image_url,
        category: row.category_id ? {
          id: row.category_id.toString(),
          name: row.category_name,
          description: row.category_description,
          icon: row.category_icon
        } : null
      };
    } catch (err) {
      console.error("Failed to fetch service:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch service");
    }
  }
);
