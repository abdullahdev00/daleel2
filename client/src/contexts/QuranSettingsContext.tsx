import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface QuranSettings {
  arabicFontSize: number;
  translationFontSize: number;
}

interface QuranSettingsContextType {
  settings: QuranSettings;
  updateArabicFontSize: (size: number) => void;
  updateTranslationFontSize: (size: number) => void;
  incrementArabicFontSize: () => void;
  decrementArabicFontSize: () => void;
  incrementTranslationFontSize: () => void;
  decrementTranslationFontSize: () => void;
}

const QuranSettingsContext = createContext<QuranSettingsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: QuranSettings = {
  arabicFontSize: 28,
  translationFontSize: 16,
};

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 48;
const FONT_SIZE_STEP = 2;

export function QuranSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<QuranSettings>(() => {
    const stored = localStorage.getItem("quran-settings");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem("quran-settings", JSON.stringify(settings));
  }, [settings]);

  const updateArabicFontSize = (size: number) => {
    const clampedSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, size));
    setSettings((prev) => ({ ...prev, arabicFontSize: clampedSize }));
  };

  const updateTranslationFontSize = (size: number) => {
    const clampedSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, size));
    setSettings((prev) => ({ ...prev, translationFontSize: clampedSize }));
  };

  const incrementArabicFontSize = () => {
    updateArabicFontSize(settings.arabicFontSize + FONT_SIZE_STEP);
  };

  const decrementArabicFontSize = () => {
    updateArabicFontSize(settings.arabicFontSize - FONT_SIZE_STEP);
  };

  const incrementTranslationFontSize = () => {
    updateTranslationFontSize(settings.translationFontSize + FONT_SIZE_STEP);
  };

  const decrementTranslationFontSize = () => {
    updateTranslationFontSize(settings.translationFontSize - FONT_SIZE_STEP);
  };

  return (
    <QuranSettingsContext.Provider
      value={{
        settings,
        updateArabicFontSize,
        updateTranslationFontSize,
        incrementArabicFontSize,
        decrementArabicFontSize,
        incrementTranslationFontSize,
        decrementTranslationFontSize,
      }}
    >
      {children}
    </QuranSettingsContext.Provider>
  );
}

export function useQuranSettings() {
  const context = useContext(QuranSettingsContext);
  if (!context) {
    throw new Error("useQuranSettings must be used within QuranSettingsProvider");
  }
  return context;
}
