import BottomNavigation from "@/components/BottomNavigation";

export default function Explore() {
  return (
    <div className="min-h-screen bg-background pb-[70px]">
      <div className="px-4 py-8">
        <h1 className="text-2xl font-serif font-semibold text-foreground mb-4">Explore</h1>
        <p className="text-muted-foreground">Discover new content and features</p>
      </div>
      <BottomNavigation />
    </div>
  );
}
