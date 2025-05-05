import { useQuery } from "@tanstack/react-query";
import backend from "~backend/client";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "~backend/doctor/types";

export function FAQSection() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  const { data, isLoading } = useQuery({
    queryKey: ["faqs", language],
    queryFn: () => backend.doctor.getFAQs({ lang: language })
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Group FAQs by category
  const groupedFAQs = data?.faqs.reduce((acc: Record<string, FAQ[]>, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("faq.title")}</h2>
          <p className="text-lg text-gray-600">{t("faq.subtitle")}</p>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedFAQs || {}).map(([category, faqs]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left px-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
