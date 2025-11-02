import { ArrowLeft } from "lucide-react";
import { useLocation, useParams } from "wouter";
import PageCard from "@/components/PageCard";
import { useQuery } from "@tanstack/react-query";
import type { Book, BookPage } from "@shared/schema";
import { useState, useRef, useEffect } from "react";

const PageScaleWrapper = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const pageWidthInPixels = 210 * 3.7795275591; // 210mm to pixels (1mm = 3.7795275591px)
        const calculatedScale = Math.min(containerWidth / pageWidthInPixels, 1);
        setScale(calculatedScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const pageHeightInPixels = 297 * 3.7795275591; // 297mm to pixels

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center"
      style={{
        height: `${pageHeightInPixels * scale}px`,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default function BookPagesReader() {
  const { bookId } = useParams();
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const { data: book, isLoading: bookLoading } = useQuery<Book>({
    queryKey: [`/api/books/${bookId}`],
    enabled: !!bookId,
  });

  const { data: pages, isLoading: pagesLoading } = useQuery<BookPage[]>({
    queryKey: [`/api/books/${bookId}/pages`],
    enabled: !!bookId,
  });

  // Scroll to page when clicked from sidebar
  const scrollToPage = (pageNumber: number) => {
    const pageElement = pageRefs.current[pageNumber];
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentPage(pageNumber);
    }
  };

  // Update current page based on scroll position
  useEffect(() => {
    const mainContent = document.getElementById("book-main-content");
    if (!mainContent) return;

    const handleScroll = () => {
      const scrollPosition = mainContent.scrollTop + 100;
      
      if (pages) {
        for (let i = pages.length - 1; i >= 0; i--) {
          const pageElement = pageRefs.current[pages[i].pageNumber];
          if (pageElement && pageElement.offsetTop <= scrollPosition) {
            setCurrentPage(pages[i].pageNumber);
            break;
          }
        }
      }
    };

    mainContent.addEventListener("scroll", handleScroll);
    return () => mainContent.removeEventListener("scroll", handleScroll);
  }, [pages]);

  if (bookLoading || pagesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading book pages...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Book not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      {/* Header - 64px */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="h-16 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setLocation("/library/books")}
            className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">{book.title}</h1>
            <p className="text-sm text-muted-foreground">By {book.author}</p>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Page Selector Sidebar */}
        <div className="hidden lg:block w-64 border-r border-border bg-sidebar overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-2">
            <h2 className="text-sm font-semibold text-foreground mb-4 px-2">Pages</h2>
            {pages && pages.length > 0 ? (
              pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => scrollToPage(page.pageNumber)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    currentPage === page.pageNumber
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-accent text-foreground"
                  }`}
                  data-testid={`sidebar-page-${page.pageNumber}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Page {page.pageNumber}</span>
                    {currentPage === page.pageNumber && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground"></div>
                    )}
                  </div>
                  <p className="text-xs opacity-70 truncate mt-1 line-clamp-2">
                    {page.content.substring(0, 50)}...
                  </p>
                </button>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8 text-sm">
                No pages available
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div 
          id="book-main-content"
          className="flex-1 overflow-y-auto custom-scrollbar bg-muted/30"
        >
          <div className="py-8 px-4 space-y-8">
            {pages && pages.length > 0 ? (
              pages.map((page) => (
                <div
                  key={page.id}
                  ref={(el) => (pageRefs.current[page.pageNumber] = el)}
                  data-testid={`page-container-${page.pageNumber}`}
                >
                  <PageScaleWrapper>
                    <PageCard
                      pageNumber={page.pageNumber}
                      content={page.content}
                      bookTitle={book.title}
                      chapterName="Chapter 1"
                    />
                  </PageScaleWrapper>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No pages available for this book
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
