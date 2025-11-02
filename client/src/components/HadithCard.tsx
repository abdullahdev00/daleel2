import { useState } from "react";
import { Languages, BookText, Info } from "lucide-react";
import { useHadithSettings } from "@/contexts/HadithSettingsContext";
import HadithCommentaryDrawer from "./HadithCommentaryDrawer";
import HadithReferenceDrawer from "./HadithReferenceDrawer";
import TranslationDrawer from "./TranslationDrawer";

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
  const [translationOpen, setTranslationOpen] = useState(false);
  const [commentaryOpen, setCommentaryOpen] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-card border border-border rounded-2xl overflow-hidden hover-elevate transition-all"
        data-testid={`hadith-card-${hadithNumber}`}
      >
        <div className="flex items-center gap-2 p-3 border-b border-border bg-muted/30">
          <button
            onClick={() => setTranslationOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-background hover:bg-accent transition-colors"
          >
            <Languages className="w-4 h-4" />
            <span className="text-sm font-medium">Translation</span>
          </button>
          <button
            onClick={() => setCommentaryOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-background hover:bg-accent transition-colors"
          >
            <BookText className="w-4 h-4" />
            <span className="text-sm font-medium">Sharah</span>
          </button>
        </div>
        
        <div className="p-5 space-y-4">
          {settings.showArabic && (
            <p 
              className="font-arabic leading-loose text-right border-b border-border pb-4"
              style={{ fontSize: `${settings.arabicFontSize}px` }}
              dir="rtl"
              data-testid="text-arabic"
            >
              {arabicText}
            </p>
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
    </>
  );
}
