import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface HadithSettings {
  arabicFontSize: number;
  translationFontSize: number;
  showArabic: boolean;
  showTranslation: boolean;
}

interface HadithSettingsContextType {
  settings: HadithSettings;
  updateArabicFontSize: (size: number) => void;
  updateTranslationFontSize: (size: number) => void;
  incrementArabicFontSize: () => void;
  decrementArabicFontSize: () => void;
  incrementTranslationFontSize: () => void;
  decrementTranslationFontSize: () => void;
  toggleArabic: () => void;
  toggleTranslation: () => void;
}

const HadithSettingsContext = createContext<HadithSettingsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: HadithSettings = {
  arabicFontSize: 24,
  translationFontSize: 16,
  showArabic: false,
  showTranslation: true,
};

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 48;
const FONT_SIZE_STEP = 2;

export function HadithSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<HadithSettings>(() => {
    const stored = localStorage.getItem("hadith-settings");
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
    localStorage.setItem("hadith-settings", JSON.stringify(settings));
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

  const toggleArabic = () => {
    setSettings((prev) => ({ ...prev, showArabic: !prev.showArabic }));
  };

  const toggleTranslation = () => {
    setSettings((prev) => ({ ...prev, showTranslation: !prev.showTranslation }));
  };

  return (
    <HadithSettingsContext.Provider
      value={{
        settings,
        updateArabicFontSize,
        updateTranslationFontSize,
        incrementArabicFontSize,
        decrementArabicFontSize,
        incrementTranslationFontSize,
        decrementTranslationFontSize,
        toggleArabic,
        toggleTranslation,
      }}
    >
      {children}
    </HadithSettingsContext.Provider>
  );
}

export function useHadithSettings() {
  const context = useContext(HadithSettingsContext);
  if (!context) {
    throw new Error("useHadithSettings must be used within HadithSettingsProvider");
  }
  return context;
}
