import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useBookSettings } from "@/contexts/BookSettingsContext";

interface BookSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookTitle?: string;
}

export default function BookSettingsSheet({ open, onOpenChange, bookTitle }: BookSettingsSheetProps) {
  const {
    settings,
    incrementFontSize,
    decrementFontSize,
    incrementPageScale,
    decrementPageScale,
  } = useBookSettings();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0" onDoubleClick={() => onOpenChange(false)}>
        <SheetHeader className="h-16 flex flex-row items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-background z-10">
          <SheetTitle data-testid="title-settings" className="text-xl">Book Settings</SheetTitle>
          <SheetClose asChild>
            <button className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </SheetClose>
        </SheetHeader>

        <div className="px-4 py-6 space-y-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Text Size</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Adjust the size of the book text
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4 border border-border">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={decrementFontSize}
                data-testid="button-decrease-font-size"
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <div className="text-center">
                <div className="text-2xl font-semibold text-foreground" data-testid="text-font-size">
                  {settings.fontSize}
                </div>
                <div className="text-xs text-muted-foreground">pixels</div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={incrementFontSize}
                data-testid="button-increase-font-size"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Page Zoom</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Adjust the zoom level of book pages
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4 border border-border">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={decrementPageScale}
                data-testid="button-decrease-page-scale"
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <div className="text-center">
                <div className="text-2xl font-semibold text-foreground" data-testid="text-page-scale">
                  {Math.round(settings.pageScale * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">zoom</div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={incrementPageScale}
                data-testid="button-increase-page-scale"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
            <div className="p-5 bg-card rounded-xl border border-card-border space-y-4">
              <div className="text-center text-xs text-muted-foreground mb-2">
                {bookTitle || "Book Page Preview"}
              </div>
              <p 
                className="font-arabic text-right leading-loose"
                style={{ 
                  fontSize: `${settings.fontSize}px`,
                  transform: `scale(${settings.pageScale})`,
                  transformOrigin: 'top right',
                }}
                dir="rtl"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              
              <div className="w-full h-px bg-border" />
              
              <p 
                className="font-arabic text-right leading-relaxed"
                style={{ 
                  fontSize: `${settings.fontSize}px`,
                  transform: `scale(${settings.pageScale})`,
                  transformOrigin: 'top right',
                }}
                dir="rtl"
              >
                الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، وَالصَّلَاةُ وَالسَّلَامُ عَلَىٰ أَشْرَفِ الْأَنْبِيَاءِ وَالْمُرْسَلِينَ
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
