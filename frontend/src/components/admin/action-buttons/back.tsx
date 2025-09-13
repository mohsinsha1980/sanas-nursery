import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onClick: () => void;
  className?: string;
};

export default function BackButton({ onClick, className }: Props) {
  return (
    <Button
      variant="orange"
      size="sm"
      type="button"
      className={cn("w-full sm:w-auto mr-4", className)}
      onClick={onClick}
    >
      <ArrowLeft /> Back
    </Button>
  );
}
