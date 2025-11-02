import { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { X, Plus, FolderOpen, ChevronRight } from "lucide-react";
import { useDaleel } from "@/contexts/DaleelContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const { categories, daleels, addItem, addCategory, addDaleel, getDaleelsByCategory } = useDaleel();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDaleel, setSelectedDaleel] = useState<string>("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showNewDaleel, setShowNewDaleel] = useState(false);
  const [newDaleelName, setNewDaleelName] = useState("");
  const [newDaleelDescription, setNewDaleelDescription] = useState("");
  const [lastClickTime, setLastClickTime] = useState(0);

  const colors = ["#5A7A6B", "#C9A96E", "#3D5556", "#8B7355", "#4A6A5B"];

  const categoryDaleels = selectedCategory === "all" ? daleels : selectedCategory ? getDaleelsByCategory(selectedCategory) : [];

  useEffect(() => {
    if (open) {
      setSelectedCategory("all");
      setSelectedDaleel("");
      setShowNewCategory(false);
      setShowNewDaleel(false);
      setNewCategoryName("");
      setNewDaleelName("");
      setNewDaleelDescription("");
    }
  }, [open]);

  const handleSave = () => {
    if (selectedDaleel) {
      addItem({
        ...item,
        daleelId: selectedDaleel,
      });
      onOpenChange(false);
      setSelectedCategory("all");
      setSelectedDaleel("");
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

  const handleCreateDaleel = () => {
    if (newDaleelName.trim() && selectedCategory) {
      const targetCategoryId = selectedCategory === "all" ? "general" : selectedCategory;
      addDaleel(newDaleelName.trim(), newDaleelDescription.trim(), targetCategoryId);
      setNewDaleelName("");
      setNewDaleelDescription("");
      setShowNewDaleel(false);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('textarea')) {
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
      <DrawerContent className="max-h-[90vh]" onClick={handleBackgroundClick} onDoubleClick={() => onOpenChange(false)}>
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-5 flex-shrink-0">
          <DrawerTitle className="text-xl font-semibold">
            Add to Daleel
          </DrawerTitle>
          <DrawerClose asChild>
            <button className="w-12 h-12 rounded-full hover-elevate active-elevate-2 flex items-center justify-center">
              <X className="w-6 h-6" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-6 pt-4 pb-4 space-y-4 overflow-y-auto flex-1 min-h-0">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Step 1: Select Category</h3>
            <div className="overflow-x-auto pb-2 pt-2 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
              <div className="flex gap-2 min-w-max">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedDaleel("");
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelectedDaleel("");
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
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
                  className="px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 text-foreground transition-all flex items-center gap-1 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  New Category
                </button>
              </div>
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

          {selectedCategory && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                Step 2: Select Daleel
              </h3>
              
              {categoryDaleels.length === 0 && !showNewDaleel ? (
                <div className="text-center py-8 bg-muted/30 rounded-xl border border-dashed border-border">
                  <FolderOpen className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-3">No daleel in this category</p>
                  <Button
                    onClick={() => setShowNewDaleel(true)}
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Create First Daleel
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2">
                    {categoryDaleels.map((daleel) => (
                      <button
                        key={daleel.id}
                        onClick={() => setSelectedDaleel(daleel.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedDaleel === daleel.id
                            ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {daleel.name} ({daleel.itemCount})
                      </button>
                    ))}
                    <button
                      onClick={() => setShowNewDaleel(!showNewDaleel)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 text-foreground transition-all flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      New Daleel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {showNewDaleel && selectedCategory && (
            <div className="p-4 bg-muted/50 rounded-xl border border-border space-y-3 animate-in slide-in-from-top-2">
              <Input
                placeholder="Daleel name..."
                value={newDaleelName}
                onChange={(e) => setNewDaleelName(e.target.value)}
                className="rounded-lg"
              />
              <Textarea
                placeholder="Description (optional)..."
                value={newDaleelDescription}
                onChange={(e) => setNewDaleelDescription(e.target.value)}
                className="rounded-lg min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleCreateDaleel} className="flex-1 rounded-lg">
                  Create Daleel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewDaleel(false);
                    setNewDaleelName("");
                    setNewDaleelDescription("");
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
            disabled={!selectedDaleel}
            className="w-full rounded-lg h-11"
          >
            Save to Daleel
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
