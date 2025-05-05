import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  translationKey: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", translationKey: "nav.home", href: "/" },
  { label: "About", translationKey: "nav.about", href: "#about" },
  { label: "Services", translationKey: "nav.services", href: "#services" },
  { label: "Certificates", translationKey: "nav.certificates", href: "#certificates" },
  { label: "Testimonials", translationKey: "nav.testimonials", href: "#testimonials" },
  { label: "Articles", translationKey: "nav.articles", href: "#articles" },
  { label: "FAQ", translationKey: "nav.faq", href: "#faq" },
  { label: "Contact", translationKey: "nav.contact", href: "#contact" }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-primary">
              {language === "ar" ? "د. أحمد سلطان" : "Dr. Ahmed Sultan"}
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {t(item.translationKey)}
              </a>
            ))}
            <LanguageToggle />
            <Button>{t("nav.book")}</Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-primary ml-4"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(item.translationKey)}
            </a>
          ))}
          <div className="px-3 py-2">
            <Button className="w-full">{t("nav.book")}</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
