import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function SaveButton({ className, type = "submit" }: Props) {
  return (
    <Button
      variant="orange"
      size="sm"
      type={type}
      className={cn("w-full sm:w-auto", className)}
    >
      <Save /> Save
    </Button>
  );
}
