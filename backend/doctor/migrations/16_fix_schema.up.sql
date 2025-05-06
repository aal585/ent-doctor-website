-- Drop existing tables
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
  icon TEXT NOT NULL DEFAULT 'stethoscope'
);

-- Create services
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES service_categories(id),
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
  benefits_en TEXT[] DEFAULT ARRAY[]::TEXT[],
  benefits_ar TEXT[] DEFAULT ARRAY[]::TEXT[],
  recovery_time_en TEXT DEFAULT '',
  recovery_time_ar TEXT DEFAULT '',
  price_range TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
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

-- Insert initial data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments', 'علاجات الأذن الشاملة', 'ear'),
('Nose & Sinus', 'الأنف والجيوب الأنفية', 'Advanced nasal procedures', 'إجراءات الأنف المتقدمة', 'nose'),
('Throat Care', 'رعاية الحنجرة', 'Throat treatments', 'علاجات الحنجرة', 'throat');

-- Insert sample service
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
  id as category_id,
  'Hearing Test',
  'فحص السمع',
  'Professional hearing evaluation',
  'تقييم سمع احترافي',
  '/images/services/hearing.jpg',
  ARRAY['Early detection', 'Professional diagnosis'],
  ARRAY['الكشف المبكر', 'تشخيص احترافي'],
  'AED 300-500'
FROM service_categories
WHERE name_en = 'Ear Care';

-- Insert sample FAQ
INSERT INTO faqs (question_en, question_ar, answer_en, answer_ar, category, icon) VALUES
('What should I expect during my first visit?', 'ماذا يمكن أن أتوقع خلال زيارتي الأولى؟',
 'During your first visit, we will review your medical history and perform a comprehensive examination.',
 'خلال زيارتك الأولى، سنراجع تاريخك الطبي ونجري فحصاً شاملاً.',
 'Appointments', 'calendar');

-- Insert sample article
INSERT INTO articles (
  title_en, title_ar,
  content_en, content_ar,
  summary_en, summary_ar,
  author, image_url, category, tags
) VALUES (
  'Understanding Hearing Loss', 'فهم فقدان السمع',
  'Detailed content about hearing loss...', 'محتوى مفصل عن فقدان السمع...',
  'Learn about the causes and treatments of hearing loss', 'تعرف على أسباب وعلاجات فقدان السمع',
  'Dr. Ahmed Sultan',
  '/images/articles/hearing-loss.jpg',
  'Patient Education',
  ARRAY['hearing', 'education']
);
