-- Add services table
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Insert ENT service categories
INSERT INTO service_categories (name_en, name_ar, description_en, description_ar, icon) VALUES
('Ear Care', 'رعاية الأذن', 'Comprehensive ear treatments and surgeries', 'علاجات وجراحات الأذن الشاملة', 'ear'),
('Nose & Sinus', 'الأنف والجيوب الأنفية', 'Advanced nasal and sinus procedures', 'إجراءات الأنف والجيوب الأنفية المتقدمة', 'nose'),
('Throat & Voice', 'الحنجرة والصوت', 'Throat conditions and voice disorders treatment', 'علاج حالات الحنجرة واضطرابات الصوت', 'throat'),
('Sleep Medicine', 'طب النوم', 'Sleep disorders and apnea treatment', 'علاج اضطرابات النوم وانقطاع النفس', 'sleep'),
('Pediatric ENT', 'أنف وأذن وحنجرة الأطفال', 'Specialized ENT care for children', 'رعاية متخصصة للأطفال', 'child');

-- Insert services
INSERT INTO services (name_en, name_ar, description_en, description_ar, image_url) VALUES
-- Ear Services
('Hearing Loss Treatment', 'علاج فقدان السمع', 'Advanced diagnosis and treatment of hearing loss using the latest technology', 'تشخيص وعلاج متقدم لفقدان السمع باستخدام أحدث التقنيات', '/images/services/hearing-loss.jpg'),
('Cochlear Implants', 'زراعة القوقعة', 'Surgical implantation of hearing devices for severe hearing loss', 'زراعة أجهزة السمع لحالات فقدان السمع الشديد', '/images/services/cochlear-implant.jpg'),
('Tinnitus Management', 'علاج طنين الأذن', 'Comprehensive treatment for ringing in the ears', 'علاج شامل لطنين الأذن', '/images/services/tinnitus.jpg'),
('Ear Infection Treatment', 'علاج التهابات الأذن', 'Treatment of acute and chronic ear infections', 'علاج التهابات الأذن الحادة والمزمنة', '/images/services/ear-infection.jpg'),

-- Nose & Sinus Services
('Endoscopic Sinus Surgery', 'جراحة الجيوب الأنفية بالمنظار', 'Minimally invasive surgery for chronic sinusitis', 'جراحة الجيوب الأنفية بأقل تدخل جراحي', '/images/services/sinus-surgery.jpg'),
('Septoplasty', 'عملية تقويم الحاجز الأنفي', 'Surgical correction of deviated nasal septum', 'تصحيح جراحي لانحراف الحاجز الأنفي', '/images/services/septoplasty.jpg'),
('Rhinoplasty', 'تجميل الأنف', 'Functional and cosmetic nasal surgery', 'جراحة الأنف الوظيفية والتجميلية', '/images/services/rhinoplasty.jpg'),
('Allergy Treatment', 'علاج الحساسية', 'Diagnosis and treatment of nasal allergies', 'تشخيص وعلاج حساسية الأنف', '/images/services/allergy.jpg'),

-- Throat & Voice Services
('Tonsillectomy', 'استئصال اللوزتين', 'Surgical removal of infected or enlarged tonsils', 'استئصال اللوزتين الملتهبة أو المتضخمة', '/images/services/tonsillectomy.jpg'),
('Voice Disorders Treatment', 'علاج اضطرابات الصوت', 'Treatment of various voice and speech disorders', 'علاج اضطرابات الصوت والكلام المختلفة', '/images/services/voice.jpg'),
('Swallowing Disorders', 'اضطرابات البلع', 'Diagnosis and treatment of swallowing difficulties', 'تشخيص وعلاج صعوبات البلع', '/images/services/swallowing.jpg'),

-- Sleep Medicine Services
('Sleep Apnea Treatment', 'علاج انقطاع النفس أثناء النوم', 'Comprehensive treatment for sleep apnea and snoring', 'علاج شامل لانقطاع النفس أثناء النوم والشخير', '/images/services/sleep-apnea.jpg'),
('CPAP Therapy', 'العلاج بجهاز ضغط الهواء الإيجابي', 'Continuous positive airway pressure therapy', 'العلاج بجهاز ضغط الهواء الإيجابي المستمر', '/images/services/cpap.jpg'),

