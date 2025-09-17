import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onClick: () => void;
  className?: string;
};

export default function CancelButton({ onClick, className }: Props) {
  return (
    <Button
      variant="outline"
      size="default"
      type="button"
      className={cn("w-auto mr-4", className)}
      onClick={onClick}
    >
      <X /> Cancel
    </Button>
  );
}
