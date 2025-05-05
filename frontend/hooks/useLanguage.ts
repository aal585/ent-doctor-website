import { create } from "zustand";
import type { Language } from "../lib/i18n";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  language: "en",
  setLanguage: (lang) => set({ language: lang })
}));
