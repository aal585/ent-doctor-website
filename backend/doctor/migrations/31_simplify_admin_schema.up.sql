-- Simplify articles table
DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  summary_ar TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  category TEXT NOT NULL,
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  view_count INTEGER NOT NULL DEFAULT 0,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Simplify faqs table
DROP TABLE IF EXISTS faqs CASCADE;
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

-- Insert test data
INSERT INTO articles (
  title_en, title_ar,
  content_en, content_ar,
  summary_en, summary_ar,
  author, image_url, category
) VALUES (
  'Test Article', 'مقال تجريبي',
  'Test content', 'محتوى تجريبي',
  'Test summary', 'ملخص تجريبي',
  'Test Author',
  '/images/articles/default.jpg',
  'Test Category'
);

INSERT INTO faqs (
  question_en, question_ar,
  answer_en, answer_ar,
  category
) VALUES (
  'Test Question?', 'سؤال تجريبي؟',
  'Test answer', 'إجابة تجريبية',
  'Test Category'
);
