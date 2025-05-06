-- Add check constraints to articles
ALTER TABLE articles
  ADD CONSTRAINT articles_title_en_check CHECK (length(trim(title_en)) > 0),
  ADD CONSTRAINT articles_title_ar_check CHECK (length(trim(title_ar)) > 0),
  ADD CONSTRAINT articles_content_en_check CHECK (length(trim(content_en)) > 0),
  ADD CONSTRAINT articles_content_ar_check CHECK (length(trim(content_ar)) > 0),
  ADD CONSTRAINT articles_summary_en_check CHECK (length(trim(summary_en)) > 0),
  ADD CONSTRAINT articles_summary_ar_check CHECK (length(trim(summary_ar)) > 0),
  ADD CONSTRAINT articles_author_check CHECK (length(trim(author)) > 0),
  ADD CONSTRAINT articles_category_check CHECK (length(trim(category)) > 0);

-- Add check constraints to faqs
ALTER TABLE faqs
  ADD CONSTRAINT faqs_question_en_check CHECK (length(trim(question_en)) > 0),
  ADD CONSTRAINT faqs_question_ar_check CHECK (length(trim(question_ar)) > 0),
  ADD CONSTRAINT faqs_answer_en_check CHECK (length(trim(answer_en)) > 0),
  ADD CONSTRAINT faqs_answer_ar_check CHECK (length(trim(answer_ar)) > 0),
  ADD CONSTRAINT faqs_category_check CHECK (length(trim(category)) > 0);
