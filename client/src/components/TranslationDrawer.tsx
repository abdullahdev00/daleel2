import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TranslationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verseNumber: number;
  surahNumber: number;
  translation: string;
}

const TRANSLATIONS = [
  { id: "sahih", name: "Sahih International" },
  { id: "pickthall", name: "Pickthall" },
  { id: "yusuf-ali", name: "Yusuf Ali" },
  { id: "shakir", name: "Shakir" },
  { id: "muhsin-khan", name: "Muhsin Khan" },
];

export default function TranslationDrawer({
  open,
  onOpenChange,
  verseNumber,
  surahNumber,
  translation,
}: TranslationDrawerProps) {
  const [selectedTranslation, setSelectedTranslation] = useState("sahih");

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]" onDoubleClick={() => onOpenChange(false)}>
        <DrawerHeader className="h-16 flex flex-row items-center justify-between border-b border-border px-4 py-3">
          <DrawerTitle className="text-xl font-semibold" data-testid="title-translation">
            Translation
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
              data-testid="button-close-translation"
            >
              <X className="w-5 h-5" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 py-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Select Translation:
            </span>
            <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
              <SelectTrigger className="rounded-lg" data-testid="select-translation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TRANSLATIONS.map((trans) => (
                  <SelectItem key={trans.id} value={trans.id}>
                    {trans.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Verse:</span>
            <span className="font-semibold text-foreground">
              {surahNumber}:{verseNumber}
            </span>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="pr-4">
              <p className="text-base leading-relaxed text-foreground" data-testid="text-translation-content">
                {translation}
              </p>
              <p className="text-sm text-muted-foreground mt-4 italic">
                Note: Currently displaying the default translation. Multiple translations feature coming soon.
              </p>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
