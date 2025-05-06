-- Drop existing tables
DROP TABLE IF EXISTS service_results CASCADE;
DROP TABLE IF EXISTS service_details CASCADE;
DROP TABLE IF EXISTS service_category_mapping CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create simplified tables
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'default'
);

CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES service_categories(id),
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
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
  video_url TEXT,
  price_range TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments', 'علاجات الأذن الشاملة', 'ear'),
('Nose & Sinus', 'الأنف والجيوب الأنفية', 'Advanced nasal procedures', 'إجراءات الأنف المتقدمة', 'nose');

INSERT INTO services (
  category_id,
  name_en,
  name_ar,
  description_en,
  description_ar,
  image_url,
  benefits_en,
  benefits_ar,
  price_range
) 
SELECT 
  c.id,
  'Hearing Test',
  'فحص السمع',
  'Complete hearing evaluation',
  'تقييم السمع الشامل',
  '/images/services/hearing.jpg',
  ARRAY['Accurate diagnosis', 'Early detection'],
  ARRAY['تشخيص دقيق', 'الكشف المبكر'],
  'AED 500-1000'
FROM service_categories c
WHERE c.name_en = 'Ear Care';
