-- Add detailed service information table
CREATE TABLE service_details (
  id BIGSERIAL PRIMARY KEY,
  service_id TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  benefits_en TEXT[] NOT NULL,
  benefits_ar TEXT[] NOT NULL,
  procedure_steps_en TEXT[] NOT NULL,
  procedure_steps_ar TEXT[] NOT NULL,
  recovery_time_en TEXT NOT NULL,
  recovery_time_ar TEXT NOT NULL,
  preparation_en TEXT[] NOT NULL,
  preparation_ar TEXT[] NOT NULL,
  risks_en TEXT[] NOT NULL,
  risks_ar TEXT[] NOT NULL,
  image_urls TEXT[] NOT NULL,
  video_url TEXT,
  price_range TEXT NOT NULL
);

-- Add before/after images table
CREATE TABLE service_results (
  id BIGSERIAL PRIMARY KEY,
  service_id TEXT NOT NULL,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  procedure_date DATE NOT NULL
);

-- Add service categories
CREATE TABLE service_categories (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Add service to category mapping
CREATE TABLE service_category_mapping (
  service_id TEXT NOT NULL,
  category_id BIGINT NOT NULL REFERENCES service_categories(id),
  PRIMARY KEY (service_id, category_id)
);
