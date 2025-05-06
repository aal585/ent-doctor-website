-- Drop and recreate testimonials table with correct structure
DROP TABLE IF EXISTS testimonials CASCADE;

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

-- Insert sample testimonials
INSERT INTO testimonials (
  patient_name,
  content,
  rating,
  verified,
  procedure_type
) VALUES 
(
  'Sarah Johnson',
  'Dr. Sultan is an excellent doctor. Very thorough and professional. The hearing test was comprehensive and he explained everything clearly.',
  5,
  true,
  'Hearing Test'
),
(
  'Mohammed Ali',
  'Great experience with sinus surgery. Recovery was quick and breathing is much better now.',
  5,
  true,
  'Sinus Surgery'
),
(
  'Emily Brown',
  'Very patient and knowledgeable doctor. Helped resolve my chronic ear infection.',
  4,
  true,
  'Ear Treatment'
);
