CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  procedure_type TEXT,
  response_content TEXT,
  response_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  summary_ar TEXT NOT NULL,
  author TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  image_url TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  category TEXT NOT NULL
);

CREATE TABLE faqs (
  id BIGSERIAL PRIMARY KEY,
  question_en TEXT NOT NULL,
  question_ar TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL,
  category TEXT NOT NULL
);