-- Pediatric Services
('Pediatric Ear Tubes', 'أنابيب الأذن للأطفال', 'Ear tube insertion for children with recurring ear infections', 'تركيب أنابيب الأذن للأطفال المصابين بالتهابات الأذن المتكررة', '/images/services/ear-tubes.jpg'),
('Pediatric Sleep Studies', 'دراسات النوم للأطفال', 'Sleep studies and treatment for children', 'دراسات وعلاج النوم للأطفال', '/images/services/pediatric-sleep.jpg'),
('Pediatric Airway Management', 'علاج مجرى الهواء للأطفال', 'Management of pediatric airway disorders', 'علاج اضطرابات مجرى الهواء عند الأطفال', '/images/services/pediatric-airway.jpg');

-- Map services to categories
INSERT INTO service_category_mapping (service_id, category_id)
SELECT s.id::text, c.id
FROM services s
CROSS JOIN service_categories c
WHERE 
  (s.name_en LIKE 'Hearing%' AND c.name_en = 'Ear Care') OR
  (s.name_en LIKE 'Cochlear%' AND c.name_en = 'Ear Care') OR
  (s.name_en LIKE 'Tinnitus%' AND c.name_en = 'Ear Care') OR
  (s.name_en LIKE 'Ear Infection%' AND c.name_en = 'Ear Care') OR
  (s.name_en LIKE 'Endoscopic%' AND c.name_en = 'Nose & Sinus') OR
  (s.name_en LIKE 'Septoplasty%' AND c.name_en = 'Nose & Sinus') OR
  (s.name_en LIKE 'Rhinoplasty%' AND c.name_en = 'Nose & Sinus') OR
  (s.name_en LIKE 'Allergy%' AND c.name_en = 'Nose & Sinus') OR
  (s.name_en LIKE 'Tonsillectomy%' AND c.name_en = 'Throat & Voice') OR
  (s.name_en LIKE 'Voice%' AND c.name_en = 'Throat & Voice') OR
  (s.name_en LIKE 'Swallowing%' AND c.name_en = 'Throat & Voice') OR
  (s.name_en LIKE 'Sleep Apnea%' AND c.name_en = 'Sleep Medicine') OR
  (s.name_en LIKE 'CPAP%' AND c.name_en = 'Sleep Medicine') OR
  (s.name_en LIKE 'Pediatric%' AND c.name_en = 'Pediatric ENT');

-- Add service details for each service
INSERT INTO service_details (
  service_id,
  title_en, title_ar,
  description_en, description_ar,
  benefits_en, benefits_ar,
  procedure_steps_en, procedure_steps_ar,
  recovery_time_en, recovery_time_ar,
  preparation_en, preparation_ar,
  risks_en, risks_ar,
  image_urls,
  price_range
)
SELECT 
  s.id::text,
  s.name_en, s.name_ar,
  s.description_en, s.description_ar,
  ARRAY['Improved quality of life', 'Long-lasting results', 'Minimal recovery time'],
  ARRAY['تحسين جودة الحياة', 'نتائج طويلة المدى', 'وقت تعافي قصير'],
  ARRAY['Initial consultation', 'Diagnostic tests', 'Treatment plan', 'Procedure', 'Follow-up care'],
  ARRAY['استشارة أولية', 'فحوصات تشخيصية', 'خطة العلاج', 'الإجراء', 'متابعة الرعاية'],
  '1-2 weeks', '1-2 أسابيع',
  ARRAY['Complete medical history', 'Pre-procedure tests', 'Fasting if required'],
  ARRAY['التاريخ الطبي الكامل', 'فحوصات ما قبل الإجراء', 'الصيام إذا لزم الأمر'],
  ARRAY['Infection', 'Bleeding', 'Temporary discomfort'],
  ARRAY['العدوى', 'النزيف', 'عدم الراحة المؤقت'],
  ARRAY[s.image_url],
  'AED 2,000 - 5,000'
FROM services s;

-- Add sample results for some procedures
INSERT INTO service_results (
  service_id,
  before_image_url,
  after_image_url,
  description_en,
  description_ar,
  procedure_date
)
SELECT 
  s.id::text,
  '/images/results/before-1.jpg',
  '/images/results/after-1.jpg',
  'Significant improvement after procedure',
  'تحسن كبير بعد الإجراء',
  NOW() - INTERVAL '3 months'
FROM services s
WHERE s.name_en IN ('Rhinoplasty', 'Septoplasty', 'Endoscopic Sinus Surgery');
