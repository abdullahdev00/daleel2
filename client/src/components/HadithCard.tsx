interface HadithCardProps {
  hadithNumber: number;
  arabicText: string;
  translation: string;
  narrator?: string;
  book: string;
  chapter: string;
}

export default function HadithCard({ 
  hadithNumber, 
  arabicText, 
  translation, 
  narrator,
  book,
  chapter
}: HadithCardProps) {
  return (
    <div 
      className="bg-card border border-card-border rounded-xl p-5 space-y-4 hover-elevate transition-all"
      data-testid={`hadith-card-${hadithNumber}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-semibold">
              {hadithNumber}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{book}</span>
            <span className="text-xs text-muted-foreground">{chapter}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <p 
          className="text-xl font-arabic leading-loose text-right"
          dir="rtl"
          data-testid="text-arabic"
        >
          {arabicText}
        </p>
        
        <p className="text-base text-foreground leading-relaxed" data-testid="text-translation">
          {translation}
        </p>
        
        {narrator && (
          <p className="text-sm text-muted-foreground" data-testid="text-narrator">
            <span className="font-medium">Narrator:</span> {narrator}
          </p>
        )}
      </div>
    </div>
  );
}
