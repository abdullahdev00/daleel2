import { Home, Compass, CreditCard, BookOpen, Settings } from "lucide-react";
import { useLocation } from "wouter";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: CreditCard, label: "Card", path: "/card" },
  { icon: BookOpen, label: "Discover", path: "/books" },
  { icon: Settings, label: "Services", path: "/services" },
];

export default function BottomNavigation() {
  const [location] = useLocation();

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-[70px] border-t z-50"
      style={{ backgroundColor: '#242F30', borderTopColor: '#3A4748' }}
      data-testid="bottom-navigation"
    >
      <div className="h-full flex items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <a
              key={item.path}
              href={item.path}
              className="flex flex-col items-center gap-1 py-2 px-3 transition-colors relative"
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <Icon 
                className={`w-6 h-6 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} 
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
              {isActive && (
                <div 
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ backgroundColor: '#C9A96E' }}
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
