import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface DaleelItem {
  id: string;
  type: "verse" | "hadith";
  surahNumber?: number;
  verseNumber?: number;
  hadithNumber?: number;
  book?: string;
  arabicText: string;
  translation: string;
  daleelId: string;
  addedAt: Date;
}

export interface Daleel {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  itemCount: number;
  createdAt: Date;
}

export interface DaleelCategory {
  id: string;
  name: string;
  color: string;
  daleelCount: number;
}

interface DaleelContextType {
  categories: DaleelCategory[];
  daleels: Daleel[];
  items: DaleelItem[];
  defaultDaleelId: string | null;
  addCategory: (name: string, color: string) => void;
  deleteCategory: (id: string) => void;
  addDaleel: (name: string, description: string, categoryId: string) => void;
  deleteDaleel: (id: string) => void;
  getDaleelsByCategory: (categoryId: string) => Daleel[];
  addItem: (item: Omit<DaleelItem, "id" | "addedAt">) => void;
  removeItem: (id: string) => void;
  getItemsByDaleel: (daleelId: string) => DaleelItem[];
  getItemsByCategory: (categoryId: string) => DaleelItem[];
  setDefaultDaleel: (daleelId: string | null) => void;
}

const DaleelContext = createContext<DaleelContextType | undefined>(undefined);

const DEFAULT_CATEGORIES: DaleelCategory[] = [
  { id: "general", name: "General", color: "#5A7A6B", daleelCount: 0 },
  { id: "favorites", name: "Favorites", color: "#C9A96E", daleelCount: 0 },
  { id: "study", name: "Study", color: "#3D5556", daleelCount: 0 },
];

export function DaleelProvider({ children }: { children: ReactNode }) {
  const [defaultDaleelId, setDefaultDaleelId] = useState<string | null>(() => {
    const stored = localStorage.getItem("daleel-default");
    return stored || null;
  });

  const [categories, setCategories] = useState<DaleelCategory[]>(() => {
    const stored = localStorage.getItem("daleel-categories");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEFAULT_CATEGORIES;
      }
    }
    return DEFAULT_CATEGORIES;
  });

  const [daleels, setDaleels] = useState<Daleel[]>(() => {
    const stored = localStorage.getItem("daleel-collections");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((daleel: any) => ({
          ...daleel,
          createdAt: new Date(daleel.createdAt),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  const [items, setItems] = useState<DaleelItem[]>(() => {
    const stored = localStorage.getItem("daleel-items");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("daleel-categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("daleel-collections", JSON.stringify(daleels));
  }, [daleels]);

  useEffect(() => {
    localStorage.setItem("daleel-items", JSON.stringify(items));
  }, [items]);

  const addCategory = (name: string, color: string) => {
    const newCategory: DaleelCategory = {
      id: Date.now().toString(),
      name,
      color,
      daleelCount: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = (id: string) => {
    const categoryDaleels = daleels.filter((d) => d.categoryId === id);
    const daleelIds = categoryDaleels.map((d) => d.id);
    
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    setDaleels((prev) => prev.filter((d) => d.categoryId !== id));
    setItems((prev) => prev.filter((item) => !daleelIds.includes(item.daleelId)));
  };

  const addDaleel = (name: string, description: string, categoryId: string) => {
    const newDaleel: Daleel = {
      id: Date.now().toString(),
      name,
      description,
      categoryId,
      itemCount: 0,
      createdAt: new Date(),
    };
    setDaleels((prev) => [...prev, newDaleel]);
    
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, daleelCount: cat.daleelCount + 1 }
          : cat
      )
    );
  };

  const deleteDaleel = (id: string) => {
    const daleel = daleels.find((d) => d.id === id);
    if (daleel) {
      setDaleels((prev) => prev.filter((d) => d.id !== id));
      setItems((prev) => prev.filter((item) => item.daleelId !== id));
      
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === daleel.categoryId
            ? { ...cat, daleelCount: Math.max(0, cat.daleelCount - 1) }
            : cat
        )
      );
      
      if (defaultDaleelId === id) {
        setDefaultDaleelId(null);
        localStorage.removeItem("daleel-default");
      }
    }
  };

  const getDaleelsByCategory = (categoryId: string) => {
    return daleels.filter((daleel) => daleel.categoryId === categoryId);
  };

  const addItem = (item: Omit<DaleelItem, "id" | "addedAt">) => {
    const newItem: DaleelItem = {
      ...item,
      id: Date.now().toString(),
      addedAt: new Date(),
    };
    setItems((prev) => [...prev, newItem]);
    
    setDaleels((prev) =>
      prev.map((daleel) =>
        daleel.id === item.daleelId
          ? { ...daleel, itemCount: daleel.itemCount + 1 }
          : daleel
      )
    );
  };

  const removeItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDaleels((prev) =>
        prev.map((daleel) =>
          daleel.id === item.daleelId
            ? { ...daleel, itemCount: Math.max(0, daleel.itemCount - 1) }
            : daleel
        )
      );
    }
  };

  const getItemsByDaleel = (daleelId: string) => {
    return items.filter((item) => item.daleelId === daleelId);
  };

  const getItemsByCategory = (categoryId: string) => {
    if (categoryId === "all") {
      return items;
    }
    const categoryDaleelIds = daleels
      .filter((d) => d.categoryId === categoryId)
      .map((d) => d.id);
    return items.filter((item) => categoryDaleelIds.includes(item.daleelId));
  };

  const setDefaultDaleel = (daleelId: string | null) => {
    setDefaultDaleelId(daleelId);
    if (daleelId) {
      localStorage.setItem("daleel-default", daleelId);
    } else {
      localStorage.removeItem("daleel-default");
    }
  };

  return (
    <DaleelContext.Provider
      value={{
        categories,
        daleels,
        items,
        defaultDaleelId,
        addCategory,
        deleteCategory,
        addDaleel,
        deleteDaleel,
        getDaleelsByCategory,
        addItem,
        removeItem,
        getItemsByDaleel,
        getItemsByCategory,
        setDefaultDaleel,
      }}
    >
      {children}
    </DaleelContext.Provider>
  );
}

export function useDaleel() {
  const context = useContext(DaleelContext);
  if (!context) {
    throw new Error("useDaleel must be used within DaleelProvider");
  }
  return context;
}
