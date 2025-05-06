-- Drop existing tables if they exist
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create service categories table
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL CHECK (length(trim(name_en)) > 0),
  name_ar TEXT NOT NULL CHECK (length(trim(name_ar)) > 0),
  description_en TEXT NOT NULL CHECK (length(trim(description_en)) > 0),
  description_ar TEXT NOT NULL CHECK (length(trim(description_ar)) > 0),
  icon TEXT NOT NULL DEFAULT 'stethoscope'
);

-- Create services table
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES service_categories(id),
  name_en TEXT NOT NULL CHECK (length(trim(name_en)) > 0),
  name_ar TEXT NOT NULL CHECK (length(trim(name_ar)) > 0),
  description_en TEXT NOT NULL CHECK (length(trim(description_en)) > 0),
  description_ar TEXT NOT NULL CHECK (length(trim(description_ar)) > 0),
  image_url TEXT NOT NULL CHECK (length(trim(image_url)) > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_created ON services(created_at DESC);

-- Insert initial categories
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
  image_url
)
SELECT
  id as category_id,
  'Hearing Test',
  'فحص السمع',
  'Professional hearing evaluation',
  'تقييم سمع احترافي',
  '/images/services/hearing.jpg'
FROM service_categories
WHERE name_en = 'Ear Care';
