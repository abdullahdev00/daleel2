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
  categoryId: string;
  addedAt: Date;
}

export interface DaleelCategory {
  id: string;
  name: string;
  color: string;
  itemCount: number;
}

interface DaleelContextType {
  categories: DaleelCategory[];
  items: DaleelItem[];
  addCategory: (name: string, color: string) => void;
  deleteCategory: (id: string) => void;
  addItem: (item: Omit<DaleelItem, "id" | "addedAt">) => void;
  removeItem: (id: string) => void;
  getItemsByCategory: (categoryId: string) => DaleelItem[];
}

const DaleelContext = createContext<DaleelContextType | undefined>(undefined);

const DEFAULT_CATEGORIES: DaleelCategory[] = [
  { id: "general", name: "General", color: "#5A7A6B", itemCount: 0 },
  { id: "favorites", name: "Favorites", color: "#C9A96E", itemCount: 0 },
  { id: "study", name: "Study", color: "#3D5556", itemCount: 0 },
];

export function DaleelProvider({ children }: { children: ReactNode }) {
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
    localStorage.setItem("daleel-items", JSON.stringify(items));
  }, [items]);

  const addCategory = (name: string, color: string) => {
    const newCategory: DaleelCategory = {
      id: Date.now().toString(),
      name,
      color,
      itemCount: 0,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    setItems((prev) => prev.filter((item) => item.categoryId !== id));
  };

  const addItem = (item: Omit<DaleelItem, "id" | "addedAt">) => {
    const newItem: DaleelItem = {
      ...item,
      id: Date.now().toString(),
      addedAt: new Date(),
    };
    setItems((prev) => [...prev, newItem]);
    
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === item.categoryId
          ? { ...cat, itemCount: cat.itemCount + 1 }
          : cat
      )
    );
  };

  const removeItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === item.categoryId
            ? { ...cat, itemCount: Math.max(0, cat.itemCount - 1) }
            : cat
        )
      );
    }
  };

  const getItemsByCategory = (categoryId: string) => {
    if (categoryId === "all") {
      return items;
    }
    return items.filter((item) => item.categoryId === categoryId);
  };

  return (
    <DaleelContext.Provider
      value={{
        categories,
        items,
        addCategory,
        deleteCategory,
        addItem,
        removeItem,
        getItemsByCategory,
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
