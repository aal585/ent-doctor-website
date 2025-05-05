-- Add article categories
CREATE TABLE article_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL
);

-- Add article reading time and views
ALTER TABLE articles
ADD COLUMN read_time_minutes INTEGER NOT NULL DEFAULT 5,
ADD COLUMN view_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN category_id BIGINT REFERENCES article_categories(id);

-- Add FAQ categories with icons
ALTER TABLE faqs
ADD COLUMN icon TEXT NOT NULL DEFAULT 'help-circle';

-- Insert article categories
INSERT INTO article_categories (name_en, name_ar, description_en, description_ar) VALUES
('Patient Education', 'تثقيف المرضى', 'Educational articles about ENT conditions', 'مقالات تثقيفية حول حالات الأنف والأذن والحنجرة'),
('Medical Advances', 'التقدم الطبي', 'Latest developments in ENT treatments', 'أحدث التطورات في علاجات الأنف والأذن والحنجرة'),
('Health Tips', 'نصائح صحية', 'Preventive care and wellness advice', 'نصائح للرعاية الوقائية والصحة'),
('Case Studies', 'دراسات حالة', 'Real patient success stories', 'قصص نجاح المرضى الحقيقية');

-- Update FAQ categories and icons
UPDATE faqs SET icon = CASE
  WHEN category = 'Appointments' THEN 'calendar'
  WHEN category = 'Procedures' THEN 'stethoscope'
  WHEN category = 'Insurance' THEN 'credit-card'
  WHEN category = 'Recovery' THEN 'heart-pulse'
  WHEN category = 'General' THEN 'help-circle'
  ELSE 'help-circle'
END;
