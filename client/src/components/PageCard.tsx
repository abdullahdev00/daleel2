interface PageCardProps {
  pageNumber: number;
  content: string;
  bookTitle: string;
}

export default function PageCard({ pageNumber, content, bookTitle }: PageCardProps) {
  return (
    <div 
      className="bg-card border border-card-border rounded-xl p-6 space-y-4 hover-elevate transition-all"
      data-testid={`page-card-${pageNumber}`}
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-semibold">
              {pageNumber}
            </span>
          </div>
          <span className="text-sm font-medium text-foreground">{bookTitle}</span>
        </div>
      </div>
      
      <div 
        className="text-base font-arabic leading-loose text-right min-h-[200px]"
        dir="rtl"
        data-testid="text-content"
      >
        {content}
      </div>
    </div>
  );
}
