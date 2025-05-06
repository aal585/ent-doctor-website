-- Add constraints to service_categories
ALTER TABLE service_categories
  ADD CONSTRAINT service_categories_name_en_check CHECK (length(trim(name_en)) > 0),
  ADD CONSTRAINT service_categories_name_ar_check CHECK (length(trim(name_ar)) > 0),
  ADD CONSTRAINT service_categories_description_en_check CHECK (length(trim(description_en)) > 0),
  ADD CONSTRAINT service_categories_description_ar_check CHECK (length(trim(description_ar)) > 0);

-- Add constraints to services
ALTER TABLE services
  ADD CONSTRAINT services_name_en_check CHECK (length(trim(name_en)) > 0),
  ADD CONSTRAINT services_name_ar_check CHECK (length(trim(name_ar)) > 0),
  ADD CONSTRAINT services_description_en_check CHECK (length(trim(description_en)) > 0),
  ADD CONSTRAINT services_description_ar_check CHECK (length(trim(description_ar)) > 0),
  ADD CONSTRAINT services_image_url_check CHECK (length(trim(image_url)) > 0);
