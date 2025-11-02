import { useState } from "react";
import { useDaleel } from "@/contexts/DaleelContext";
import { Plus, Trash2, BookOpen, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Daleel() {
  const { categories, items, getItemsByCategory, removeItem } = useDaleel();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const displayItems = getItemsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-serif font-semibold text-foreground mb-4">
            My Daleel
          </h1>
          <p className="text-sm text-muted-foreground">
            Your saved verses and hadiths
          </p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              All ({items.length})
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "ring-2 ring-offset-2 ring-primary scale-105"
                    : "hover:scale-105"
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? category.color : `${category.color}40`,
                  color: selectedCategory === category.id ? "white" : category.color,
                }}
              >
                {category.name} ({category.itemCount})
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            {selectedCategory === "all" ? "All Items" : categories.find(c => c.id === selectedCategory)?.name}
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
                          {categories.find(c => c.id === item.categoryId)?.name}
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
      </div>
    </div>
  );
}
