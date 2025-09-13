import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function AddNew({
  label,
  onClick,
  className,
  type = "button",
}: Props) {
  return (
    <Button
      variant="orange"
      size="sm"
      type={type}
      className={cn("w-full sm:w-auto", className)}
      onClick={onClick}
    >
      <CirclePlusIcon /> Add New {label ? label : ""}
    </Button>
  );
}
