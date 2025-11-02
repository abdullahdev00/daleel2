import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import TranslationDrawer from "./TranslationDrawer";
import TafseerDrawer from "./TafseerDrawer";
import AddToDaleelDrawer from "./AddToDaleelDrawer";
import { useQuranSettings } from "@/contexts/QuranSettingsContext";
import { useDaleel } from "@/contexts/DaleelContext";

interface VerseCardProps {
  verseNumber: number;
  surahNumber: number;
  arabicText: string;
  translation: string;
}

export default function VerseCard({ 
  verseNumber,
  surahNumber,
  arabicText, 
  translation,
}: VerseCardProps) {
  const [translationOpen, setTranslationOpen] = useState(false);
  const [tafseerOpen, setTafseerOpen] = useState(false);
  const [daleelOpen, setDaleelOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { settings } = useQuranSettings();
  const { defaultDaleelId, addItem } = useDaleel();

  const handleAddToDaleel = () => {
    if (defaultDaleelId) {
      addItem({
        type: "verse",
        surahNumber,
        verseNumber,
        arabicText,
        translation,
        daleelId: defaultDaleelId,
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } else {
      setDaleelOpen(true);
    }
  };

  return (
    <>
      <div 
        className="bg-card border border-card-border rounded-2xl p-6 space-y-6 hover-elevate transition-all"
        data-testid={`verse-card-${verseNumber}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4 h-9"
              onClick={() => setTranslationOpen(true)}
              data-testid={`button-translation-${verseNumber}`}
            >
              Translation
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4 h-9"
              onClick={() => setTafseerOpen(true)}
              data-testid={`button-tafseer-${verseNumber}`}
            >
              Tafseer
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full w-9 h-9 p-0 transition-all ${
                showSuccess ? "bg-green-500/20 border-green-500 text-green-600" : ""
              }`}
              onClick={handleAddToDaleel}
              data-testid={`button-add-daleel-${verseNumber}`}
            >
              {showSuccess ? (
                <Check className="w-4 h-4 animate-in zoom-in duration-200" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary" data-testid="text-verse-reference">
              {surahNumber}:{verseNumber}
            </span>
          </div>
        </div>
        
        <div className="space-y-5">
          <p 
            className="font-arabic leading-loose text-right"
            style={{ fontSize: `${settings.arabicFontSize}px` }}
            dir="rtl"
            data-testid="text-arabic"
          >
            {arabicText}
          </p>
          
          <div className="w-full h-px bg-border" />
          
          <p 
            className="text-foreground leading-relaxed"
            style={{ fontSize: `${settings.translationFontSize}px` }}
            data-testid="text-translation"
          >
            {translation}
          </p>
        </div>
      </div>

      <TranslationDrawer
        open={translationOpen}
        onOpenChange={setTranslationOpen}
        verseNumber={verseNumber}
        surahNumber={surahNumber}
        translation={translation}
      />

      <TafseerDrawer
        open={tafseerOpen}
        onOpenChange={setTafseerOpen}
        verseNumber={verseNumber}
        surahNumber={surahNumber}
      />

      <AddToDaleelDrawer
        open={daleelOpen}
        onOpenChange={setDaleelOpen}
        item={{
          type: "verse",
          surahNumber,
          verseNumber,
          arabicText,
          translation,
        }}
      />
    </>
  );
}
