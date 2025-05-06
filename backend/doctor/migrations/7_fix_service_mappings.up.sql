-- Fix potential issues with service mappings
ALTER TABLE service_category_mapping
DROP CONSTRAINT service_category_mapping_pkey;

ALTER TABLE service_category_mapping
ADD CONSTRAINT service_category_mapping_pkey 
PRIMARY KEY (service_id, category_id);

-- Ensure service_id references are correct
ALTER TABLE service_category_mapping
DROP CONSTRAINT IF EXISTS service_category_mapping_service_id_fkey;

ALTER TABLE service_category_mapping
ADD CONSTRAINT service_category_mapping_service_id_fkey
FOREIGN KEY (service_id) REFERENCES services(id::text);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_details_service_id 
ON service_details(service_id);

CREATE INDEX IF NOT EXISTS idx_service_results_service_id 
ON service_results(service_id);

-- Ensure all required fields are not null
ALTER TABLE services
ALTER COLUMN name_en SET NOT NULL,
ALTER COLUMN name_ar SET NOT NULL,
ALTER COLUMN description_en SET NOT NULL,
ALTER COLUMN description_ar SET NOT NULL,
ALTER COLUMN image_url SET NOT NULL;

ALTER TABLE service_details
ALTER COLUMN service_id SET NOT NULL,
ALTER COLUMN title_en SET NOT NULL,
ALTER COLUMN title_ar SET NOT NULL,
ALTER COLUMN description_en SET NOT NULL,
ALTER COLUMN description_ar SET NOT NULL;
