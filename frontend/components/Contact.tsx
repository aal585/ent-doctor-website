import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    content: ["123 Medical Center Drive", "Dubai, UAE"]
  },
  {
    icon: Phone,
    title: "Phone",
    content: ["+971 4 123 4567", "Emergency: +971 4 987 6543"]
  },
  {
    icon: Mail,
    title: "Email",
    content: ["info@drsultan.com", "appointments@drsultan.com"]
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Sun: Closed"]
  }
];

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            Get in touch with us for appointments and inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <info.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-4">{info.title}</h3>
                  {info.content.map((line, i) => (
                    <p key={i} className="text-gray-600">{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.7064561541297!2d55.2707!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzE3LjMiTiA1NcKwMTYnMTQuNSJF!5e0!3m2!1sen!2sae!4v1635000000000!5m2!1sen!2sae"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
