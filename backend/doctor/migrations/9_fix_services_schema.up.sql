-- Drop existing tables and recreate with proper constraints
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
  icon TEXT NOT NULL DEFAULT 'default-icon'
);

-- Create services
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create mapping table
CREATE TABLE service_category_mapping (
  service_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, category_id)
);

-- Create service details
CREATE TABLE service_details (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT NOT NULL,
  title_en TEXT NOT NULL DEFAULT '',
  title_ar TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_ar TEXT NOT NULL DEFAULT '',
  benefits_en TEXT[] NOT NULL DEFAULT '{}',
  benefits_ar TEXT[] NOT NULL DEFAULT '{}',
  procedure_steps_en TEXT[] NOT NULL DEFAULT '{}',
  procedure_steps_ar TEXT[] NOT NULL DEFAULT '{}',
  recovery_time_en TEXT NOT NULL DEFAULT '',
  recovery_time_ar TEXT NOT NULL DEFAULT '',
  preparation_en TEXT[] NOT NULL DEFAULT '{}',
  preparation_ar TEXT[] NOT NULL DEFAULT '{}',
  risks_en TEXT[] NOT NULL DEFAULT '{}',
  risks_ar TEXT[] NOT NULL DEFAULT '{}',
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  video_url TEXT,
  price_range TEXT NOT NULL DEFAULT '',
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Create service results
CREATE TABLE service_results (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT NOT NULL,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  description_en TEXT NOT NULL DEFAULT '',
  description_ar TEXT NOT NULL DEFAULT '',
  procedure_date DATE NOT NULL DEFAULT CURRENT_DATE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Insert initial data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments', 'علاجات الأذن الشاملة', 'ear'),
('Nose & Sinus', 'الأنف والجيوب الأنفية', 'Nasal and sinus procedures', 'إجراءات الأنف والجيوب الأنفية', 'nose'),
('Throat', 'الحنجرة', 'Throat treatments', 'علاجات الحنجرة', 'throat');

-- Insert sample service
INSERT INTO services (name_en, name_ar, description_en, description_ar, image_url) VALUES
('Hearing Test', 'فحص السمع', 'Complete hearing evaluation', 'تقييم السمع الشامل', '/images/services/hearing.jpg');

-- Create mapping
INSERT INTO service_category_mapping (service_id, category_id)
SELECT s.id, c.id
FROM services s, service_categories c
WHERE c.name_en = 'Ear Care'
AND s.name_en = 'Hearing Test';

-- Create service detail
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
  id,
  name_en,
  name_ar,
  description_en,
  description_ar,
  'Immediate',
  'فوري',
  'AED 500-1000'
FROM services;
