import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Clock, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

interface ServiceDetailProps {
  serviceId: string;
}

export function ServiceDetail({ serviceId }: ServiceDetailProps) {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const { data: service, isLoading } = useQuery({
    queryKey: ["service-detail", serviceId, language],
    queryFn: () => backend.doctor.getServiceDetail({ serviceId, lang: language })
  });

  if (isLoading || !service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">{service.title}</h1>
          <p className="text-gray-600 mb-8">{service.description}</p>

          {/* Video Section */}
          {service.videoUrl && (
            <div className="mb-8">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer">
                    <img
                      src={service.imageUrls[0]}
                      alt={service.title}
                      className="w-full rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <video controls className="w-full" src={service.videoUrl} />
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Benefits */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t("service.benefits")}</CardTitle>
              <CardDescription>{t("service.benefits.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 mr-2" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Procedure Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t("service.procedure")}</CardTitle>
              <CardDescription>{t("service.procedure.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {service.procedureSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Before/After Results */}
          {service.results.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t("service.results")}</CardTitle>
                <CardDescription>{t("service.results.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.results.map((result) => (
                    <div key={result.id} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-2">{t("service.before")}</p>
                          <img
                            src={result.beforeImageUrl}
                            alt="Before"
                            className="rounded-lg"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-2">{t("service.after")}</p>
                          <img
                            src={result.afterImageUrl}
                            alt="After"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Range */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg font-semibold mb-2">{t("service.price")}</p>
              <p className="text-2xl text-primary font-bold">{service.priceRange}</p>
              <Button className="w-full mt-4">
                {t("service.book")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Recovery Time */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-primary mr-2" />
                <p className="font-semibold">{t("service.recovery")}</p>
              </div>
              <p className="text-gray-600">{service.recoveryTime}</p>
            </CardContent>
          </Card>

          {/* Preparation */}
          <Accordion type="single" collapsible className="bg-white rounded-lg border">
            <AccordionItem value="preparation">
              <AccordionTrigger className="px-6">
                {t("service.preparation")}
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <ul className="space-y-2">
                  {service.preparation.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 mr-2" />
                      <span className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Risks */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                <p className="font-semibold">{t("service.risks")}</p>
              </div>
              <ul className="space-y-2">
                {service.risks.map((risk, index) => (
                  <li key={index} className="text-gray-600">{risk}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
