-- Create basic testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL,
  procedure_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add test data
INSERT INTO testimonials (patient_name, content, rating, procedure_type) VALUES 
('John Smith', 'Excellent service', 5, 'General Consultation');
