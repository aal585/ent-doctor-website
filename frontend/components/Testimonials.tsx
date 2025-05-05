import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import backend from "~backend/client";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "~backend/doctor/types";

export function Testimonials() {
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Testimonials</h2>
          <p className="text-lg text-gray-600">
            What our patients say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.testimonials.map((testimonial: Testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="font-semibold">{testimonial.patientName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
