import { Button } from "@/components/ui/button";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import { Calendar, Phone, Star, Users } from "lucide-react";

export function Hero() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const stats = [
    { icon: Calendar, value: "15+", label: t("hero.experience") },
    { icon: Users, value: "10,000+", label: t("hero.patients") },
    { icon: Star, value: "4.9", label: t("hero.rating") },
    { icon: Phone, value: "24/7", label: t("hero.support") }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent pt-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5">
              <span className="text-sm font-medium text-primary">
                {t("hero.trusted")}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              {t("hero.title")}
              <span className="block text-primary mt-2">
                {t("hero.specialist")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                {t("hero.book")}
              </Button>
              <Button size="lg" variant="outline">
                {t("hero.learn")}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <stat.icon className="w-8 h-8 text-primary mb-3" />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/doctor-hero.jpg"
                alt="Dr. Ahmed Sultan"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 animate-float">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                  <p className="text-sm text-gray-600">{t("hero.rating")}</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-xl p-6 animate-float-delay">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10,000+</p>
                  <p className="text-sm text-gray-600">{t("hero.patients")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
