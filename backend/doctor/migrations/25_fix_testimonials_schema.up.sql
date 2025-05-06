-- Drop and recreate testimonials table with explicit column definitions
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

-- Create indexes for better performance
CREATE INDEX idx_testimonials_date ON testimonials(date DESC);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);

-- Insert sample testimonials
INSERT INTO testimonials (
  patient_name,
  content,
  rating,
  verified,
  procedure_type,
  date
) VALUES 
(
  'Sarah Johnson',
  'Dr. Sultan is an excellent doctor. Very thorough and professional. The hearing test was comprehensive and he explained everything clearly.',
  5,
  true,
  'Hearing Test',
  CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
  'Mohammed Ali',
  'Great experience with sinus surgery. Recovery was quick and breathing is much better now.',
  5,
  true,
  'Sinus Surgery',
  CURRENT_TIMESTAMP - INTERVAL '5 days'
),
(
  'Emily Brown',
  'Very patient and knowledgeable doctor. Helped resolve my chronic ear infection.',
  4,
  true,
  'Ear Treatment',
  CURRENT_TIMESTAMP - INTERVAL '7 days'
);

-- Add a doctor response to one testimonial
UPDATE testimonials 
SET 
  response_content = 'Thank you for your kind words. I''m glad we could help improve your breathing.',
  response_date = CURRENT_TIMESTAMP - INTERVAL '4 days'
WHERE procedure_type = 'Sinus Surgery';
