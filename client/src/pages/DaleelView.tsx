import { useState } from "react";
import { ArrowLeft, Trash2, BookOpen, Scroll } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useDaleel } from "@/contexts/DaleelContext";

export default function DaleelView() {
  const { daleelId } = useParams<{ daleelId: string }>();
  const [, setLocation] = useLocation();
  const { daleels, getItemsByDaleel, removeItem } = useDaleel();

  const daleel = daleels.find(d => d.id === daleelId);
  const items = daleelId ? getItemsByDaleel(daleelId) : [];

  if (!daleel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Daleel not found</p>
          <button
            onClick={() => setLocation("/daleel")}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Go back to Daleel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="h-16 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setLocation("/daleel")}
            className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">{daleel.name}</h1>
            <p className="text-sm text-muted-foreground">{daleel.itemCount} items</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-4xl mx-auto">
        {daleel.description && (
          <div className="mb-6 p-4 bg-muted/50 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">{daleel.description}</p>
          </div>
        )}

        {items.length === 0 ? (
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
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-2xl p-5 space-y-4 hover-elevate transition-all"
                data-testid={`card-item-${item.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
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
                        {item.type === "verse" ? "Quran Verse" : "Hadith"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-9 h-9 rounded-lg hover:bg-destructive/10 text-destructive flex items-center justify-center transition-colors"
                    data-testid={`button-delete-${item.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {item.arabicText && (
                    <p className="text-right text-xl leading-relaxed font-arabic text-foreground">
                      {item.arabicText}
                    </p>
                  )}
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
  );
}
