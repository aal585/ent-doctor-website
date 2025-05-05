import { Button } from "@/components/ui/button";
import { useLanguage } from "../hooks/useLanguage";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="font-medium"
    >
      {language === "en" ? "العربية" : "English"}
    </Button>
  );
}
