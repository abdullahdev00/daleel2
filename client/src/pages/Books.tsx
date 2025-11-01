import { ArrowLeft } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import BookCard from "@/components/BookCard";
import BottomNavigation from "@/components/BottomNavigation";
import { useLocation } from "wouter";

//todo: remove mock functionality
const mockBooks = [
  {
    id: "1",
    title: "Tafseer Ibn Kathir",
    author: "Imam Ibn Kathir",
    category: "Tafseer",
    pages: 500,
  },
  {
    id: "2",
    title: "Sahih Bukhari",
    author: "Imam Bukhari",
    category: "Hadith",
    pages: 800,
  },
  {
    id: "3",
    title: "Al-Umm",
    author: "Imam Shafi'i",
    category: "Fiqh",
    pages: 650,
  },
  {
    id: "4",
    title: "Riyadh as-Salihin",
    author: "Imam Nawawi",
    category: "Hadith",
    pages: 350,
  },
  {
    id: "5",
    title: "Al-Raheeq Al-Makhtum",
    author: "Safi-ur-Rahman Mubarakpuri",
    category: "Seerah",
    pages: 420,
  },
  {
    id: "6",
    title: "Tafseer As-Sa'di",
    author: "Abdur-Rahman As-Sa'di",
    category: "Tafseer",
    pages: 480,
  },
];

export default function Books() {
  const [, setLocation] = useLocation();

  const handleBookClick = (bookId: string) => {
    setLocation(`/books/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => setLocation("/")}
            className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">Al-Kutub Library</h1>
        </div>
        
        <div className="px-4 pb-4">
          <SearchBar />
        </div>
        
        <div className="px-4 border-b border-border">
          <CategoryFilter />
        </div>
      </div>
      
      <div className="px-4 py-4 space-y-3">
        {mockBooks.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            onClick={() => handleBookClick(book.id)}
          />
        ))}
      </div>
      
      <BottomNavigation />
    </div>
  );
}
