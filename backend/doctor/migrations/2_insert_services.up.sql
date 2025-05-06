-- Insert initial categories
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) 
VALUES (
  'Ear Care',
  'رعاية الأذن',
  'Comprehensive ear treatments',
  'علاجات الأذن الشاملة',
  'ear'
);

INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon)
VALUES (
  'Nose & Sinus',
  'الأنف والجيوب الأنفية',
  'Advanced nasal procedures',
  'إجراءات الأنف المتقدمة',
  'nose'
);

INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon)
VALUES (
  'Throat Care',
  'رعاية الحنجرة',
  'Throat treatments',
  'علاجات الحنجرة',
  'throat'
);

-- Insert sample service
INSERT INTO services (
  category_id,
  name_en,
  name_ar,
  description_en,
  description_ar,
  image_url
)
SELECT
  id,
  'Hearing Test',
  'فحص السمع',
  'Professional hearing evaluation',
  'تقييم سمع احترافي',
  '/images/services/hearing.jpg'
FROM service_categories
WHERE name_en = 'Ear Care'
LIMIT 1;
