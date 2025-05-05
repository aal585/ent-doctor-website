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

      return { categories: rows };
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
  { method: "GET", path: "/doctor/services/list", expose: true },
  async (req) => {
    try {
      let query = doctorDB.queryAll`
        SELECT DISTINCT
          s.id,
          s.name_${req.lang} as name,
          s.description_${req.lang} as description,
          s.image_url as "imageUrl",
          c.id::text as "categoryId",
          c.name_${req.lang} as "categoryName",
          c.description_${req.lang} as "categoryDescription",
          c.icon as "categoryIcon"
        FROM services s
        JOIN service_category_mapping m ON s.id = m.service_id
        JOIN service_categories c ON m.category_id = c.id
      `;

      if (req.categoryId) {
        query = doctorDB.queryAll`
          ${query} WHERE c.id = ${req.categoryId}::bigint
        `;
      }

      query = doctorDB.queryAll`${query} ORDER BY s.id`;

      const rows = await query;

      const services = rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.imageUrl,
        category: {
          id: row.categoryId,
          name: row.categoryName,
          description: row.categoryDescription,
          icon: row.categoryIcon
        }
      }));

      return { services };
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
  { method: "GET", path: "/doctor/services/:serviceId/detail", expose: true },
  async (req) => {
    try {
      const detail = await doctorDB.queryRow`
        SELECT
          id::text,
          service_id as "serviceId",
          title_${req.lang} as title,
          description_${req.lang} as description,
          benefits_${req.lang} as benefits,
          procedure_steps_${req.lang} as "procedureSteps",
          recovery_time_${req.lang} as "recoveryTime",
          preparation_${req.lang} as preparation,
          risks_${req.lang} as risks,
          image_urls as "imageUrls",
          video_url as "videoUrl",
          price_range as "priceRange"
        FROM service_details
        WHERE service_id = ${req.serviceId}
      `;

      if (!detail) {
        throw APIError.notFound("Service not found");
      }

      const results = await doctorDB.queryAll`
        SELECT
          id::text,
          service_id as "serviceId",
          before_image_url as "beforeImageUrl",
          after_image_url as "afterImageUrl",
          description_${req.lang} as description,
          procedure_date as "procedureDate"
        FROM service_results
        WHERE service_id = ${req.serviceId}
        ORDER BY procedure_date DESC
      `;

      return {
        ...detail,
        results
      };
    } catch (err) {
      if (err instanceof APIError) throw err;
      console.error("Failed to fetch service detail:", err);
      throw APIError.internal("Failed to fetch service detail");
    }
  }
);
