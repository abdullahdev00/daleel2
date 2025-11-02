import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Minus, Plus } from "lucide-react";
import { useHadithSettings } from "@/contexts/HadithSettingsContext";

interface HadithSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HadithSettingsSheet({ open, onOpenChange }: HadithSettingsSheetProps) {
  const {
    settings,
    incrementArabicFontSize,
    decrementArabicFontSize,
    incrementTranslationFontSize,
    decrementTranslationFontSize,
    toggleArabic,
    toggleTranslation,
  } = useHadithSettings();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Hadith Settings</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Display Options</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-arabic" className="text-sm">Show Arabic Text</Label>
              <Switch
                id="show-arabic"
                checked={settings.showArabic}
                onCheckedChange={toggleArabic}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-translation" className="text-sm">Show Translation</Label>
              <Switch
                id="show-translation"
                checked={settings.showTranslation}
                onCheckedChange={toggleTranslation}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Font Sizes</h3>
            
            <div className="space-y-2">
              <Label className="text-sm">Arabic Font Size</Label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementArabicFontSize}
                  className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  aria-label="Decrease Arabic font size"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center text-sm font-medium">
                  {settings.arabicFontSize}px
                </span>
                <button
                  onClick={incrementArabicFontSize}
                  className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  aria-label="Increase Arabic font size"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Translation Font Size</Label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementTranslationFontSize}
                  className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  aria-label="Decrease translation font size"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center text-sm font-medium">
                  {settings.translationFontSize}px
                </span>
                <button
                  onClick={incrementTranslationFontSize}
                  className="w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  aria-label="Increase translation font size"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
