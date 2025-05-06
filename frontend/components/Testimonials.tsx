import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Star, CheckCircle, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import backend from "~backend/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import { TestimonialForm } from "./TestimonialForm";
import type { Testimonial } from "~backend/doctor/types";

export function Testimonials() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => backend.doctor.getTestimonials()
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const testimonials = data?.testimonials || [];
  
  // Filter and sort testimonials
  const filteredTestimonials = testimonials
    .filter(t => filterRating ? t.rating === filterRating : true)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.rating - a.rating;
    });

  const slideCount = Math.ceil(filteredTestimonials.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const visibleTestimonials = filteredTestimonials.slice(currentSlide * 3, (currentSlide + 1) * 3);

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

        <div className="flex justify-end gap-4 mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                {t("testimonials.filter")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterRating(null)}>
                {t("testimonials.allRatings")}
              </DropdownMenuItem>
              {[5, 4, 3, 2, 1].map((rating) => (
                <DropdownMenuItem key={rating} onClick={() => setFilterRating(rating)}>
                  <div className="flex items-center">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2">{t("testimonials.onlyRating")}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {sortBy === "date" ? t("testimonials.sortDate") : t("testimonials.sortRating")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("date")}>
                {t("testimonials.sortDate")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating")}>
                {t("testimonials.sortRating")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial: Testimonial) => (
              <Card key={testimonial.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.patientName}`}
                      alt={testimonial.patientName}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.patientName}</p>
                      <div className="flex mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    {testimonial.verified && (
                      <div className="ml-auto flex items-center text-primary">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{t("testimonials.verified")}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{testimonial.content}</p>

                  {testimonial.procedureType && (
                    <div className="mb-4">
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {testimonial.procedureType}
                      </span>
                    </div>
                  )}

                  <div className="mt-4 text-sm text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString(
                      language === "ar" ? "ar-AE" : "en-US",
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </div>

                  {testimonial.response && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-600 italic">
                        <span className="font-semibold">{t("testimonials.doctorResponse")}: </span>
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

          {slideCount > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {slideCount > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(slideCount)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentSlide ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                {t("testimonials.share")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t("testimonials.write")}</DialogTitle>
              </DialogHeader>
              <TestimonialForm
                onSuccess={() => {
                  setIsFormOpen(false);
                  refetch();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
