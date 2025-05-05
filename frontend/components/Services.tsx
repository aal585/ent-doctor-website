import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import type { Service, ServiceCategory } from "~backend/doctor/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ServiceDetail } from "./ServiceDetail";

export function Services() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const { data: categories } = useQuery({
    queryKey: ["service-categories", language],
    queryFn: () => backend.doctor.listServiceCategories({ lang: language })
  });

  const { data: services } = useQuery({
    queryKey: ["services", selectedCategory, language],
    queryFn: () => backend.doctor.listServices({
      categoryId: selectedCategory,
      lang: language
    })
  });

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === undefined ? "default" : "outline"}
            onClick={() => setSelectedCategory(undefined)}
          >
            {t("services.all")}
          </Button>
          {categories?.categories.map((category: ServiceCategory) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.services.map((service: Service) => (
            <Dialog key={service.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                    <Button className="mt-4" variant="outline">
                      {t("services.learnMore")}
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-6xl">
                <ServiceDetail serviceId={service.id} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
