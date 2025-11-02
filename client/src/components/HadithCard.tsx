import { useState } from "react";
import { Languages, BookText, Info, Plus, Check } from "lucide-react";
import { useHadithSettings } from "@/contexts/HadithSettingsContext";
import HadithCommentaryDrawer from "./HadithCommentaryDrawer";
import HadithReferenceDrawer from "./HadithReferenceDrawer";
import TranslationDrawer from "./TranslationDrawer";
import AddToDaleelDrawer from "./AddToDaleelDrawer";
import { useDaleel } from "@/contexts/DaleelContext";

interface HadithCardProps {
  hadithNumber: number;
  arabicText: string;
  translation: string;
  narrator?: string;
  book: string;
  chapter: string;
  status?: string;
  bookArabic?: string;
  chapterArabic?: string;
  volume?: string;
  statusRef?: string;
  commentary?: string;
  explanation?: string;
}

export default function HadithCard({ 
  hadithNumber, 
  arabicText, 
  translation, 
  narrator,
  book,
  chapter,
  status = "Sahih",
  bookArabic,
  chapterArabic,
  volume,
  statusRef,
  commentary,
  explanation,
}: HadithCardProps) {
  const { settings } = useHadithSettings();
  const { defaultDaleelId, addItem } = useDaleel();
  const [translationOpen, setTranslationOpen] = useState(false);
  const [commentaryOpen, setCommentaryOpen] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [daleelOpen, setDaleelOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToDaleel = () => {
    if (defaultDaleelId) {
      addItem({
        type: "hadith",
        hadithNumber,
        book,
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
        className="bg-card border border-border rounded-2xl overflow-hidden hover-elevate transition-all"
        data-testid={`hadith-card-${hadithNumber}`}
      >
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTranslationOpen(true)}
              className="flex items-center gap-1.5 px-4 h-9 rounded-full border border-border bg-background hover:bg-accent transition-colors text-sm font-medium"
            >
              <Languages className="w-3.5 h-3.5" />
              Translation
            </button>
            <button
              onClick={() => setCommentaryOpen(true)}
              className="flex items-center gap-1.5 px-4 h-9 rounded-full border border-border bg-background hover:bg-accent transition-colors text-sm font-medium"
            >
              <BookText className="w-3.5 h-3.5" />
              Sharah
            </button>
            <button
              onClick={handleAddToDaleel}
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all ${
                showSuccess 
                  ? "bg-green-500/20 border-green-500 text-green-600" 
                  : "border-border bg-background hover:bg-accent"
              }`}
              data-testid={`button-add-daleel-${hadithNumber}`}
            >
              {showSuccess ? (
                <Check className="w-4 h-4 animate-in zoom-in duration-200" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary">
              #{hadithNumber}
            </span>
          </div>
        </div>
        
        <div className="p-5 pt-6 space-y-5">
          {settings.showArabic && (
            <p 
              className="font-arabic leading-loose text-right"
              style={{ fontSize: `${settings.arabicFontSize}px` }}
              dir="rtl"
              data-testid="text-arabic"
            >
              {arabicText}
            </p>
          )}
          
          {settings.showArabic && settings.showTranslation && (
            <div className="w-full h-px bg-border" />
          )}
          
          {settings.showTranslation && (
            <p 
              className="leading-relaxed text-foreground"
              style={{ fontSize: `${settings.translationFontSize}px` }}
              data-testid="text-translation"
            >
              {translation}
            </p>
          )}

          <div className="flex items-end justify-between pt-3 border-t border-border">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Book:</span> {book}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Hadith #</span> {hadithNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Status:</span>{" "}
                <span className="text-green-600 dark:text-green-400 font-semibold">{status}</span>
              </p>
            </div>
            
            <button
              onClick={() => setReferenceOpen(true)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <Info className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Reference</span>
            </button>
          </div>
        </div>
      </div>

      <TranslationDrawer
        open={translationOpen}
        onOpenChange={setTranslationOpen}
        verseNumber={hadithNumber}
        surahNumber={0}
        translation={translation}
      />

      <HadithCommentaryDrawer
        open={commentaryOpen}
        onOpenChange={setCommentaryOpen}
        hadithNumber={hadithNumber}
        book={book}
        commentary={commentary}
      />

      <HadithReferenceDrawer
        open={referenceOpen}
        onOpenChange={setReferenceOpen}
        hadithNumber={hadithNumber}
        book={book}
        bookArabic={bookArabic}
        chapter={chapter}
        chapterArabic={chapterArabic}
        volume={volume}
        status={status}
        statusRef={statusRef}
        narrator={narrator}
        explanation={explanation}
      />

      <AddToDaleelDrawer
        open={daleelOpen}
        onOpenChange={setDaleelOpen}
        item={{
          type: "hadith",
          hadithNumber,
          book,
          arabicText,
          translation,
        }}
      />
    </>
  );
}
