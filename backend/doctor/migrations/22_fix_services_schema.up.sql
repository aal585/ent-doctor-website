-- Drop existing tables
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create service categories
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'default'
);

-- Create services
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES service_categories(id),
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price_range TEXT NOT NULL DEFAULT 'Contact for pricing',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments', 'علاجات الأذن الشاملة', 'ear'),
('Nose & Sinus', 'الأنف والجيوب الأنفية', 'Advanced nasal procedures', 'إجراءات الأنف المتقدمة', 'nose'),
('Throat Care', 'رعاية الحنجرة', 'Throat treatments', 'علاجات الحنجرة', 'throat');

-- Insert sample services
INSERT INTO services (
  category_id,
  name_en,
  name_ar,
  description_en,
  description_ar,
  image_url,
  price_range
)
SELECT
  id as category_id,
  'Hearing Test',
  'فحص السمع',
  'Professional hearing evaluation',
  'تقييم سمع احترافي',
  '/images/services/hearing.jpg',
  'AED 300-500'
FROM service_categories
WHERE name_en = 'Ear Care';
