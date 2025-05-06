-- Drop and recreate testimonials table with correct schema
DROP TABLE IF EXISTS testimonials CASCADE;

CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  procedure_type TEXT NOT NULL,
  response_content TEXT,
  response_date TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX idx_testimonials_date ON testimonials(date DESC);
CREATE INDEX idx_testimonials_verified ON testimonials(verified);

-- Insert sample data
INSERT INTO testimonials (
  patient_name,
  content,
  rating,
  procedure_type,
  verified,
  date
) VALUES 
(
  'John Smith',
  'Excellent service and very professional care.',
  5,
  'Hearing Test',
  true,
  CURRENT_TIMESTAMP - INTERVAL '7 days'
),
(
  'Sarah Johnson',
  'Great experience, would highly recommend.',
  5,
  'Sinus Surgery',
  true,
  CURRENT_TIMESTAMP - INTERVAL '14 days'
),
(
  'Ahmed Ali',
  'Very thorough examination and clear explanation.',
  4,
  'General Consultation',
  true,
  CURRENT_TIMESTAMP - INTERVAL '21 days'
);
