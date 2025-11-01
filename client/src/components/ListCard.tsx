interface ListCardProps {
  number: number;
  title: string;
  subtitle: string;
  arabicText?: string;
  count: number;
  countLabel: string;
  onClick: () => void;
}

export default function ListCard({
  number,
  title,
  subtitle,
  arabicText,
  count,
  countLabel,
  onClick,
}: ListCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-card border border-card-border rounded-lg p-4 hover-elevate active-elevate-2 cursor-pointer transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center border border-border">
          <span className="text-lg font-semibold text-foreground">{number}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-foreground mb-0.5 truncate">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {subtitle}
              </p>
            </div>
            
            {arabicText && (
              <div className="flex-shrink-0">
                <p className="text-xl font-arabic text-foreground" dir="rtl">
                  {arabicText}
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {count} {countLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
