import { ArrowLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Book } from "@shared/schema";

export default function BooksLibrary() {
  const [, setLocation] = useLocation();

  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setLocation("/library")}
            className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Islamic Books</h1>
            <p className="text-sm text-muted-foreground">Browse our collection</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-6 space-y-3 max-w-4xl mx-auto">
        {books?.map((book) => (
          <div
            key={book.id}
            onClick={() => setLocation(`/library/books/${book.id}`)}
            className="bg-card border border-card-border rounded-xl p-5 hover-elevate active-elevate-2 cursor-pointer transition-all"
            data-testid={`book-${book.id}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-secondary-foreground mb-2">
                  By {book.author}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{book.category}</span>
                  <span>•</span>
                  <span>{book.totalPages} pages</span>
                  <span>•</span>
                  <span>{book.language}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-primary-foreground flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
