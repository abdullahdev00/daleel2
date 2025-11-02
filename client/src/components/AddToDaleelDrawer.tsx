import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { X, Plus } from "lucide-react";
import { useDaleel } from "@/contexts/DaleelContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddToDaleelDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    type: "verse" | "hadith";
    surahNumber?: number;
    verseNumber?: number;
    hadithNumber?: number;
    book?: string;
    arabicText: string;
    translation: string;
  };
}

export default function AddToDaleelDrawer({
  open,
  onOpenChange,
  item,
}: AddToDaleelDrawerProps) {
  const { categories, addItem, addCategory } = useDaleel();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [lastClickTime, setLastClickTime] = useState(0);

  const colors = ["#5A7A6B", "#C9A96E", "#3D5556", "#8B7355", "#4A6A5B"];

  const handleSave = () => {
    if (selectedCategory && selectedCategory !== "all") {
      addItem({
        ...item,
        categoryId: selectedCategory,
      });
      onOpenChange(false);
      setSelectedCategory("all");
    }
  };

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      addCategory(newCategoryName.trim(), randomColor);
      setNewCategoryName("");
      setShowNewCategory(false);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input')) {
      return;
    }

    const now = Date.now();
    if (now - lastClickTime < 300) {
      onOpenChange(false);
    }
    setLastClickTime(now);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]" onClick={handleBackgroundClick}>
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <DrawerTitle className="text-xl font-semibold">
            Add to Daleel
          </DrawerTitle>
          <DrawerClose asChild>
            <button className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 pt-4 pb-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Select Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "ring-2 ring-offset-2 ring-primary"
                      : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? category.color : `${category.color}40`,
                    color: selectedCategory === category.id ? "white" : category.color,
                  }}
                >
                  {category.name}
                </button>
              ))}
              <button
                onClick={() => setShowNewCategory(!showNewCategory)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 text-foreground transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                New Category
              </button>
            </div>
          </div>

          {showNewCategory && (
            <div className="p-4 bg-muted/50 rounded-xl border border-border space-y-3 animate-in slide-in-from-top-2">
              <Input
                placeholder="Category name..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateCategory()}
                className="rounded-lg"
              />
              <div className="flex gap-2">
                <Button onClick={handleCreateCategory} className="flex-1 rounded-lg">
                  Create
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewCategory(false);
                    setNewCategoryName("");
                  }}
                  className="flex-1 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="p-4 bg-card rounded-xl border border-border space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Preview</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {item.translation}
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={selectedCategory === "all"}
            className="w-full rounded-lg h-11"
          >
            Save to Daleel
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
