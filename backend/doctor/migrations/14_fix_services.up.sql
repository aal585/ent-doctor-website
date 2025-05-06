-- Drop existing tables
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
  icon TEXT NOT NULL DEFAULT 'default'
);

-- Create services
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
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
  video_url TEXT,
  price_range TEXT NOT NULL DEFAULT '',
  category_id BIGINT REFERENCES service_categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments', 'علاجات الأذن الشاملة', 'ear'),
('Nose & Sinus', 'الأنف والجيوب الأنفية', 'Advanced nasal procedures', 'إجراءات الأنف المتقدمة', 'nose'),
('Throat & Voice', 'الحنجرة والصوت', 'Voice and throat treatments', 'علاجات الصوت والحنجرة', 'throat');

-- Insert sample services
INSERT INTO services (
  name_en,
  name_ar,
  description_en,
  description_ar,
  image_url,
  benefits_en,
  benefits_ar,
  recovery_time_en,
  recovery_time_ar,
  price_range,
  category_id
) 
SELECT 
  'Hearing Test',
  'فحص السمع',
  'Complete hearing evaluation',
  'تقييم السمع الشامل',
  '/images/services/hearing.jpg',
  ARRAY['Early detection', 'Accurate diagnosis'],
  ARRAY['الكشف المبكر', 'التشخيص الدقيق'],
  'Immediate',
  'فوري',
  'AED 500-1000',
  id
FROM service_categories
WHERE name_en = 'Ear Care';
