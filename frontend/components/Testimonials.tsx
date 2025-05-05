import { useQuery } from "@tanstack/react-query";
import { Star, CheckCircle } from "lucide-react";
import backend from "~backend/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import type { Testimonial } from "~backend/doctor/types";

export function Testimonials() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const { data, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => backend.doctor.getTestimonials()
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.testimonials.map((testimonial: Testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <div className="flex items-center text-primary">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">{t("testimonials.verified")}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-4">{testimonial.content}</p>

                {testimonial.procedureType && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">
                      {t("testimonials.procedure")}: {testimonial.procedureType}
                    </span>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <p className="font-semibold">{testimonial.patientName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString(
                      language === "ar" ? "ar-AE" : "en-US"
                    )}
                  </p>
                </div>

                {testimonial.response && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600 italic">
                      {testimonial.response.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(testimonial.response.date).toLocaleDateString(
                        language === "ar" ? "ar-AE" : "en-US"
                      )}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline">
            {language === "ar" ? "شارك تجربتك" : "Share Your Experience"}
          </Button>
        </div>
      </div>
    </section>
  );
}
