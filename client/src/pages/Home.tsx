import StatusBar from "@/components/StatusBar";
import HeroSection from "@/components/HeroSection";
import QuickActionCard from "@/components/QuickActionCard";
import PrayerTimesWidget from "@/components/PrayerTimesWidget";
import BottomNavigation from "@/components/BottomNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-[70px]">
      <StatusBar />
      <HeroSection />
      
      <div className="px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <QuickActionCard
            title="Hajj"
            subtitle="Reserve your journey"
            gradient="linear-gradient(135deg, #3A4748 0%, #2C3E3F 100%)"
          />
          <QuickActionCard
            title="Umrah"
            subtitle="Book permit"
            gradient="linear-gradient(135deg, #6B5D4F 0%, #5A4A3A 100%)"
          />
          <QuickActionCard
            title="Noble Rawdah"
            subtitle="Book permit"
            gradient="linear-gradient(135deg, #3D5556 0%, #2F4445 100%)"
          />
        </div>
        
        <PrayerTimesWidget />
      </div>
      
      <BottomNavigation />
    </div>
  );
}
