import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "~backend/doctor/types";

export function Articles() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const { data, isLoading } = useQuery({
    queryKey: ["articles", language],
    queryFn: () => backend.doctor.getArticles({ lang: language })
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Get the latest article for the featured section
  const featuredArticle = data?.articles[0];
  const remainingArticles = data?.articles.slice(1);

  return (
    <section id="articles" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("articles.title")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("articles.subtitle")}
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <ArticleCard article={featuredArticle} variant="featured" />
          </div>
        )}

        {/* Article Categories and List */}
        <Tabs defaultValue="recent" className="space-y-8">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="recent">{t("articles.recent")}</TabsTrigger>
              <TabsTrigger value="popular">{t("articles.popular")}</TabsTrigger>
            </TabsList>
            <Button variant="outline">
              {t("articles.viewAll")}
            </Button>
          </div>

          <TabsContent value="recent" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingArticles?.map((article: Article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingArticles?.sort((a, b) => b.viewCount - a.viewCount)
                .map((article: Article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Article Categories */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6">{t("articles.categories")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Patient Education", "Medical Advances", "Health Tips", "Case Studies"].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="justify-start h-auto py-4 px-6"
              >
                <div>
                  <p className="font-semibold">{category}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {data?.articles.filter(a => a.category === category).length} articles
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
