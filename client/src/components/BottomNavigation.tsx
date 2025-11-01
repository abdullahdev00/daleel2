import { Home, BookOpen, Settings } from "lucide-react";
import { useLocation } from "wouter";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Library", path: "/library" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-[70px] border-t z-50 bg-sidebar"
      style={{ borderTopColor: '#3A4748' }}
      data-testid="bottom-navigation"
    >
      <div className="h-full flex items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
