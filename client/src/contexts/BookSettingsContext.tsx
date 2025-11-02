import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface BookSettings {
  fontSize: number;
  pageScale: number;
}

interface BookSettingsContextType {
  settings: BookSettings;
  updateFontSize: (size: number) => void;
  incrementFontSize: () => void;
  decrementFontSize: () => void;
  updatePageScale: (scale: number) => void;
  incrementPageScale: () => void;
  decrementPageScale: () => void;
}

const BookSettingsContext = createContext<BookSettingsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: BookSettings = {
  fontSize: 18,
  pageScale: 1,
};

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 32;
const FONT_SIZE_STEP = 2;

const MIN_PAGE_SCALE = 0.5;
const MAX_PAGE_SCALE = 1.5;
const PAGE_SCALE_STEP = 0.1;

export function BookSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<BookSettings>(() => {
    const stored = localStorage.getItem("book-settings");
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
    localStorage.setItem("book-settings", JSON.stringify(settings));
  }, [settings]);

  const updateFontSize = (size: number) => {
    const clampedSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, size));
    setSettings((prev) => ({ ...prev, fontSize: clampedSize }));
  };

  const incrementFontSize = () => {
    updateFontSize(settings.fontSize + FONT_SIZE_STEP);
  };

  const decrementFontSize = () => {
    updateFontSize(settings.fontSize - FONT_SIZE_STEP);
  };

  const updatePageScale = (scale: number) => {
    const clampedScale = Math.max(MIN_PAGE_SCALE, Math.min(MAX_PAGE_SCALE, scale));
    setSettings((prev) => ({ ...prev, pageScale: clampedScale }));
  };

  const incrementPageScale = () => {
    updatePageScale(Math.round((settings.pageScale + PAGE_SCALE_STEP) * 10) / 10);
  };

  const decrementPageScale = () => {
    updatePageScale(Math.round((settings.pageScale - PAGE_SCALE_STEP) * 10) / 10);
  };

  return (
    <BookSettingsContext.Provider
      value={{
        settings,
        updateFontSize,
        incrementFontSize,
        decrementFontSize,
        updatePageScale,
        incrementPageScale,
        decrementPageScale,
      }}
    >
      {children}
    </BookSettingsContext.Provider>
  );
}

export function useBookSettings() {
  const context = useContext(BookSettingsContext);
  if (!context) {
    throw new Error("useBookSettings must be used within BookSettingsProvider");
  }
  return context;
}
