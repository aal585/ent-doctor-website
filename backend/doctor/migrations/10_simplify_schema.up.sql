-- Drop existing tables
DROP TABLE IF EXISTS service_results CASCADE;
DROP TABLE IF EXISTS service_details CASCADE;
DROP TABLE IF EXISTS service_category_mapping CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create service categories with simplified schema
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'default'
);

-- Create services with simplified schema
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL
);

-- Create simple mapping table
CREATE TABLE service_category_mapping (
  service_id BIGINT REFERENCES services(id) ON DELETE CASCADE,
  category_id BIGINT REFERENCES service_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, category_id)
);

-- Create service details with simplified schema
CREATE TABLE service_details (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT REFERENCES services(id) ON DELETE CASCADE,
  benefits_en TEXT[] DEFAULT '{}',
  benefits_ar TEXT[] DEFAULT '{}',
  procedure_steps_en TEXT[] DEFAULT '{}',
  procedure_steps_ar TEXT[] DEFAULT '{}',
  recovery_time_en TEXT DEFAULT '',
  recovery_time_ar TEXT DEFAULT '',
  preparation_en TEXT[] DEFAULT '{}',
  preparation_ar TEXT[] DEFAULT '{}',
  risks_en TEXT[] DEFAULT '{}',
  risks_ar TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  video_url TEXT,
  price_range TEXT DEFAULT ''
);

-- Create service results with simplified schema
CREATE TABLE service_results (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT REFERENCES services(id) ON DELETE CASCADE,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  procedure_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Insert sample data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Ear treatments', 'علاجات الأذن', 'ear'),
('Nose Care', 'رعاية الأنف', 'Nose treatments', 'علاجات الأنف', 'nose');

INSERT INTO services (name_en, name_ar, description_en, description_ar, image_url) VALUES
('Hearing Test', 'فحص السمع', 'Hearing test description', 'وصف فحص السمع', '/images/hearing.jpg');

INSERT INTO service_category_mapping (service_id, category_id)
SELECT s.id, c.id
FROM services s, service_categories c
WHERE c.name_en = 'Ear Care'
LIMIT 1;

INSERT INTO service_details (service_id, benefits_en, benefits_ar, price_range)
SELECT 
  id,
  ARRAY['Better hearing', 'Early detection'],
  ARRAY['سمع أفضل', 'الكشف المبكر'],
  'AED 500-1000'
FROM services;
