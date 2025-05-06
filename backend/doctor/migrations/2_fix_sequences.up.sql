-- Drop existing sequences if they exist
DROP SEQUENCE IF EXISTS articles_id_seq;
DROP SEQUENCE IF EXISTS faqs_id_seq;

-- Create new sequences
CREATE SEQUENCE articles_id_seq START 1;
CREATE SEQUENCE faqs_id_seq START 1;

-- Modify articles table
ALTER TABLE articles 
  ALTER COLUMN id SET DEFAULT nextval('articles_id_seq'),
  ALTER COLUMN id SET NOT NULL;

-- Modify faqs table
ALTER TABLE faqs 
  ALTER COLUMN id SET DEFAULT nextval('faqs_id_seq'),
  ALTER COLUMN id SET NOT NULL;

-- Update sequence ownership
ALTER SEQUENCE articles_id_seq OWNED BY articles.id;
ALTER SEQUENCE faqs_id_seq OWNED BY faqs.id;

-- Set sequence values to max existing id + 1
SELECT setval('articles_id_seq', COALESCE((SELECT MAX(id) FROM articles), 0) + 1, false);
SELECT setval('faqs_id_seq', COALESCE((SELECT MAX(id) FROM faqs), 0) + 1, false);
