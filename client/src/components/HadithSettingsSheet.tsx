import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
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
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Hadith Settings</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Display Options</h3>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border">
              <Label htmlFor="show-arabic" className="text-sm font-medium">Show Arabic Text</Label>
              <Switch
                id="show-arabic"
                checked={settings.showArabic}
                onCheckedChange={toggleArabic}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border">
              <Label htmlFor="show-translation" className="text-sm font-medium">Show Translation</Label>
              <Switch
                id="show-translation"
                checked={settings.showTranslation}
                onCheckedChange={toggleTranslation}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Arabic Text Size</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Adjust the size of the Arabic hadith text
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4 border border-border">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={decrementArabicFontSize}
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <div className="text-center">
                <div className="text-2xl font-semibold text-foreground">
                  {settings.arabicFontSize}
                </div>
                <div className="text-xs text-muted-foreground">pixels</div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={incrementArabicFontSize}
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
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <div className="text-center">
                <div className="text-2xl font-semibold text-foreground">
                  {settings.translationFontSize}
                </div>
                <div className="text-xs text-muted-foreground">pixels</div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={incrementTranslationFontSize}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
            <div className="p-5 bg-card rounded-xl border border-card-border space-y-4">
              {settings.showArabic && (
                <p 
                  className="font-arabic text-right leading-loose"
                  style={{ fontSize: `${settings.arabicFontSize}px` }}
                  dir="rtl"
                >
                  إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ
                </p>
              )}
              
              {settings.showArabic && settings.showTranslation && (
                <div className="w-full h-px bg-border" />
              )}
              
              {settings.showTranslation && (
                <p 
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: `${settings.translationFontSize}px` }}
                >
                  Actions are judged by intentions
                </p>
              )}
              
              {!settings.showArabic && !settings.showTranslation && (
                <p className="text-sm text-muted-foreground text-center italic">
                  Enable at least one display option to see preview
                </p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
