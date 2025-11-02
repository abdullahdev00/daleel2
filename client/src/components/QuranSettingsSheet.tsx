import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useQuranSettings } from "@/contexts/QuranSettingsContext";

interface QuranSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuranSettingsSheet({ open, onOpenChange }: QuranSettingsSheetProps) {
  const {
    settings,
    incrementArabicFontSize,
    decrementArabicFontSize,
    incrementTranslationFontSize,
    decrementTranslationFontSize,
  } = useQuranSettings();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle data-testid="title-settings">Quran Settings</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Arabic Text Size</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Adjust the size of the Arabic Quranic text
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4 border border-border">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={decrementArabicFontSize}
                data-testid="button-decrease-arabic-size"
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <div className="text-center">
                <div className="text-2xl font-semibold text-foreground" data-testid="text-arabic-size">
                  {settings.arabicFontSize}
                </div>
                <div className="text-xs text-muted-foreground">pixels</div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={incrementArabicFontSize}
                data-testid="button-increase-arabic-size"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Translation Text Size</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Adjust the size of the translation text
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4 border border-border">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={decrementTranslationFontSize}
                data-testid="button-decrease-translation-size"
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <div className="text-center">
                <div className="text-2xl font-semibold text-foreground" data-testid="text-translation-size">
                  {settings.translationFontSize}
                </div>
                <div className="text-xs text-muted-foreground">pixels</div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={incrementTranslationFontSize}
                data-testid="button-increase-translation-size"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
            <div className="p-5 bg-card rounded-xl border border-card-border space-y-5">
              <p 
                className="font-arabic text-right leading-loose"
                style={{ fontSize: `${settings.arabicFontSize}px` }}
                dir="rtl"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              
              <div className="w-full h-px bg-border" />
              
              <p 
                className="text-foreground leading-relaxed"
                style={{ fontSize: `${settings.translationFontSize}px` }}
              >
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
