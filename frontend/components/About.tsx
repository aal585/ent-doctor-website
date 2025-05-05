import { useQuery } from "@tanstack/react-query";
import backend from "~backend/client";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Award, Users, Clock } from "lucide-react";

export function About() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => backend.doctor.getProfile()
  });

  const stats = [
    { icon: Clock, label: "Years Experience", value: "15+" },
    { icon: Users, label: "Patients Treated", value: "10,000+" },
    { icon: Award, label: "Certifications", value: "Multiple" },
    { icon: Stethoscope, label: "Specializations", value: "5+" },
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Dr. Ahmed Sultan</h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                Dr. Ahmed Sultan is a highly qualified ENT specialist with over 15 years of experience
                in treating ear, nose, and throat conditions. His expertise spans across various
                subspecialties including ear surgery, sinus surgery, and pediatric ENT care.
              </p>
              <p className="text-lg text-gray-600">
                With a commitment to providing exceptional patient care, Dr. Sultan combines his extensive
                medical knowledge with the latest technological advancements in ENT treatment.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Qualifications</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {data?.qualifications.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Specializations</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {data?.specializations.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
