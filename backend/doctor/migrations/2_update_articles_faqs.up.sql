-- Update articles table with proper constraints
ALTER TABLE articles
  ALTER COLUMN id SET DEFAULT nextval('articles_id_seq'),
  ALTER COLUMN title_en SET NOT NULL,
  ALTER COLUMN title_ar SET NOT NULL,
  ALTER COLUMN content_en SET NOT NULL,
  ALTER COLUMN content_ar SET NOT NULL,
  ALTER COLUMN summary_en SET NOT NULL,
  ALTER COLUMN summary_ar SET NOT NULL,
  ALTER COLUMN author SET NOT NULL,
  ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP,
  ALTER COLUMN image_url SET DEFAULT '/images/articles/default.jpg',
  ALTER COLUMN tags SET DEFAULT ARRAY[]::TEXT[],
  ALTER COLUMN category SET NOT NULL,
  ALTER COLUMN read_time_minutes SET DEFAULT 5,
  ALTER COLUMN view_count SET DEFAULT 0;

-- Add check constraints
ALTER TABLE articles
  ADD CONSTRAINT articles_title_en_check CHECK (length(trim(title_en)) > 0),
  ADD CONSTRAINT articles_title_ar_check CHECK (length(trim(title_ar)) > 0),
  ADD CONSTRAINT articles_content_en_check CHECK (length(trim(content_en)) > 0),
  ADD CONSTRAINT articles_content_ar_check CHECK (length(trim(content_ar)) > 0),
  ADD CONSTRAINT articles_summary_en_check CHECK (length(trim(summary_en)) > 0),
  ADD CONSTRAINT articles_summary_ar_check CHECK (length(trim(summary_ar)) > 0),
  ADD CONSTRAINT articles_author_check CHECK (length(trim(author)) > 0),
  ADD CONSTRAINT articles_category_check CHECK (length(trim(category)) > 0);

-- Update faqs table with proper constraints
ALTER TABLE faqs
  ALTER COLUMN id SET DEFAULT nextval('faqs_id_seq'),
  ALTER COLUMN question_en SET NOT NULL,
  ALTER COLUMN question_ar SET NOT NULL,
  ALTER COLUMN answer_en SET NOT NULL,
  ALTER COLUMN answer_ar SET NOT NULL,
  ALTER COLUMN category SET NOT NULL,
  ALTER COLUMN icon SET DEFAULT 'help-circle';

-- Add check constraints
ALTER TABLE faqs
  ADD CONSTRAINT faqs_question_en_check CHECK (length(trim(question_en)) > 0),
  ADD CONSTRAINT faqs_question_ar_check CHECK (length(trim(question_ar)) > 0),
  ADD CONSTRAINT faqs_answer_en_check CHECK (length(trim(answer_en)) > 0),
  ADD CONSTRAINT faqs_answer_ar_check CHECK (length(trim(answer_ar)) > 0),
  ADD CONSTRAINT faqs_category_check CHECK (length(trim(category)) > 0);
