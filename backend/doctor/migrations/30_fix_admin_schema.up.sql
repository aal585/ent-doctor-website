-- Drop and recreate articles table with proper constraints
DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  title_en TEXT NOT NULL CHECK (length(trim(title_en)) > 0),
  title_ar TEXT NOT NULL CHECK (length(trim(title_ar)) > 0),
  content_en TEXT NOT NULL CHECK (length(trim(content_en)) > 0),
  content_ar TEXT NOT NULL CHECK (length(trim(content_ar)) > 0),
  summary_en TEXT NOT NULL CHECK (length(trim(summary_en)) > 0),
  summary_ar TEXT NOT NULL CHECK (length(trim(summary_ar)) > 0),
  author TEXT NOT NULL CHECK (length(trim(author)) > 0),
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  category TEXT NOT NULL CHECK (length(trim(category)) > 0),
  read_time_minutes INTEGER NOT NULL DEFAULT 5 CHECK (read_time_minutes > 0),
  view_count INTEGER NOT NULL DEFAULT 0 CHECK (view_count >= 0)
);

-- Drop and recreate faqs table with proper constraints
DROP TABLE IF EXISTS faqs CASCADE;

CREATE TABLE faqs (
  id BIGSERIAL PRIMARY KEY,
  question_en TEXT NOT NULL CHECK (length(trim(question_en)) > 0),
  question_ar TEXT NOT NULL CHECK (length(trim(question_ar)) > 0),
  answer_en TEXT NOT NULL CHECK (length(trim(answer_en)) > 0),
  answer_ar TEXT NOT NULL CHECK (length(trim(answer_ar)) > 0),
  category TEXT NOT NULL CHECK (length(trim(category)) > 0),
  icon TEXT NOT NULL DEFAULT 'help-circle'
);

-- Create indexes
CREATE INDEX idx_articles_date ON articles(date DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_faqs_category ON faqs(category);
