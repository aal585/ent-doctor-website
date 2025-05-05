import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Calendar,
  CreditCard,
  HelpCircle,
  HeartPulse,
  Search,
  Stethoscope
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import backend from "~backend/client";
import type { FAQ } from "~backend/doctor/types";

const categoryIcons = {
  Appointments: Calendar,
  Procedures: Stethoscope,
  Insurance: CreditCard,
  Recovery: HeartPulse,
  General: HelpCircle
};

export function FAQSection() {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const { data, isLoading } = useQuery({
    queryKey: ["faqs", language],
    queryFn: () => backend.doctor.getFAQs({ lang: language })
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filter FAQs based on search query and selected category
  const filteredFAQs = data?.faqs.filter(faq => {
    const matchesSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Group FAQs by category
  const groupedFAQs = filteredFAQs?.reduce((acc: Record<string, FAQ[]>, faq) => {
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

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              className="pl-10"
              placeholder={language === "ar" ? "ابحث عن سؤال..." : "Search questions..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === undefined ? "default" : "outline"}
              onClick={() => setSelectedCategory(undefined)}
            >
              {t("services.all")}
            </Button>
            {Object.keys(categoryIcons).map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              );
            })}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-8">
          {Object.entries(groupedFAQs || {}).map(([category, faqs]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons] || HelpCircle;
            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{category}</h3>
                </div>
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
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredFAQs?.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {language === "ar" 
                ? "لم يتم العثور على نتائج. جرب بحثًا مختلفًا."
                : "No results found. Try a different search."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
