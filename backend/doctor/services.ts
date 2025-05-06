import { api, APIError } from "encore.dev/api";
import type { Service, ServiceDetail, ServiceCategory } from "./types";
import { doctorDB } from "./db";

// Get service categories
export const listServiceCategories = api<
  { lang: "en" | "ar" },
  { categories: ServiceCategory[] }
>(
  { method: "GET", path: "/doctor/service-categories", expose: true },
  async (req) => {
    if (!["en", "ar"].includes(req.lang)) {
      throw APIError.invalidArgument("Invalid language specified");
    }

    try {
      const rows = await doctorDB.queryAll`
        SELECT 
          id::text,
          name_${req.lang} as name,
          description_${req.lang} as description,
          icon
        FROM service_categories 
        ORDER BY id
      `;

      return {
        categories: rows.map(row => ({
          id: row.id,
          name: row.name || '',
          description: row.description || '',
          icon: row.icon || 'default'
        }))
      };
    } catch (err) {
      console.error("Failed to fetch service categories:", err);
      throw APIError.internal("Failed to fetch service categories");
    }
  }
);

// Get services by category
export const listServices = api<
  { categoryId?: string; lang: "en" | "ar" },
  { services: Service[] }
>(
  { method: "GET", path: "/doctor/services", expose: true },
  async (req) => {
    if (!["en", "ar"].includes(req.lang)) {
      throw APIError.invalidArgument("Invalid language specified");
    }

    try {
      let query = doctorDB.queryAll`
        SELECT 
          s.id::text,
          s.name_${req.lang} as name,
          s.description_${req.lang} as description,
          s.image_url as "imageUrl",
          c.id::text as "categoryId",
          c.name_${req.lang} as "categoryName",
          c.description_${req.lang} as "categoryDescription",
          c.icon as "categoryIcon"
        FROM services s
        LEFT JOIN service_categories c ON s.category_id = c.id
      `;

      if (req.categoryId) {
        query = doctorDB.queryAll`
          ${query} WHERE c.id = ${req.categoryId}::bigint
        `;
      }

      const rows = await query;

      return {
        services: rows.map(row => ({
          id: row.id,
          name: row.name || '',
          description: row.description || '',
          imageUrl: row.imageUrl || '',
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

// Get detailed service information
export const getServiceDetail = api<
  { serviceId: string; lang: "en" | "ar" },
  ServiceDetail
>(
  { method: "GET", path: "/doctor/services/:serviceId", expose: true },
  async (req) => {
    if (!["en", "ar"].includes(req.lang)) {
      throw APIError.invalidArgument("Invalid language specified");
    }

    if (!req.serviceId || !/^\d+$/.test(req.serviceId)) {
      throw APIError.invalidArgument("Invalid service ID");
    }

    try {
      const service = await doctorDB.queryRow`
        SELECT 
          id::text,
          name_${req.lang} as title,
          description_${req.lang} as description,
          benefits_${req.lang} as benefits,
          procedure_steps_${req.lang} as "procedureSteps",
          recovery_time_${req.lang} as "recoveryTime",
          preparation_${req.lang} as preparation,
          risks_${req.lang} as risks,
          image_url as "imageUrl",
          video_url as "videoUrl",
          price_range as "priceRange"
        FROM services
        WHERE id = ${req.serviceId}::bigint
      `;

      if (!service) {
        throw APIError.notFound("Service not found");
      }

      return {
        id: service.id,
        serviceId: service.id,
        title: service.title || '',
        description: service.description || '',
        benefits: service.benefits || [],
        procedureSteps: service.procedureSteps || [],
        recoveryTime: service.recoveryTime || '',
        preparation: service.preparation || [],
        risks: service.risks || [],
        imageUrls: [service.imageUrl],
        videoUrl: service.videoUrl || null,
        priceRange: service.priceRange || '',
        results: []
      };
    } catch (err) {
      console.error("Failed to fetch service detail:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch service detail");
    }
  }
);
