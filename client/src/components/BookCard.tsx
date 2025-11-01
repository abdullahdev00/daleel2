import { ChevronRight, BookOpen } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  category: string;
  pages: number;
  onClick?: () => void;
}

const categoryGradients: Record<string, string> = {
  Tafseer: 'linear-gradient(135deg, #5A7A6B 0%, #4A6A5B 100%)',
  Hadith: 'linear-gradient(135deg, #C9A96E 0%, #B8985D 100%)',
  Fiqh: 'linear-gradient(135deg, #5B8FA3 0%, #4A7E92 100%)',
  Seerah: 'linear-gradient(135deg, #8B7355 0%, #7A6344 100%)',
};

export default function BookCard({ id, title, author, category, pages, onClick }: BookCardProps) {
  const gradient = categoryGradients[category] || categoryGradients.Tafseer;

  return (
    <div
      className="bg-card border border-card-border rounded-xl p-4 hover-elevate active-elevate-2 cursor-pointer transition-all group"
      onClick={onClick}
      data-testid={`card-book-${id}`}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: gradient }}
        >
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-foreground mb-1 truncate">
            {title}
          </h3>
          <p className="text-sm text-secondary-foreground mb-1">
            By {author}
          </p>
          <p className="text-xs text-muted-foreground">
            {category} • {pages} pages
          </p>
        </div>
        
        <ChevronRight className="w-5 h-5 text-primary-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
