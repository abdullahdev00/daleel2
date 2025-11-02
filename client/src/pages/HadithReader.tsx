import { useEffect, useState } from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { useLocation, useParams } from "wouter";
import HadithCard from "@/components/HadithCard";
import HadithSettingsSheet from "@/components/HadithSettingsSheet";
import { useQuery } from "@tanstack/react-query";
import type { Hadith } from "@shared/schema";

export default function HadithReader() {
  const [, setLocation] = useLocation();
  const params = useParams<{ bookId: string }>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  let bookName = "";
  let isInvalid = false;
  
  try {
    if (!params?.bookId) {
      isInvalid = true;
    } else {
      bookName = decodeURIComponent(params.bookId);
    }
  } catch {
    isInvalid = true;
  }
  
  useEffect(() => {
    if (isInvalid) {
      setLocation("/library/hadith");
    }
  }, [isInvalid, setLocation]);
  
  if (isInvalid) {
    return null;
  }

  const { data: hadiths, isLoading } = useQuery<Hadith[]>({
    queryKey: ["/api/hadiths", bookName],
    queryFn: async () => {
      const res = await fetch(`/api/hadiths?book=${encodeURIComponent(bookName)}`);
      if (!res.ok) throw new Error("Failed to fetch hadiths");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading hadiths...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="h-16 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocation("/library/hadith")}
              className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{bookName}</h1>
              <p className="text-sm text-muted-foreground">Authentic Hadiths</p>
            </div>
          </div>
          
          <button
            onClick={() => setSettingsOpen(true)}
            className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-settings"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
      
      <div className="px-4 py-6 space-y-4 max-w-4xl mx-auto">
        {hadiths?.map((hadith) => (
          <HadithCard
            key={hadith.id}
            hadithNumber={hadith.hadithNumber}
            arabicText={hadith.arabicText}
            translation={hadith.translation}
            narrator={hadith.narrator || undefined}
            book={hadith.book}
            chapter={hadith.chapter}
          />
        ))}
      </div>

      <HadithSettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
