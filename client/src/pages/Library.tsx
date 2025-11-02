import { BookOpen, Scroll, Library as LibraryIcon } from "lucide-react";
import { useLocation } from "wouter";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";

export default function Library() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background lg:pb-0 pb-[70px]">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="h-16 px-4 py-3 flex items-center">
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Islamic Library
          </h1>
        </div>
      </div>
      
      <div className="px-4 py-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <SearchBar placeholder="Search books, verses, hadiths..." />
          <h2 className="text-lg font-semibold text-foreground mb-4 mt-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CategoryCard
              title="Quran"
              description="Explore verses with translations"
              icon={BookOpen}
              gradient="linear-gradient(135deg, #5A7A6B 0%, #4A6A5B 100%)"
              count={7}
              onClick={() => setLocation("/library/quran")}
            />
            <CategoryCard
              title="Hadith"
              description="Authentic narrations"
              icon={Scroll}
              gradient="linear-gradient(135deg, #C9A96E 0%, #B8985D 100%)"
              count={3}
              onClick={() => setLocation("/library/hadith")}
            />
            <CategoryCard
              title="Books"
              description="Islamic literature"
              icon={LibraryIcon}
              gradient="linear-gradient(135deg, #3D5556 0%, #2F4445 100%)"
              count={2}
              onClick={() => setLocation("/library/books")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
