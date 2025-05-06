-- Drop all existing tables
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create simplified service categories
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'stethoscope'
);

-- Create simplified services
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES service_categories(id),
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price_range TEXT NOT NULL DEFAULT 'Contact for pricing'
);

-- Insert test data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Ear treatments', 'علاجات الأذن', 'ear');

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
  id,
  'Hearing Test',
  'فحص السمع',
  'Complete hearing evaluation',
  'تقييم السمع الشامل',
  '/images/services/hearing.jpg',
  'AED 300-500'
FROM service_categories
WHERE name_en = 'Ear Care';
