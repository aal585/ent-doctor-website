import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { CertificatesAndProcedures } from "./components/CertificatesAndProcedures";
import { Testimonials } from "./components/Testimonials";
import { Articles } from "./components/Articles";
import { FAQSection } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { AppointmentForm } from "./components/AppointmentForm";
import { useLanguage } from "./hooks/useLanguage";
import { getTranslation } from "./lib/i18n";

const queryClient = new QueryClient();

function AppInner() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  return (
    <div className={`min-h-screen bg-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <CertificatesAndProcedures />
      <Testimonials />
      <Articles />
      <FAQSection />
      
      <section id="appointment" className="py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("nav.book")}</h2>
            <p className="text-lg text-gray-600">
              {language === "ar" 
                ? "احجز موعدك مع د. أحمد سلطان"
                : "Schedule your consultation with Dr. Ahmed Sultan"
              }
            </p>
          </div>
          <AppointmentForm />
        </div>
      </section>

      <Contact />

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("contact.title")}</h3>
              <p>123 Medical Center Drive</p>
              <p>Dubai, UAE</p>
              <p>{t("contact.phone")}: +971 4 123 4567</p>
              <p>{t("contact.email")}: info@drsultan.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("contact.hours")}</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency</h3>
              <p>24/7 Emergency Line:</p>
              <p>+971 4 987 6543</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>
              &copy; {new Date().getFullYear()} 
              {language === "ar" ? " عيادة د. أحمد سلطان. جميع الحقوق محفوظة" : " Dr. Ahmed Sultan ENT Clinic. All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
