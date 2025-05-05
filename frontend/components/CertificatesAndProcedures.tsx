import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Award, Play } from "lucide-react";
import type { Certificate, Procedure } from "~backend/doctor/types";

export function CertificatesAndProcedures() {
  const { language } = useLanguage();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => backend.doctor.getProfile()
  });

  const t = (key: string) => getTranslation(key, language);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certificates Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("certificates.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("certificates.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile?.certificates.map((cert: Certificate) => (
              <Card key={cert.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Award className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm text-gray-500">{cert.year}</span>
                  </div>
                  <CardTitle className="mb-2">{cert.title}</CardTitle>
                  <p className="text-gray-600">{cert.institution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Procedures Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("procedures.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("procedures.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profile?.procedures.map((proc: Procedure) => (
              <Card key={proc.id} className="overflow-hidden">
                <CardHeader className="p-0 relative">
                  {proc.type === "video" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                        >
                          <Play className="w-12 h-12 text-white" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <video
                          controls
                          className="w-full"
                          src={proc.mediaUrls[0]}
                        />
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          src={proc.mediaUrls[0]}
                          alt={proc.title}
                          className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <img
                          src={proc.mediaUrls[0]}
                          alt={proc.title}
                          className="w-full"
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm text-gray-500">
                      {new Date(proc.date).toLocaleDateString(
                        language === "ar" ? "ar-AE" : "en-US"
                      )}
                    </span>
                  </div>
                  <CardTitle className="mb-2">{proc.title}</CardTitle>
                  <p className="text-gray-600">{proc.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
