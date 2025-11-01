import { Plus } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  gradient: string;
  onClick?: () => void;
}

export default function QuickActionCard({ title, subtitle, gradient, onClick }: QuickActionCardProps) {
  return (
    <div
      className="relative h-[120px] rounded-2xl p-5 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{ background: gradient, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.20)' }}
      onClick={onClick}
      data-testid={`card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-end">
          <button 
            className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover-elevate active-elevate-2"
            data-testid="button-add"
          >
            <Plus className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
        <div>
          <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
