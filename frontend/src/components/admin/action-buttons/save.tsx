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
      size="default"
      type={type}
      className={cn("sm:w-auto", className)}
    >
      <Save /> Save
    </Button>
  );
}
