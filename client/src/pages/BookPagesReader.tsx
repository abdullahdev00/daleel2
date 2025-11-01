import { ArrowLeft } from "lucide-react";
import { useLocation, useParams } from "wouter";
import PageCard from "@/components/PageCard";
import { useQuery } from "@tanstack/react-query";
import type { Book, BookPage } from "@shared/schema";

export default function BookPagesReader() {
  const { bookId } = useParams();
  const [, setLocation] = useLocation();

  const { data: book, isLoading: bookLoading } = useQuery<Book>({
    queryKey: [`/api/books/${bookId}`],
    enabled: !!bookId,
  });

  const { data: pages, isLoading: pagesLoading } = useQuery<BookPage[]>({
    queryKey: [`/api/books/${bookId}/pages`],
    enabled: !!bookId,
  });

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
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 py-4 flex items-center gap-3">
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
      
      <div className="px-4 py-6 space-y-4 max-w-4xl mx-auto">
        {pages && pages.length > 0 ? (
          pages.map((page) => (
            <PageCard
              key={page.id}
              pageNumber={page.pageNumber}
              content={page.content}
              bookTitle={book.title}
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No pages available for this book
          </div>
        )}
      </div>
    </div>
  );
}
