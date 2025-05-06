import { api, APIError } from "encore.dev/api";
import type { Service, ServiceCategory } from "./types";
import { doctorDB } from "./db";

interface ServiceRow {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceRange: string;
  categoryId: string | null;
  categoryName: string | null;
  categoryDescription: string | null;
  categoryIcon: string | null;
}

// Get service categories
export const listServiceCategories = api<
  { lang: "en" | "ar" },
  { categories: ServiceCategory[] }
>(
  { method: "GET", path: "/doctor/service-categories", expose: true },
  async (req) => {
    try {
      if (!["en", "ar"].includes(req.lang)) {
        throw APIError.invalidArgument("Invalid language specified");
      }

      const langField = req.lang === "en" ? "en" : "ar";
      const rows = await doctorDB.queryAll`
        SELECT 
          id::text,
          name_${langField} as name,
          description_${langField} as description,
          icon
        FROM service_categories 
        ORDER BY id
      `;

      return {
        categories: rows.map(row => ({
          id: row.id,
          name: row.name,
          description: row.description,
          icon: row.icon
        }))
      };
    } catch (err) {
      console.error("Failed to fetch service categories:", err);
      throw APIError.internal("Failed to fetch service categories");
    }
  }
);

// Get all services
export const listServices = api<
  { lang: "en" | "ar" },
  { services: Service[] }
>(
  { method: "GET", path: "/doctor/services", expose: true },
  async (req) => {
    try {
      if (!["en", "ar"].includes(req.lang)) {
        throw APIError.invalidArgument("Invalid language specified");
      }

      const langField = req.lang === "en" ? "en" : "ar";
      const rows = await doctorDB.queryAll<ServiceRow>`
        SELECT 
          s.id::text as id,
          s.name_${langField} as name,
          s.description_${langField} as description,
          s.image_url as "imageUrl",
          s.price_range as "priceRange",
          c.id::text as "categoryId",
          c.name_${langField} as "categoryName",
          c.description_${langField} as "categoryDescription",
          c.icon as "categoryIcon"
        FROM services s
        LEFT JOIN service_categories c ON s.category_id = c.id
      `;

      return {
        services: rows.map(row => ({
          id: row.id,
          name: row.name,
          description: row.description,
          imageUrl: row.imageUrl,
          priceRange: row.priceRange,
          category: row.categoryId ? {
            id: row.categoryId,
            name: row.categoryName || '',
            description: row.categoryDescription || '',
            icon: row.categoryIcon || 'default'
          } : null
        }))
      };
    } catch (err) {
      console.error("Failed to fetch services:", err);
      throw APIError.internal("Failed to fetch services");
    }
  }
);

// Get service by ID
export const getService = api<
  { id: string; lang: "en" | "ar" },
  Service
>(
  { method: "GET", path: "/doctor/services/:id", expose: true },
  async (req) => {
    try {
      if (!["en", "ar"].includes(req.lang)) {
        throw APIError.invalidArgument("Invalid language specified");
      }

      const langField = req.lang === "en" ? "en" : "ar";
      const row = await doctorDB.queryRow<ServiceRow>`
        SELECT 
          s.id::text as id,
          s.name_${langField} as name,
          s.description_${langField} as description,
          s.image_url as "imageUrl",
          s.price_range as "priceRange",
          c.id::text as "categoryId",
          c.name_${langField} as "categoryName",
          c.description_${langField} as "categoryDescription",
          c.icon as "categoryIcon"
        FROM services s
        LEFT JOIN service_categories c ON s.category_id = c.id
        WHERE s.id = ${req.id}::bigint
      `;

      if (!row) {
        throw APIError.notFound("Service not found");
      }

      return {
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.imageUrl,
        priceRange: row.priceRange,
        category: row.categoryId ? {
          id: row.categoryId,
          name: row.categoryName || '',
          description: row.categoryDescription || '',
          icon: row.categoryIcon || 'default'
        } : null
      };
    } catch (err) {
      console.error("Failed to fetch service:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch service");
    }
  }
);
