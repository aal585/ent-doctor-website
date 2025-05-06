-- Drop all existing tables
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create service categories
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL CHECK (length(trim(name_en)) > 0),
  name_ar TEXT NOT NULL CHECK (length(trim(name_ar)) > 0),
  description_en TEXT NOT NULL CHECK (length(trim(description_en)) > 0),
  description_ar TEXT NOT NULL CHECK (length(trim(description_ar)) > 0),
  icon TEXT NOT NULL DEFAULT 'stethoscope'
);

-- Create services
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES service_categories(id),
  name_en TEXT NOT NULL CHECK (length(trim(name_en)) > 0),
  name_ar TEXT NOT NULL CHECK (length(trim(name_ar)) > 0),
  description_en TEXT NOT NULL CHECK (length(trim(description_en)) > 0),
  description_ar TEXT NOT NULL CHECK (length(trim(description_ar)) > 0),
  image_url TEXT NOT NULL CHECK (length(trim(image_url)) > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create articles
CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  title_en TEXT NOT NULL CHECK (length(trim(title_en)) > 0),
  title_ar TEXT NOT NULL CHECK (length(trim(title_ar)) > 0),
  content_en TEXT NOT NULL CHECK (length(trim(content_en)) > 0),
  content_ar TEXT NOT NULL CHECK (length(trim(content_ar)) > 0),
  summary_en TEXT NOT NULL CHECK (length(trim(summary_en)) > 0),
  summary_ar TEXT NOT NULL CHECK (length(trim(summary_ar)) > 0),
  author TEXT NOT NULL CHECK (length(trim(author)) > 0),
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT NOT NULL CHECK (length(trim(image_url)) > 0),
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  category TEXT NOT NULL CHECK (length(trim(category)) > 0),
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  view_count INTEGER NOT NULL DEFAULT 0
);

-- Create testimonials
CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL CHECK (length(trim(patient_name)) > 0),
  content TEXT NOT NULL CHECK (length(trim(content)) > 0),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  procedure_type TEXT NOT NULL CHECK (length(trim(procedure_type)) > 0),
  response_content TEXT,
  response_date TIMESTAMP WITH TIME ZONE
);

-- Create faqs
CREATE TABLE faqs (
  id BIGSERIAL PRIMARY KEY,
  question_en TEXT NOT NULL CHECK (length(trim(question_en)) > 0),
  question_ar TEXT NOT NULL CHECK (length(trim(question_ar)) > 0),
  answer_en TEXT NOT NULL CHECK (length(trim(answer_en)) > 0),
  answer_ar TEXT NOT NULL CHECK (length(trim(answer_ar)) > 0),
  category TEXT NOT NULL CHECK (length(trim(category)) > 0),
  icon TEXT NOT NULL DEFAULT 'help-circle'
);

-- Create indexes
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_created ON services(created_at DESC);
CREATE INDEX idx_articles_date ON articles(date DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_testimonials_date ON testimonials(date DESC);
CREATE INDEX idx_testimonials_verified ON testimonials(verified);
CREATE INDEX idx_faqs_category ON faqs(category);

-- Insert initial data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments', 'علاجات الأذن الشاملة', 'ear'),
('Nose & Sinus', 'الأنف والجيوب الأنفية', 'Advanced nasal procedures', 'إجراءات الأنف المتقدمة', 'nose'),
('Throat Care', 'رعاية الحنجرة', 'Throat treatments', 'علاجات الحنجرة', 'throat');

INSERT INTO services (
  category_id,
  name_en,
  name_ar,
  description_en,
  description_ar,
  image_url
)
SELECT
  id as category_id,
  'Hearing Test',
  'فحص السمع',
  'Professional hearing evaluation',
  'تقييم سمع احترافي',
  '/images/services/hearing.jpg'
FROM service_categories
WHERE name_en = 'Ear Care';

INSERT INTO articles (
  title_en, title_ar,
  content_en, content_ar,
  summary_en, summary_ar,
  author, image_url, category, tags
) VALUES (
  'Understanding Hearing Loss',
  'فهم فقدان السمع',
  'Detailed content about hearing loss...',
  'محتوى مفصل عن فقدان السمع...',
  'Learn about the causes and treatments of hearing loss',
  'تعرف على أسباب وعلاجات فقدان السمع',
  'Dr. Ahmed Sultan',
  '/images/articles/hearing-loss.jpg',
  'Patient Education',
  ARRAY['hearing', 'education']
);

INSERT INTO faqs (
  question_en, question_ar,
  answer_en, answer_ar,
  category, icon
) VALUES (
  'What should I expect during my first visit?',
  'ماذا يمكن أن أتوقع خلال زيارتي الأولى؟',
  'During your first visit, we will review your medical history and perform a comprehensive examination.',
  'خلال زيارتك الأولى، سنراجع تاريخك الطبي ونجري فحصاً شاملاً.',
  'Appointments',
  'calendar'
);

INSERT INTO testimonials (
  patient_name,
  content,
  rating,
  verified,
  procedure_type
) VALUES (
  'John Smith',
  'Excellent care and professional service. Highly recommended!',
  5,
  true,
  'Hearing Test'
);
