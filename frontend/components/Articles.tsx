import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import backend from "~backend/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../hooks/useLanguage";
import type { Article } from "~backend/doctor/types";

export function Articles() {
  const { language } = useLanguage();
  const { data, isLoading } = useQuery({
    queryKey: ["articles", language],
    queryFn: () => backend.doctor.getArticles({ lang: language })
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="articles" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
          <p className="text-lg text-gray-600">
            Expert insights and medical advice from Dr. Sultan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.articles.map((article: Article) => (
            <Card key={article.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(article.date).toLocaleDateString(
                    language === "ar" ? "ar-AE" : "en-US"
                  )}
                </div>
                <CardTitle className="mb-3">{article.title}</CardTitle>
                <p className="text-gray-600 mb-4">{article.summary}</p>
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
                <Button variant="outline" className="w-full">Read More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
