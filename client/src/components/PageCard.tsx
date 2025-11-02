interface PageCardProps {
  pageNumber: number;
  content: string;
  bookTitle: string;
  chapterName?: string;
}

export default function PageCard({ pageNumber, content, bookTitle, chapterName }: PageCardProps) {
  return (
    <div 
      className="bg-card border border-card-border shadow-lg mx-auto"
      style={{
        width: 'min(210mm, 100%)', // Responsive width with max of A4
        minHeight: '297mm', // A4 height
        maxWidth: '210mm',
      }}
      data-testid={`page-card-${pageNumber}`}
    >
      {/* Page Header - like real book pages */}
      <div className="flex items-center justify-between px-6 md:px-8 pt-4 md:pt-6 pb-3 md:pb-4 border-b border-border/30">
        <span className="text-xs text-muted-foreground font-medium truncate max-w-[30%]">
          {bookTitle}
        </span>
        <span className="text-xs text-muted-foreground font-semibold">
          {pageNumber}
        </span>
        {chapterName && (
          <span className="text-xs text-muted-foreground font-medium truncate max-w-[30%]">
            {chapterName}
          </span>
        )}
      </div>

      {/* Page Content */}
      <div 
        className="px-6 md:px-8 py-6 md:py-8 text-base md:text-lg font-arabic leading-loose md:leading-loose text-right"
        style={{
          minHeight: 'calc(297mm - 70px)', // Full page minus header
          wordBreak: 'keep-all',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'normal',
        }}
        dir="rtl"
        data-testid="text-content"
      >
        {content}
      </div>
    </div>
  );
}
