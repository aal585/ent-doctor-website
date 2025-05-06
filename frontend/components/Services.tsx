import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SimpleService {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export function Services() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const { data, isLoading } = useQuery({
    queryKey: ["services", language],
    queryFn: () => backend.doctor.listServices({ lang: language })
  });

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.services.map((service: SimpleService) => (
            <Card key={service.id}>
              <CardHeader className="p-0">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
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
