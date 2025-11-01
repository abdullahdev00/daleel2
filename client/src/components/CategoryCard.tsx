import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  count?: number;
  onClick?: () => void;
}

export default function CategoryCard({ 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  count,
  onClick 
}: CategoryCardProps) {
  return (
    <div
      className="relative h-[160px] rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{ background: gradient, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.20)' }}
      onClick={onClick}
      data-testid={`card-category-${title.toLowerCase()}`}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" />
          </div>
          {count !== undefined && (
            <div className="text-white/80 text-sm font-medium">
              {count} items
            </div>
          )}
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
