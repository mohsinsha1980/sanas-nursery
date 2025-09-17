import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function UpdateButton({
  onClick,
  className,
  type = "submit",
}: Props) {
  return (
    <Button
      variant="orange"
      size="sm"
      type={type}
      className={cn("sm:w-auto", className)}
      onClick={onClick}
    >
      <Edit className="w-4 h-4" /> Update
    </Button>
  );
}
