import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Expert ENT Care with<br />
              <span className="text-primary">Dr. Ahmed Sultan</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Specialized care for ear, nose, and throat conditions using the latest medical technologies and treatments.
            </p>
            <div className="space-x-4">
              <Button size="lg">Book Appointment</Button>
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/doctor-hero.jpg"
              alt="Dr. Ahmed Sultan"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-6">
              <p className="text-4xl font-bold text-primary mb-2">15+</p>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
