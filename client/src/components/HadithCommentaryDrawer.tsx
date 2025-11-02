import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HadithCommentaryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hadithNumber: number;
  book: string;
  commentary?: string;
}

export default function HadithCommentaryDrawer({
  open,
  onOpenChange,
  hadithNumber,
  book,
  commentary,
}: HadithCommentaryDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <DrawerTitle className="text-xl font-semibold">
            Commentary (Sharah)
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              className="w-10 h-10 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 pt-4 pb-2 space-y-2 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Hadith:</span>
            <span className="font-semibold text-foreground">
              {book} #{hadithNumber}
            </span>
          </div>
        </div>

        <ScrollArea className="h-[500px]">
          <div className="px-4 pt-4 pb-6">
            {commentary ? (
              <p className="text-base leading-relaxed text-foreground">{commentary}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Commentary for this hadith is not available at the moment.
              </p>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
