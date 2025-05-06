-- Start fresh
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- Create basic tables
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'stethoscope'
);

CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category_id BIGINT REFERENCES service_categories(id)
);

-- Insert test data
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Ear treatments', 'علاجات الأذن', 'ear'),
('Nose Care', 'رعاية الأنف', 'Nose treatments', 'علاجات الأنف', 'nose'),
('Throat Care', 'رعاية الحنجرة', 'Throat treatments', 'علاجات الحنجرة', 'throat');

INSERT INTO services (name_en, name_ar, description_en, description_ar, image_url, category_id)
VALUES 
('Hearing Test', 'فحص السمع', 'Complete hearing evaluation', 'تقييم السمع الشامل', '/images/services/hearing.jpg', 1),
('Sinus Treatment', 'علاج الجيوب الأنفية', 'Sinus infection treatment', 'علاج التهاب الجيوب الأنفية', '/images/services/sinus.jpg', 2);
