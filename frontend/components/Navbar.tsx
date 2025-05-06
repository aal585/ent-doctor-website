import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../hooks/useLanguage";
import { getTranslation } from "../lib/i18n";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  translationKey: string;
  href: string;
  children?: Array<{ label: string; translationKey: string; href: string }>;
}

const navItems: NavItem[] = [
  { label: "Home", translationKey: "nav.home", href: "/" },
  { 
    label: "Services", 
    translationKey: "nav.services", 
    href: "#services",
    children: [
      { label: "Ear Care", translationKey: "nav.services.ear", href: "#ear-care" },
      { label: "Nose & Sinus", translationKey: "nav.services.nose", href: "#nose-care" },
      { label: "Throat Care", translationKey: "nav.services.throat", href: "#throat-care" },
    ]
  },
  { label: "About", translationKey: "nav.about", href: "#about" },
  { label: "Articles", translationKey: "nav.articles", href: "#articles" },
  { label: "Contact", translationKey: "nav.contact", href: "#contact" }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(key, language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img
                src="/images/logo.svg"
                alt="Logo"
                className="h-10 w-auto"
              />
              <span className={cn(
                "text-xl font-semibold transition-colors duration-300",
                isScrolled ? "text-gray-900" : "text-primary"
              )}>
                {language === "ar" ? "د. أحمد سلطان" : "Dr. Ahmed Sultan"}
              </span>
            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-colors duration-300",
                    isScrolled ? "text-gray-600 hover:text-primary" : "text-gray-100 hover:text-white"
                  )}
                >
                  <span>{t(item.translationKey)}</span>
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </a>

                {item.children && (
                  <div className="absolute top-full left-0 w-48 py-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50"
                      >
                        {t(child.translationKey)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button>{t("nav.book")}</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors duration-300",
                isScrolled
                  ? "text-gray-600 hover:text-primary"
                  : "text-gray-100 hover:text-white"
              )}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-20 bg-white z-40 transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 space-y-4">
          {navItems.map((item) => (
            <div key={item.href}>
              <a
                href={item.href}
                className="block py-2 text-gray-600 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(item.translationKey)}
              </a>
              {item.children && (
                <div className="pl-4 mt-2 space-y-2">
                  {item.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      className="block py-2 text-sm text-gray-500 hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(child.translationKey)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button className="w-full mt-6">{t("nav.book")}</Button>
        </div>
      </div>
    </nav>
  );
}
