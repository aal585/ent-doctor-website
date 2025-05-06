-- Drop and recreate tables to ensure correct structure
DROP TABLE IF EXISTS service_results CASCADE;
DROP TABLE IF EXISTS service_details CASCADE;
DROP TABLE IF EXISTS service_category_mapping CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create service categories
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Create services
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create service category mapping
CREATE TABLE service_category_mapping (
  service_id BIGINT REFERENCES services(id),
  category_id BIGINT REFERENCES service_categories(id),
  PRIMARY KEY (service_id, category_id)
);

-- Create service details
CREATE TABLE service_details (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT REFERENCES services(id),
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  benefits_en TEXT[] NOT NULL DEFAULT '{}',
  benefits_ar TEXT[] NOT NULL DEFAULT '{}',
  procedure_steps_en TEXT[] NOT NULL DEFAULT '{}',
  procedure_steps_ar TEXT[] NOT NULL DEFAULT '{}',
  recovery_time_en TEXT NOT NULL,
  recovery_time_ar TEXT NOT NULL,
  preparation_en TEXT[] NOT NULL DEFAULT '{}',
  preparation_ar TEXT[] NOT NULL DEFAULT '{}',
  risks_en TEXT[] NOT NULL DEFAULT '{}',
  risks_ar TEXT[] NOT NULL DEFAULT '{}',
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  video_url TEXT,
  price_range TEXT NOT NULL
);

-- Create service results
CREATE TABLE service_results (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT REFERENCES services(id),
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  procedure_date DATE NOT NULL
);

-- Insert sample data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments', 'علاجات الأذن الشاملة', 'ear'),
('Nose & Sinus', 'الأنف والجيوب الأنفية', 'Nasal and sinus procedures', 'إجراءات الأنف والجيوب الأنفية', 'nose'),
('Throat', 'الحنجرة', 'Throat treatments', 'علاجات الحنجرة', 'throat');

-- Insert sample services
INSERT INTO services (name_en, name_ar, description_en, description_ar, image_url) VALUES
('Hearing Test', 'فحص السمع', 'Complete hearing evaluation', 'تقييم السمع الشامل', '/images/services/hearing.jpg'),
('Sinus Surgery', 'جراحة الجيوب الأنفية', 'Advanced sinus procedures', 'إجراءات الجيوب الأنفية المتقدمة', '/images/services/sinus.jpg');

-- Map services to categories
INSERT INTO service_category_mapping (service_id, category_id)
SELECT s.id, c.id
FROM services s
CROSS JOIN service_categories c
WHERE 
  (s.name_en = 'Hearing Test' AND c.name_en = 'Ear Care') OR
  (s.name_en = 'Sinus Surgery' AND c.name_en = 'Nose & Sinus');

-- Insert service details
INSERT INTO service_details (
  service_id,
  title_en,
  title_ar,
  description_en,
  description_ar,
  recovery_time_en,
  recovery_time_ar,
  price_range
)
SELECT 
  s.id,
  s.name_en,
  s.name_ar,
  s.description_en,
  s.description_ar,
  '1-2 weeks',
  '1-2 أسابيع',
  'AED 500-1000'
FROM services s;
