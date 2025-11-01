interface VerseCardProps {
  verseNumber: number;
  arabicText: string;
  translation: string;
  transliteration?: string;
  surahName: string;
}

export default function VerseCard({ 
  verseNumber, 
  arabicText, 
  translation, 
  transliteration,
  surahName
}: VerseCardProps) {
  return (
    <div 
      className="bg-card border border-card-border rounded-xl p-5 space-y-4 hover-elevate transition-all"
      data-testid={`verse-card-${verseNumber}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-semibold">
              {verseNumber}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{surahName}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <p 
          className="text-2xl font-arabic leading-loose text-right"
          dir="rtl"
          data-testid="text-arabic"
        >
          {arabicText}
        </p>
        
        {transliteration && (
          <p className="text-sm text-muted-foreground italic" data-testid="text-transliteration">
            {transliteration}
          </p>
        )}
        
        <p className="text-base text-foreground leading-relaxed" data-testid="text-translation">
          {translation}
        </p>
      </div>
    </div>
  );
}
