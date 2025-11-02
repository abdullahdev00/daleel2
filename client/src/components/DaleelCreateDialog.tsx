import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDaleel } from "@/contexts/DaleelContext";

interface DaleelCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
}

export default function DaleelCreateDialog({
  open,
  onOpenChange,
  categoryId,
}: DaleelCreateDialogProps) {
  const { addDaleel } = useDaleel();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (name.trim() && categoryId) {
      addDaleel(name.trim(), description.trim(), categoryId);
      setName("");
      setDescription("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Daleel
          </DialogTitle>
          <DialogDescription>
            Create a new collection to organize your verses and hadiths
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Daleel Name
            </label>
            <Input
              placeholder="Enter daleel name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description (Optional)
            </label>
            <Textarea
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg min-h-[100px]"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleCreate}
              disabled={!name.trim()}
              className="flex-1 rounded-lg"
            >
              Create Daleel
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setName("");
                setDescription("");
                onOpenChange(false);
              }}
              className="flex-1 rounded-lg"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
