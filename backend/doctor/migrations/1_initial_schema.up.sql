-- Create articles table
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  summary_ar TEXT NOT NULL,
  author TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image_url TEXT NOT NULL DEFAULT '/images/articles/default.jpg',
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  category TEXT NOT NULL,
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  view_count INTEGER NOT NULL DEFAULT 0
);

-- Create faqs table
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question_en TEXT NOT NULL,
  question_ar TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'help-circle'
);

-- Create indexes
CREATE INDEX idx_articles_date ON articles(date DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_faqs_category ON faqs(category);
