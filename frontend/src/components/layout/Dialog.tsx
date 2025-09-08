import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CustomDialog({
  children,
  trigger,
  title,
  description,
  close,
  closeLabel,
  open,
  onclose,
  className = "max-w-4xl",
  disableOutsideClick = false,
}: {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  close?: () => void;
  closeLabel?: string;
  open?: boolean;
  onclose?: (open: boolean) => void;
  className?: string;
  disableOutsideClick?: boolean;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => onclose && onclose(open)}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={className ? className : ""}
        onPointerDownOutside={(e) => {
          if (disableOutsideClick) e.preventDefault();
        }}
      >
        <DialogHeader>
          {title ? <DialogTitle>{title}</DialogTitle> : null}
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        {close ? (
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={close}>
                {closeLabel}
              </Button>
            </DialogClose>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
