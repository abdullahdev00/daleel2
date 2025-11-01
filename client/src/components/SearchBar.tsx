import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ 
  placeholder = "Search books, authors...", 
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
    console.log('Search query:', query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground pointer-events-none" 
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-12 pr-4 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 transition-all"
        data-testid="input-search"
      />
    </form>
  );
}
