-- Recreate articles table with simplified schema
DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
    id bigserial PRIMARY KEY,
    title_en text NOT NULL,
    title_ar text NOT NULL,
    content_en text NOT NULL,
    content_ar text NOT NULL,
    summary_en text NOT NULL,
    summary_ar text NOT NULL,
    author text NOT NULL,
    category text NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Recreate faqs table with simplified schema
DROP TABLE IF EXISTS faqs CASCADE;
CREATE TABLE faqs (
    id bigserial PRIMARY KEY,
    question_en text NOT NULL,
    question_ar text NOT NULL,
    answer_en text NOT NULL,
    answer_ar text NOT NULL,
    category text NOT NULL,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_faqs_category ON faqs(category);
