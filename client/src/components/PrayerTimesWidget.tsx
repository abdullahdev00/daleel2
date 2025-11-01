import { useState, useEffect } from "react";

interface PrayerTime {
  name: string;
  time: string;
}

interface PrayerTimesWidgetProps {
  location?: string;
  nextPrayer?: string;
  prayerTimes?: PrayerTime[];
}

export default function PrayerTimesWidget({
  location = "Makkah",
  nextPrayer = "Dhuhr",
  prayerTimes = [
    { name: "FAJR", time: "05:21" },
    { name: "DHUHR", time: "12:05" },
    { name: "ASR", time: "04:33" },
    { name: "MAGHRIB", time: "06:36" },
  ]
}: PrayerTimesWidgetProps) {
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 37, seconds: 5 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative h-[280px] rounded-[20px] overflow-hidden"
      style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)' }}
      data-testid="prayer-times-widget"
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#2C3E3F',
          backgroundImage: `linear-gradient(135deg, rgba(44, 62, 63, 0.9) 0%, rgba(61, 85, 86, 0.8) 100%)`,
        }}
      />
      
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-white text-lg font-medium mb-1" data-testid="text-location">{location}</h3>
          <p className="text-secondary-foreground text-sm">Left on {nextPrayer} prayer</p>
        </div>
        
        <div className="text-center">
          <div className="font-mono text-5xl font-bold text-white mb-8" data-testid="text-countdown">
            {String(countdown.hours).padStart(2, '0')} : {String(countdown.minutes).padStart(2, '0')} : {String(countdown.seconds).padStart(2, '0')}
          </div>
        </div>
        
        <div className="flex justify-between gap-2">
          {prayerTimes.map((prayer, index) => (
            <div key={index} className="text-center" data-testid={`prayer-time-${prayer.name.toLowerCase()}`}>
              <div className="text-primary-foreground text-[11px] uppercase font-semibold mb-1 tracking-wide">
                {prayer.name}
              </div>
              <div className="text-white text-sm">{prayer.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
