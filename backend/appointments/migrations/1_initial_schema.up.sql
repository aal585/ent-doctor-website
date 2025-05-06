-- Drop existing table if it exists
DROP TABLE IF EXISTS appointments CASCADE;

-- Create appointments table with proper constraints
CREATE TABLE appointments (
  id BIGSERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL CHECK (length(trim(patient_name)) > 0),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT NOT NULL CHECK (length(trim(phone)) > 0),
  preferred_date TIMESTAMP WITH TIME ZONE NOT NULL CHECK (preferred_date > CURRENT_TIMESTAMP),
  alternate_date TIMESTAMP WITH TIME ZONE NOT NULL CHECK (alternate_date > CURRENT_TIMESTAMP),
  reason TEXT NOT NULL CHECK (length(trim(reason)) > 0),
  is_new_patient BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_appointments_email ON appointments(email);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_dates ON appointments(preferred_date, alternate_date);
CREATE INDEX idx_appointments_created_at ON appointments(created_at DESC);

-- Add comment to explain the table purpose
COMMENT ON TABLE appointments IS 'Stores patient appointment requests and their status';
