import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import backend from "~backend/client";

export function Services() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hello"],
    queryFn: () => backend.doctor.hello()
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading services</div>;

  // Static services data
  const services = [
    {
      id: "1",
      name: "Hearing Test",
      description: "Complete hearing evaluation"
    },
    {
      id: "2",
      name: "Sinus Surgery",
      description: "Advanced sinus procedures"
    },
    {
      id: "3",
      name: "Sleep Apnea",
      description: "Sleep disorder treatment"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">
            Comprehensive ENT care using advanced medical technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="p-6">
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
