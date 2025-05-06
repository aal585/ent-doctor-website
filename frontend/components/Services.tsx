import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import type { Service } from "~backend/doctor/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function Services() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["services", language],
    queryFn: () => backend.doctor.listServices({ lang: language }),
    onError: (error) => {
      console.error("Failed to fetch services:", error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    }
  });

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {t("services.error")}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          {t("common.retry")}
        </Button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.services.map((service: Service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{service.name}</CardTitle>
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{service.priceRange}</span>
                  <Button variant="outline">
                    {t("services.learnMore")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
