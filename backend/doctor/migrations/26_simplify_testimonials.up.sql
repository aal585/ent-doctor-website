-- Drop and recreate testimonials table with simplified schema
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

-- Insert sample data
INSERT INTO testimonials (
  patient_name,
  content,
  rating,
  procedure_type,
  verified
) VALUES 
('John Smith', 'Excellent service and very professional care.', 5, 'Hearing Test', true),
('Sarah Johnson', 'Great experience, would highly recommend.', 5, 'Sinus Surgery', true),
('Ahmed Ali', 'Very thorough examination and clear explanation.', 4, 'General Consultation', true);
