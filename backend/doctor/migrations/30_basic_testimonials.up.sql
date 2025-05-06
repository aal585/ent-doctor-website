-- Create a very basic testimonials table
DROP TABLE IF EXISTS testimonials CASCADE;

CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL,
  procedure_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add one test record
INSERT INTO testimonials (patient_name, content, rating, procedure_type) 
VALUES ('Test User', 'Test testimonial', 5, 'General Consultation');
