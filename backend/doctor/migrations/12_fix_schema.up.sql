-- Drop existing tables to ensure clean state
DROP TABLE IF EXISTS service_results CASCADE;
DROP TABLE IF EXISTS service_details CASCADE;
DROP TABLE IF EXISTS service_category_mapping CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;

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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create service category mapping
CREATE TABLE service_category_mapping (
  service_id BIGINT REFERENCES services(id) ON DELETE CASCADE,
  category_id BIGINT REFERENCES service_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, category_id)
);

-- Create service details
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

-- Create service results
CREATE TABLE service_results (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT REFERENCES services(id) ON DELETE CASCADE,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  procedure_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Create articles table
CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  summary_ar TEXT NOT NULL,
  author TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  view_count INTEGER NOT NULL DEFAULT 0
);

-- Create testimonials table
CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  procedure_type TEXT,
  response_content TEXT,
  response_date TIMESTAMP WITH TIME ZONE
);

-- Create FAQs table
CREATE TABLE faqs (
  id BIGSERIAL PRIMARY KEY,
  question_en TEXT NOT NULL,
  question_ar TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'help-circle'
);

-- Insert sample data for testing
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments', 'علاجات الأذن الشاملة', 'ear'),
('Nose & Sinus', 'الأنف والجيوب الأنفية', 'Advanced nasal procedures', 'إجراءات الأنف المتقدمة', 'nose');

INSERT INTO services (name_en, name_ar, description_en, description_ar, image_url) VALUES
('Hearing Test', 'فحص السمع', 'Complete hearing evaluation', 'تقييم السمع الشامل', '/images/services/hearing.jpg');

INSERT INTO service_category_mapping (service_id, category_id)
SELECT s.id, c.id
FROM services s
CROSS JOIN service_categories c
WHERE c.name_en = 'Ear Care'
LIMIT 1;

INSERT INTO service_details (service_id, benefits_en, benefits_ar, price_range)
SELECT 
  s.id,
  ARRAY['Accurate diagnosis', 'Early detection'],
  ARRAY['تشخيص دقيق', 'الكشف المبكر'],
  'AED 500-1000'
FROM services s;
