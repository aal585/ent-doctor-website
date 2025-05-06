-- Create basic articles table
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_ar TEXT NOT NULL,
    summary_en TEXT NOT NULL,
    summary_ar TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL
);

-- Create basic faqs table
CREATE TABLE IF NOT EXISTS faqs (
    id SERIAL PRIMARY KEY,
    question_en TEXT NOT NULL,
    question_ar TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    answer_ar TEXT NOT NULL,
    category TEXT NOT NULL
);
