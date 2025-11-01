import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import ListCard from "@/components/ListCard";
import { useQuery } from "@tanstack/react-query";

interface HadithBookInfo {
  bookName: string;
  totalHadiths: number;
}

export default function HadithBooksList() {
  const [, setLocation] = useLocation();

  const { data: books, isLoading } = useQuery<HadithBookInfo[]>({
    queryKey: ["/api/hadith/books"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading hadith collections...</div>
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
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Hadith Collections</h1>
            <p className="text-sm text-muted-foreground">Select a collection to browse</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books?.map((book, index) => (
            <ListCard
              key={book.bookName}
              number={index + 1}
              title={book.bookName}
              subtitle="Authentic Hadith Collection"
              count={book.totalHadiths}
              countLabel="Hadiths"
              onClick={() => setLocation(`/library/hadith/${encodeURIComponent(book.bookName)}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
