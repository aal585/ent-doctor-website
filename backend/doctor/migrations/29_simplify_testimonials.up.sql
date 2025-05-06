-- Drop and recreate testimonials table with minimal schema
DROP TABLE IF EXISTS testimonials CASCADE;

CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  procedure_type TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert test data
INSERT INTO testimonials (patient_name, content, rating, procedure_type, verified) VALUES 
('John Smith', 'Great experience with Dr. Sultan', 5, 'Hearing Test', true),
('Sarah Johnson', 'Very professional service', 5, 'Sinus Surgery', true);
