import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";

export function Services() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  // First test the database connection
  const { data: helloData, isLoading: isLoadingHello, error: helloError } = useQuery({
    queryKey: ["hello"],
    queryFn: () => backend.doctor.hello()
  });

  // Only fetch services and categories if hello endpoint works
  const { data: servicesData, isLoading: isLoadingServices, error: servicesError } = useQuery({
    queryKey: ["services", language],
    queryFn: () => backend.doctor.getServices({ lang: language }),
    enabled: !helloError
  });

  const { data: categoriesData, isLoading: isLoadingCategories, error: categoriesError } = useQuery({
    queryKey: ["service-categories", language],
    queryFn: () => backend.doctor.getServiceCategories({ lang: language }),
    enabled: !helloError
  });

  if (isLoadingHello || isLoadingServices || isLoadingCategories) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (helloError) {
    console.error("Database connection error:", helloError);
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Service temporarily unavailable. Please try again later.</p>
      </div>
    );
  }

  if (servicesError || categoriesError) {
    console.error("Services error:", servicesError);
    console.error("Categories error:", categoriesError);
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load services. Please try again later.</p>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categoriesData?.categories.map((category) => (
            <Card key={category.id} className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <img
                    src={`/icons/${category.icon}.svg`}
                    alt={category.name}
                    className="w-8 h-8"
                  />
                </div>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData?.services.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.category && (
                  <div className="flex items-center text-sm text-primary mb-4">
                    <img
                      src={`/icons/${service.category.icon}.svg`}
                      alt={service.category.name}
                      className="w-4 h-4 mr-2"
                    />
                    <span>{service.category.name}</span>
                  </div>
                )}
                <Button variant="outline" className="w-full">
                  {t("services.learnMore")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
