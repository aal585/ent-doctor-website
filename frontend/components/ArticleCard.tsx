import { Calendar, Clock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import type { Article } from "~backend/doctor/types";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const isFeatured = variant === "featured";

  return (
    <Card className={`overflow-hidden ${isFeatured ? 'lg:flex' : ''}`}>
      <CardHeader className={`p-0 ${isFeatured ? 'lg:w-1/2' : ''}`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className={`w-full object-cover ${isFeatured ? 'h-full' : 'h-48'}`}
        />
      </CardHeader>
      <CardContent className={`p-6 ${isFeatured ? 'lg:w-1/2' : ''}`}>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            {article.viewCount}
          </div>
        </div>

        <h3 className={`font-bold mb-3 ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline">
            {t("articles.readMore")}
          </Button>
          <span className="text-sm text-gray-500">{article.category}</span>
        </div>
      </CardContent>
    </Card>
  );
}
