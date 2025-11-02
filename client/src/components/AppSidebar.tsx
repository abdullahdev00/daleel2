import { Home, BookOpen, Settings, Menu, Bookmark } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Home",
    icon: Home,
    path: "/",
  },
  {
    title: "Library",
    icon: BookOpen,
    path: "/library",
  },
  {
    title: "Daleel",
    icon: Bookmark,
    path: "/daleel",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleDoubleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }

    const now = Date.now();
    if (now - lastClickTime < 300) {
      const sidebar = document.querySelector('[data-sidebar="sidebar"]');
      if (sidebar) {
        const closeButton = sidebar.querySelector('[data-sidebar="close"]');
        if (closeButton instanceof HTMLElement) {
          closeButton.click();
        }
      }
    }
    setLastClickTime(now);
  };

  return (
    <Sidebar className="border-r border-border bg-background" onClick={handleDoubleClick}>
      <SidebarContent className="p-0">
        <div className="px-3 py-4 border-b border-border">
          <button className="w-10 h-10 rounded-lg hover:bg-accent flex items-center justify-center transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      onClick={() => setLocation(item.path)}
                      data-testid={`sidebar-${item.title.toLowerCase()}`}
                      className="h-auto p-0"
                    >
                      <div 
                        className={`
                          flex flex-col items-center gap-2 py-4 px-3 cursor-pointer transition-all
                          ${isActive 
                            ? 'bg-accent text-foreground' 
                            : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                          }
                        `}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
