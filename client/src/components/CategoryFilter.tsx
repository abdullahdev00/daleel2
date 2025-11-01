import { useState } from "react";

interface CategoryFilterProps {
  categories?: string[];
  onCategoryChange?: (category: string) => void;
}

export default function CategoryFilter({ 
  categories = ["All", "Tafseer", "Hadith", "Fiqh", "Seerah"],
  onCategoryChange 
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
    console.log('Category selected:', category);
  };

  return (
    <div className="overflow-x-auto scrollbar-hide" data-testid="category-filter">
      <div className="flex gap-2 py-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all rounded-lg ${
              activeCategory === category
                ? 'text-foreground'
                : 'text-muted-foreground hover-elevate'
            } relative`}
            data-testid={`filter-${category.toLowerCase()}`}
          >
            {category}
            {activeCategory === category && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: '#C9A96E' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
