-- Reset schema
DROP TABLE IF EXISTS service_results CASCADE;
DROP TABLE IF EXISTS service_details CASCADE;
DROP TABLE IF EXISTS service_category_mapping CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create basic tables
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  icon TEXT NOT NULL
);

CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE service_category_mapping (
  service_id BIGINT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  category_id BIGINT NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, category_id)
);

CREATE TABLE service_details (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
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

CREATE TABLE service_results (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  procedure_date DATE NOT NULL
);

-- Insert test data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments', 'علاجات الأذن الشاملة', 'ear');

INSERT INTO services (name_en, name_ar, description_en, description_ar, image_url) VALUES
('Hearing Test', 'فحص السمع', 'Professional hearing evaluation', 'تقييم السمع المهني', '/images/services/hearing.jpg');

INSERT INTO service_category_mapping (service_id, category_id)
SELECT s.id, c.id FROM services s, service_categories c;

INSERT INTO service_details (
  service_id,
  benefits_en,
  benefits_ar,
  recovery_time_en,
  recovery_time_ar,
  price_range
)
SELECT 
  id,
  ARRAY['Accurate diagnosis', 'Professional evaluation'],
  ARRAY['تشخيص دقيق', 'تقييم مهني'],
  'Immediate',
  'فوري',
  'AED 300-500'
FROM services;
