import { useState } from "react";
import { useDaleel } from "@/contexts/DaleelContext";
import { Plus, Trash2, BookOpen, Scroll, FolderOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import DaleelCreateDialog from "@/components/DaleelCreateDialog";
import DaleelDeleteDialog from "@/components/DaleelDeleteDialog";
import { Input } from "@/components/ui/input";

export default function Daleel() {
  const { 
    categories, 
    daleels, 
    items, 
    defaultDaleelId,
    getDaleelsByCategory, 
    getItemsByDaleel,
    removeItem,
    deleteDaleel,
    addCategory,
    setDefaultDaleel 
  } = useDaleel();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDaleel, setSelectedDaleel] = useState<string | null>(null);
  const [showDaleelDialog, setShowDaleelDialog] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [daleelToDelete, setDaleelToDelete] = useState<{id: string, name: string} | null>(null);

  const colors = ["#5A7A6B", "#C9A96E", "#3D5556", "#8B7355", "#4A6A5B"];

  const displayDaleels = selectedCategory === "all" 
    ? daleels 
    : getDaleelsByCategory(selectedCategory);
    
  const displayItems = selectedDaleel 
    ? getItemsByDaleel(selectedDaleel) 
    : [];

  const selectedDaleelObj = daleels.find(d => d.id === selectedDaleel);

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      addCategory(newCategoryName.trim(), randomColor);
      setNewCategoryName("");
      setShowNewCategory(false);
    }
  };

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-4">
            My Daleel
          </h1>
          <p className="text-sm text-muted-foreground">
            Your saved verses and hadiths organized in collections
          </p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Categories</h2>
            <button
              onClick={() => setShowNewCategory(!showNewCategory)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Category
            </button>
          </div>
          
          {showNewCategory && (
            <div className="mb-4 p-4 bg-muted/50 rounded-xl border border-border space-y-3 animate-in slide-in-from-top-2">
              <Input
                placeholder="Category name..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateCategory()}
                className="rounded-lg"
              />
              <div className="flex gap-2">
                <Button onClick={handleCreateCategory} className="flex-1 rounded-lg" size="sm">
                  Create
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewCategory(false);
                    setNewCategoryName("");
                  }}
                  className="flex-1 rounded-lg"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto pb-3 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
            <div className="flex gap-2 min-w-max py-1">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedDaleel(null);
                }}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                All ({daleels.length})
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedDaleel(null);
                  }}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "ring-2 ring-offset-2 ring-primary scale-105"
                      : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? category.color : `${category.color}40`,
                    color: selectedCategory === category.id ? "white" : category.color,
                  }}
                >
                  {category.name} ({category.daleelCount})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {selectedCategory === "all" 
                ? "All Daleel" 
                : `${categories.find(c => c.id === selectedCategory)?.name} Daleel`
              }
            </h2>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setShowDaleelDialog(true)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Create Daleel
              </button>
            )}
          </div>
          
          {displayDaleels.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                {selectedCategory === "all" ? "No daleel created yet" : "No daleel in this category"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedCategory === "all" 
                  ? "Select a category and create your first daleel"
                  : "Create your first daleel to organize verses and hadiths"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayDaleels.map((daleel) => (
                <div
                  key={daleel.id}
                  onClick={() => setSelectedDaleel(daleel.id)}
                  className={`bg-card border rounded-2xl p-5 space-y-3 cursor-pointer transition-all ${
                    selectedDaleel === daleel.id
                      ? "ring-2 ring-primary border-primary hover-elevate"
                      : "border-border hover-elevate"
                  }`}
                  data-testid={`card-daleel-${daleel.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{daleel.name}</h3>
                          {defaultDaleelId === daleel.id && (
                            <span className="text-xs bg-amber-500/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{daleel.itemCount} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDefaultDaleel(defaultDaleelId === daleel.id ? null : daleel.id);
                        }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          defaultDaleelId === daleel.id
                            ? "bg-amber-500/20 text-amber-600 hover:bg-amber-500/30"
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                        title={defaultDaleelId === daleel.id ? "Remove as default" : "Set as default"}
                        data-testid={`button-default-${daleel.id}`}
                      >
                        <Star className={`w-4 h-4 ${defaultDaleelId === daleel.id ? "fill-current" : ""}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDaleelToDelete({id: daleel.id, name: daleel.name});
                          setDeleteDialogOpen(true);
                        }}
                        className="w-8 h-8 rounded-lg hover:bg-destructive/10 text-destructive flex items-center justify-center transition-colors"
                        data-testid={`button-delete-${daleel.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {daleel.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {daleel.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedDaleel && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              {selectedDaleelObj?.name} - Items
            </h2>
            {displayItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No items saved yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Use the + button on verses and hadiths to add them here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {displayItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-2xl p-5 space-y-4 hover-elevate transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {item.type === "verse" ? (
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Scroll className="w-5 h-5 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {item.type === "verse" 
                              ? `Surah ${item.surahNumber}:${item.verseNumber}`
                              : `${item.book} #${item.hadithNumber}`
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {selectedDaleelObj?.name}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-9 h-9 rounded-lg hover:bg-destructive/10 text-destructive flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-foreground leading-relaxed">
                        {item.translation}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Added {new Date(item.addedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <DaleelCreateDialog
        open={showDaleelDialog}
        onOpenChange={setShowDaleelDialog}
        categoryId={selectedCategory}
      />
      
      <DaleelDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        daleelName={daleelToDelete?.name || ""}
        onConfirm={() => {
          if (daleelToDelete) {
            if (selectedDaleel === daleelToDelete.id) {
              setSelectedDaleel(null);
            }
            deleteDaleel(daleelToDelete.id);
            setDaleelToDelete(null);
            setDeleteDialogOpen(false);
          }
        }}
      />
    </div>
  );
}
