import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Award,
  Play,
  Clock,
  CheckCircle,
  FileText,
  Star,
  Timer,
  Activity,
  User,
  CalendarClock
} from "lucide-react";
import type { Certificate, Procedure } from "~backend/doctor/types";

export function CertificatesAndProcedures() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => backend.doctor.getProfile()
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(
      language === "ar" ? "ar-AE" : "en-US",
      { year: 'numeric', month: 'long' }
    );
  };

  return (
    <section className="py-20 bg-gray-50">
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
              <Dialog key={cert.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
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
                      {cert.specialization && (
                        <div className="mt-4 flex items-center">
                          <Star className="w-4 h-4 text-primary mr-2" />
                          <span className="text-sm text-gray-600">{cert.specialization}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{cert.title}</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-primary mr-2" />
                          <span>{cert.institution}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 text-primary mr-2" />
                          <span>{formatDate(cert.issuing_date)}</span>
                        </div>
                        {cert.expiry_date && (
                          <div className="flex items-center">
                            <CalendarClock className="w-5 h-5 text-primary mr-2" />
                            <span>Valid until {formatDate(cert.expiry_date)}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-primary mr-2" />
                          <span>{cert.specialization}</span>
                        </div>
                      </div>
                      <p className="mt-6 text-gray-600">{cert.description}</p>
                      {cert.certificate_url && (
                        <Button className="mt-6" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          {t("certificates.viewCertificate")}
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="flex justify-center mb-8">
              <TabsTrigger value="all">{t("procedures.all")}</TabsTrigger>
              <TabsTrigger value="ear">{t("procedures.ear")}</TabsTrigger>
              <TabsTrigger value="sinus">{t("procedures.sinus")}</TabsTrigger>
              <TabsTrigger value="pediatric">{t("procedures.pediatric")}</TabsTrigger>
              <TabsTrigger value="throat">{t("procedures.throat")}</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {profile?.procedures.map((proc: Procedure) => (
                  <Dialog key={proc.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader className="p-0 relative">
                          {proc.type === "video" ? (
                            <div className="relative">
                              <img
                                src={proc.mediaUrls[0]}
                                alt={proc.title}
                                className="w-full h-48 object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Play className="w-12 h-12 text-white" />
                              </div>
                            </div>
                          ) : (
                            <img
                              src={proc.mediaUrls[0]}
                              alt={proc.title}
                              className="w-full h-48 object-cover"
                            />
                          )}
                          {proc.success_rate && (
                            <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 flex items-center">
                              <Activity className="w-4 h-4 text-primary mr-1" />
                              <span className="text-sm font-medium">{proc.success_rate}% Success</span>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <Calendar className="w-5 h-5 text-primary mr-2" />
                            <span className="text-sm text-gray-500">
                              {formatDate(proc.date)}
                            </span>
                          </div>
                          <CardTitle className="mb-2">{proc.title}</CardTitle>
                          <p className="text-gray-600 mb-4">{proc.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            {proc.duration_minutes && (
                              <div className="flex items-center">
                                <Timer className="w-4 h-4 mr-1" />
                                <span>{proc.duration_minutes} min</span>
                              </div>
                            )}
                            {proc.patient_age && (
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                <span>{proc.patient_age} years</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          {proc.type === "video" ? (
                            <video
                              controls
                              className="w-full rounded-lg"
                              src={proc.mediaUrls[0]}
                            />
                          ) : (
                            <img
                              src={proc.mediaUrls[0]}
                              alt={proc.title}
                              className="w-full rounded-lg"
                            />
                          )}
                          {proc.mediaUrls.length > 1 && (
                            <div className="grid grid-cols-4 gap-2 mt-2">
                              {proc.mediaUrls.slice(1).map((url, index) => (
                                <img
                                  key={index}
                                  src={url}
                                  alt={`${proc.title} ${index + 2}`}
                                  className="w-full h-20 object-cover rounded"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-4">{proc.title}</h3>
                          <p className="text-gray-600 mb-6">{proc.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {proc.success_rate && (
                              <div className="bg-primary/10 rounded-lg p-4 text-center">
                                <Activity className="w-6 h-6 text-primary mx-auto mb-2" />
                                <p className="text-2xl font-bold text-primary">{proc.success_rate}%</p>
                                <p className="text-sm text-gray-600">{t("procedures.successRate")}</p>
                              </div>
                            )}
                            {proc.duration_minutes && (
                              <div className="bg-primary/10 rounded-lg p-4 text-center">
                                <Timer className="w-6 h-6 text-primary mx-auto mb-2" />
                                <p className="text-2xl font-bold text-primary">{proc.duration_minutes}</p>
                                <p className="text-sm text-gray-600">{t("procedures.duration")}</p>
                              </div>
                            )}
                          </div>

                          {proc.technology_used_en && (
                            <div className="mb-6">
                              <h4 className="font-semibold mb-2">{t("procedures.technology")}</h4>
                              <ul className="space-y-2">
                                {(language === "en" ? proc.technology_used_en : proc.technology_used_ar).map((tech, index) => (
                                  <li key={index} className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                                    <span>{tech}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {proc.follow_up_period && (
                            <div className="flex items-center mt-4">
                              <CalendarClock className="w-5 h-5 text-primary mr-2" />
                              <span>{t("procedures.followUp")}: {proc.follow_up_period}</span>
                            </div>
                          )}

                          <Button className="w-full mt-6">
                            {t("procedures.bookConsultation")}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>

            {/* Add similar TabsContent for other categories */}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
