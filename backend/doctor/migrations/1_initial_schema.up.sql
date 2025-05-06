-- Create basic articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title_en text NOT NULL,
  title_ar text NOT NULL,
  content_en text NOT NULL,
  content_ar text NOT NULL,
  summary_en text NOT NULL,
  summary_ar text NOT NULL,
  author text NOT NULL,
  category text NOT NULL
);

-- Create basic faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question_en text NOT NULL,
  question_ar text NOT NULL,
  answer_en text NOT NULL,
  answer_ar text NOT NULL,
  category text NOT NULL
);
