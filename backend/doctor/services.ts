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
      const nameField = req.lang === "en" ? "name_en" : "name_ar";
      const descField = req.lang === "en" ? "description_en" : "description_ar";
      
      const result = await doctorDB.rawQuery(
        `SELECT id::text as id, ${nameField} as name, ${descField} as description, icon 
         FROM service_categories 
         ORDER BY id`
      );

      const categories = [];
      for await (const row of result) {
        categories.push({
          id: row.id,
          name: row.name,
          description: row.description,
          icon: row.icon
        });
      }

      return { categories };
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
    try {
      const nameField = req.lang === "en" ? "name_en" : "name_ar";
      const descField = req.lang === "en" ? "description_en" : "description_ar";
      const catNameField = req.lang === "en" ? "c.name_en" : "c.name_ar";
      const catDescField = req.lang === "en" ? "c.description_en" : "c.description_ar";

      let query = `
        SELECT 
          s.id::text as id,
          s.${nameField} as name,
          s.${descField} as description,
          s.image_url as "imageUrl",
          c.id::text as "categoryId",
          ${catNameField} as "categoryName",
          ${catDescField} as "categoryDescription",
          c.icon as "categoryIcon"
        FROM services s
        LEFT JOIN service_category_mapping m ON s.id = m.service_id
        LEFT JOIN service_categories c ON m.category_id = c.id
      `;

      const params = [];
      if (req.categoryId) {
        query += " WHERE c.id = $1";
        params.push(req.categoryId);
      }

      query += " ORDER BY s.id";

      const result = await doctorDB.rawQuery(query, ...params);

      const services = [];
      for await (const row of result) {
        services.push({
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
        });
      }

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
  { method: "GET", path: "/doctor/services/:serviceId", expose: true },
  async (req) => {
    try {
      const nameField = req.lang === "en" ? "name_en" : "name_ar";
      const descField = req.lang === "en" ? "description_en" : "description_ar";
      const benefitsField = req.lang === "en" ? "benefits_en" : "benefits_ar";
      const stepsField = req.lang === "en" ? "procedure_steps_en" : "procedure_steps_ar";
      const recoveryField = req.lang === "en" ? "recovery_time_en" : "recovery_time_ar";
      const prepField = req.lang === "en" ? "preparation_en" : "preparation_ar";
      const risksField = req.lang === "en" ? "risks_en" : "risks_ar";

      const service = await doctorDB.queryRow(
        `SELECT 
          s.id::text as id,
          s.${nameField} as name,
          s.${descField} as description,
          s.image_url as "imageUrl",
          COALESCE(d.${benefitsField}, '{}'::text[]) as benefits,
          COALESCE(d.${stepsField}, '{}'::text[]) as "procedureSteps",
          COALESCE(d.${recoveryField}, '') as "recoveryTime",
          COALESCE(d.${prepField}, '{}'::text[]) as preparation,
          COALESCE(d.${risksField}, '{}'::text[]) as risks,
          COALESCE(d.image_urls, '{}'::text[]) as "imageUrls",
          d.video_url as "videoUrl",
          COALESCE(d.price_range, '') as "priceRange"
        FROM services s
        LEFT JOIN service_details d ON s.id = d.service_id
        WHERE s.id = $1`,
        req.serviceId
      );

      if (!service) {
        throw APIError.notFound("Service not found");
      }

      const results = await doctorDB.queryAll(
        `SELECT 
          id::text as id,
          service_id::text as "serviceId",
          before_image_url as "beforeImageUrl",
          after_image_url as "afterImageUrl",
          ${descField} as description,
          procedure_date as "procedureDate"
        FROM service_results 
        WHERE service_id = $1 
        ORDER BY procedure_date DESC`,
        req.serviceId
      );

      return {
        id: service.id,
        serviceId: service.id,
        title: service.name,
        description: service.description,
        benefits: service.benefits || [],
        procedureSteps: service.procedureSteps || [],
        recoveryTime: service.recoveryTime || "",
        preparation: service.preparation || [],
        risks: service.risks || [],
        imageUrls: service.imageUrls || [],
        videoUrl: service.videoUrl,
        priceRange: service.priceRange || "",
        results: results.map(r => ({
          id: r.id,
          serviceId: r.serviceId,
          beforeImageUrl: r.beforeImageUrl,
          afterImageUrl: r.afterImageUrl,
          description: r.description,
          procedureDate: new Date(r.procedureDate)
        }))
      };
    } catch (err) {
      console.error("Failed to fetch service detail:", err);
      if (err instanceof APIError) throw err;
      throw APIError.internal("Failed to fetch service detail");
    }
  }
);
