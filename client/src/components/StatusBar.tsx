import { Bell, User } from "lucide-react";

interface StatusBarProps {
  time?: string;
  nextPrayer?: string;
  nextPrayerTime?: string;
  location?: string;
}

export default function StatusBar({
  time = "9:30",
  nextPrayer = "Fajr",
  nextPrayerTime = "05:21",
  location = "Makkah"
}: StatusBarProps) {
  return (
    <div 
      className="sticky top-0 z-50 h-[60px] flex items-center justify-between px-4 border-b"
      style={{ backgroundColor: 'rgba(44, 62, 63, 0.95)' }}
      data-testid="status-bar"
    >
      <div className="flex items-center gap-3 text-sm">
        <span className="text-foreground font-medium" data-testid="text-time">{time}</span>
        <span className="text-muted-foreground">|</span>
        <span className="text-primary-foreground" data-testid="text-prayer-info">
          {nextPrayer} - {nextPrayerTime}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          className="w-8 h-8 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5 text-primary-foreground" />
        </button>
        <button 
          className="w-8 h-8 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
          data-testid="button-profile"
        >
          <User className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs text-muted-foreground" data-testid="text-location">
        {location}
      </div>
    </div>
  );
}
