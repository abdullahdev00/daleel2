import { useEffect, useState } from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { useLocation, useParams } from "wouter";
import VerseCard from "@/components/VerseCard";
import QuranSettingsSheet from "@/components/QuranSettingsSheet";
import { useQuery } from "@tanstack/react-query";
import type { QuranVerse } from "@shared/schema";

export default function QuranReader() {
  const [, setLocation] = useLocation();
  const params = useParams<{ surahId: string }>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const isInvalid = !params?.surahId;
  const surahNumber = params?.surahId ? parseInt(params.surahId) : 0;
  const isInvalidNumber = isNaN(surahNumber) || surahNumber < 1;
  
  useEffect(() => {
    if (isInvalid || isInvalidNumber) {
      setLocation("/library/quran");
    }
  }, [isInvalid, isInvalidNumber, setLocation]);
  
  if (isInvalid || isInvalidNumber) {
    return null;
  }

  const { data: verses, isLoading } = useQuery<QuranVerse[]>({
    queryKey: ["/api/quran/verses", surahNumber],
    queryFn: async () => {
      const res = await fetch(`/api/quran/verses?surah=${surahNumber}`);
      if (!res.ok) throw new Error("Failed to fetch verses");
      return res.json();
    },
  });

  const surahName = verses?.[0]?.surahName || "Loading...";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading verses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="h-16 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocation("/library/quran")}
              className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{surahName}</h1>
              <p className="text-sm text-muted-foreground">Surah {surahNumber}</p>
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
        {verses?.map((verse) => (
          <VerseCard
            key={verse.id}
            verseNumber={verse.verseNumber}
            surahNumber={verse.surahNumber}
            arabicText={verse.arabicText}
            translation={verse.translation}
          />
        ))}
      </div>

      <QuranSettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
