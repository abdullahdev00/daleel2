import { useState } from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { useLocation } from "wouter";
import ListCard from "@/components/ListCard";
import QuranSettingsSheet from "@/components/QuranSettingsSheet";
import { useQuery } from "@tanstack/react-query";

interface SurahInfo {
  surahNumber: number;
  surahName: string;
  totalVerses: number;
  arabicName: string;
}

export default function QuranSurahList() {
  const [, setLocation] = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { data: surahs, isLoading } = useQuery<SurahInfo[]>({
    queryKey: ["/api/quran/surahs"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading surahs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocation("/library")}
              className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Holy Quran</h1>
              <p className="text-sm text-muted-foreground">Select a Surah to read</p>
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
      
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {surahs?.map((surah) => (
            <ListCard
              key={surah.surahNumber}
              number={surah.surahNumber}
              title={surah.surahName}
              subtitle={`Surah ${surah.surahNumber}`}
              arabicText={surah.arabicName}
              count={surah.totalVerses}
              countLabel="Ayahs"
              onClick={() => setLocation(`/library/quran/${surah.surahNumber}`)}
            />
          ))}
        </div>
      </div>

      <QuranSettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
