import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DaleelDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  daleelName: string;
  onConfirm: () => void;
}

export default function DaleelDeleteDialog({
  open,
  onOpenChange,
  daleelName,
  onConfirm,
}: DaleelDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px] rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Delete Daleel?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base pt-2">
            Are you sure you want to delete <span className="font-semibold text-foreground">"{daleelName}"</span>? 
            <br /><br />
            All verses and hadiths in this daleel will be permanently removed. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel className="rounded-lg" data-testid="button-cancel-delete">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
            data-testid="button-confirm-delete"
          >
            Delete Daleel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
