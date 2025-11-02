import { useBookSettings } from "@/contexts/BookSettingsContext";

interface PageCardProps {
  pageNumber: number;
  content: string;
  bookTitle: string;
  chapterName?: string;
}

export default function PageCard({ pageNumber, content, bookTitle, chapterName }: PageCardProps) {
  const { settings } = useBookSettings();

  return (
    <div 
      className="bg-card border border-card-border shadow-lg"
      style={{
        width: '210mm',
        height: '297mm',
      }}
      data-testid={`page-card-${pageNumber}`}
    >
      {/* Page Header - like real book pages */}
      <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-border/30">
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
        className="px-8 py-8 font-arabic leading-loose text-right"
        style={{
          height: 'calc(297mm - 70px)',
          fontSize: `${settings.fontSize}px`,
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
