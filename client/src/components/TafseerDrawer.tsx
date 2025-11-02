import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TafseerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verseNumber: number;
  surahNumber: number;
}

const TAFSEERS = [
  { id: "ibn-kathir", name: "Tafseer Ibn Kathir" },
  { id: "jalalayn", name: "Tafseer al-Jalalayn" },
  { id: "maarif", name: "Maarif-ul-Quran" },
  { id: "saadi", name: "Tafseer As-Sa'di" },
  { id: "tabari", name: "Tafseer al-Tabari" },
];

export default function TafseerDrawer({
  open,
  onOpenChange,
  verseNumber,
  surahNumber,
}: TafseerDrawerProps) {
  const [selectedTafseer, setSelectedTafseer] = useState("ibn-kathir");

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]" onDoubleClick={() => onOpenChange(false)}>
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border pb-4 pt-4">
          <DrawerTitle className="text-xl font-semibold" data-testid="title-tafseer">
            Tafseer
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              className="w-12 h-12 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
              data-testid="button-close-tafseer"
            >
              <X className="w-6 h-6" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 pt-4 pb-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Select Tafseer:
            </span>
            <Select value={selectedTafseer} onValueChange={setSelectedTafseer}>
              <SelectTrigger className="rounded-lg" data-testid="select-tafseer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TAFSEERS.map((tafseer) => (
                  <SelectItem key={tafseer.id} value={tafseer.id}>
                    {tafseer.name}
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
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <h3 className="font-semibold text-lg mb-3" data-testid="text-tafseer-title">
                    {TAFSEERS.find(t => t.id === selectedTafseer)?.name}
                  </h3>
                  <p className="text-base leading-relaxed text-foreground" data-testid="text-tafseer-content">
                    This is a placeholder for the tafseer content of verse {surahNumber}:{verseNumber}.
                    
                    The tafseer (exegesis/commentary) would provide detailed explanation of the verse's meaning, 
                    context of revelation, historical background, and scholarly interpretations.
                    
                    This feature requires integration with a tafseer database or API to display the actual 
                    commentary from {TAFSEERS.find(t => t.id === selectedTafseer)?.name}.
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground italic">
                  Note: Tafseer content integration coming soon. This will include authentic commentaries 
                  from renowned scholars.
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
