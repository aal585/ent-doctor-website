-- Create certificates table
CREATE TABLE certificates (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  year INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  description_en TEXT NOT NULL DEFAULT '',
  description_ar TEXT NOT NULL DEFAULT '',
  issuing_date DATE NOT NULL DEFAULT NOW(),
  expiry_date DATE,
  certificate_url TEXT,
  specialization TEXT NOT NULL DEFAULT ''
);

-- Create procedures table
CREATE TABLE procedures (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  media_urls TEXT[] NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  success_rate INTEGER,
  duration_minutes INTEGER,
  patient_age INTEGER,
  patient_gender TEXT,
  follow_up_period TEXT,
  technology_used_en TEXT[] NOT NULL DEFAULT '{}',
  technology_used_ar TEXT[] NOT NULL DEFAULT '{}'
);

-- Add procedure categories
CREATE TABLE procedure_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL
);

-- Add category reference to procedures
ALTER TABLE procedures 
ADD COLUMN category_id BIGINT REFERENCES procedure_categories(id);

-- Insert procedure categories
INSERT INTO procedure_categories (name_en, name_ar, description_en, description_ar) VALUES
('Advanced Ear Surgery', 'جراحة الأذن المتقدمة', 'Complex ear procedures using microsurgery', 'عمليات الأذن المعقدة باستخدام الجراحة المجهرية'),
('Endoscopic Sinus Surgery', 'جراحة الجيوب الأنفية بالمنظار', 'Minimally invasive sinus procedures', 'عمليات الجيوب الأنفية بأقل تدخل جراحي'),
('Pediatric Procedures', 'عمليات الأطفال', 'Specialized procedures for children', 'عمليات متخصصة للأطفال'),
('Voice & Throat Surgery', 'جراحة الصوت والحنجرة', 'Advanced vocal cord and throat procedures', 'عمليات متقدمة للحبال الصوتية والحنجرة');

-- Insert sample certificates
INSERT INTO certificates (
  title,
  institution,
  year,
  image_url,
  description_en,
  description_ar,
  issuing_date,
  specialization
) VALUES
('Fellowship in Advanced Endoscopic Sinus Surgery', 'Johns Hopkins Hospital', 2010, '/images/certificates/hopkins.jpg',
 'Advanced training in minimally invasive sinus procedures and complex cases',
 'تدريب متقدم في إجراءات الجيوب الأنفية والحالات المعقدة',
 '2010-06-15',
 'Endoscopic Surgery'),
('Advanced Training in Pediatric ENT', 'Great Ormond Street Hospital', 2012, '/images/certificates/gosh.jpg',
 'Specialized training in pediatric ENT procedures and care',
 'تدريب متخصص في إجراءات وعلاج أنف وأذن وحنجرة الأطفال',
 '2012-03-20',
 'Pediatric ENT');

-- Insert sample procedures
INSERT INTO procedures (
  title,
  description,
  date,
  media_urls,
  type,
  success_rate,
  duration_minutes,
  category_id,
  patient_age,
  follow_up_period,
  technology_used_en,
  technology_used_ar
) VALUES
('Endoscopic Sinus Surgery', 'Complex case of chronic sinusitis with polyps',
 NOW() - INTERVAL '3 months',
 ARRAY['/images/procedures/sinus1.jpg', '/images/procedures/sinus2.jpg'],
 'image',
 95,
 120,
 (SELECT id FROM procedure_categories WHERE name_en = 'Endoscopic Sinus Surgery'),
 45,
 '2 weeks',
 ARRAY['4K Endoscopic System', 'Navigation System'],
 ARRAY['نظام المنظار 4K', 'نظام الملاحة']
),
('Cochlear Implant Procedure', 'Successful cochlear implant in a 5-year-old patient',
 NOW() - INTERVAL '1 month',
 ARRAY['/videos/procedures/cochlear.mp4'],
 'video',
 98,
 180,
 (SELECT id FROM procedure_categories WHERE name_en = 'Advanced Ear Surgery'),
 5,
 '1 month',
 ARRAY['Advanced Cochlear Implant', 'Neural Monitoring'],
 ARRAY['زراعة قوقعة متقدمة', 'مراقبة عصبية']
);
