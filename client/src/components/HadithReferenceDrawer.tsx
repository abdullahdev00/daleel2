import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HadithReferenceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hadithNumber: number;
  book: string;
  bookArabic?: string;
  chapter: string;
  chapterArabic?: string;
  volume?: string;
  status: string;
  statusRef?: string;
  narrator?: string;
  explanation?: string;
}

export default function HadithReferenceDrawer({
  open,
  onOpenChange,
  hadithNumber,
  book,
  bookArabic,
  chapter,
  chapterArabic,
  volume,
  status,
  statusRef,
  narrator,
  explanation,
}: HadithReferenceDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]" onDoubleClick={() => onOpenChange(false)}>
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-5">
          <DrawerTitle className="text-xl font-semibold">
            Reference Details
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              className="w-12 h-12 rounded-full hover-elevate active-elevate-2 flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <ScrollArea className="h-[500px]">
          <div className="px-4 pt-4 pb-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground">Kitab (Book)</h3>
              <div className="flex flex-col gap-1">
                <p className="text-base text-foreground">{book}</p>
                {bookArabic && (
                  <p className="text-lg font-arabic text-right" dir="rtl">{bookArabic}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground">Baab (Chapter)</h3>
              <div className="flex flex-col gap-1">
                <p className="text-base text-foreground">{chapter}</p>
                {chapterArabic && (
                  <p className="text-lg font-arabic text-right" dir="rtl">{chapterArabic}</p>
                )}
              </div>
            </div>

            {volume && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-muted-foreground">Volume</h3>
                <p className="text-base text-foreground">{volume}</p>
              </div>
            )}

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground">Status</h3>
              <p className="text-base text-foreground">{status}</p>
            </div>

            {statusRef && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-muted-foreground">Status Reference</h3>
                <p className="text-base text-foreground">{statusRef}</p>
              </div>
            )}

            {narrator && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-muted-foreground">Narrator</h3>
                <p className="text-base text-foreground">{narrator}</p>
              </div>
            )}

            {explanation && (
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-muted-foreground">Explanation</h3>
                <p className="text-base text-foreground leading-relaxed">{explanation}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
