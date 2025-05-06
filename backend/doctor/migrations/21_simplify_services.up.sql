-- Start fresh with a simple schema
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create basic service categories
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'default'
);

-- Create basic services
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price_range TEXT NOT NULL DEFAULT 'Contact for pricing',
  category_id BIGINT REFERENCES service_categories(id)
);

-- Insert test data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Ear treatments', 'علاجات الأذن', 'ear');

INSERT INTO services (
  name_en,
  name_ar,
  description_en,
  description_ar,
  image_url,
  category_id
)
SELECT
  'Hearing Test',
  'فحص السمع',
  'Complete hearing evaluation',
  'تقييم السمع الشامل',
  '/images/services/hearing.jpg',
  id
FROM service_categories
LIMIT 1;
