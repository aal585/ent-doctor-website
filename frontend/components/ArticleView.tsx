import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { Article } from "~backend/doctor/types";

interface ArticleViewProps {
  articleId: string;
  onBack: () => void;
}

export function ArticleView({ articleId, onBack }: ArticleViewProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", articleId, language],
    queryFn: () => backend.doctor.getArticle({ id: articleId, lang: language })
  });

  if (isLoading || !article) {
    return <div>Loading...</div>;
  }

  const shareArticle = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button and share */}
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("articles.backToList")}
        </Button>
        <Button variant="ghost" onClick={shareArticle}>
          <Share2 className="w-4 h-4 mr-2" />
          {t("articles.share")}
        </Button>
      </div>

      {/* Article header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(article.date).toLocaleDateString(
              language === "ar" ? "ar-AE" : "en-US"
            )}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {article.readTimeMinutes} {t("articles.readTime")}
          </div>
          <span>|</span>
          <span>{article.author}</span>
        </div>
      </div>

      {/* Featured image */}
      <div className="mb-8">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* Article content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Tags */}
      <div className="mt-8 pt-8 border-t">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related articles */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t("articles.related")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder for related articles */}
          {[1, 2].map((i) => (
            <Card key={i} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img
                  src="/images/placeholder.jpg"
                  alt="Related article"
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">Related Article Title</CardTitle>
                <CardDescription>
                  Brief description of the related article...
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
