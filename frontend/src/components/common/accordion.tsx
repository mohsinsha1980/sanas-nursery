"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";

type AccordionItemType = {
  id: string;
  title: string;
  content: string[];
  index: number;
};

interface ProductAccordionProps {
  items: AccordionItemType[];
  onDelete?: (index: number) => void;
  defaultOpen?: string;
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  disableContentTopBorder?: boolean;
  outerBoder?: boolean;
}

export function ProductAccordion({
  items,
  onDelete,
  defaultOpen,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
  disableContentTopBorder,
  outerBoder,
}: ProductAccordionProps) {
  return (
    <div className={cn("w-full rounded-lg", className)}>
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen}
        className="space-y-4"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={cn(
              "px-4 transition-colors bg-white rounded-lg",
              outerBoder ? "border border-gray-300 " : " border-none",
              itemClassName
            )}
          >
            <div className="flex items-center">
              {/* Question with chevron icon at the right edge */}
              <AccordionTrigger
                className={cn(
                  "flex-1 text-[18px] font-semibold text-gray-800 hover:no-underline justify-between py-2!",
                  triggerClassName
                )}
              >
                {item.title}
              </AccordionTrigger>

              {/* Delete icon stays outside */}
              {onDelete && typeof item.index === "number" && (
                <Trash2Icon
                  size={18}
                  color="red"
                  className="cursor-pointer "
                  onClick={() => onDelete(item.index!)}
                />
              )}
            </div>

            {/* Answer */}
            <AccordionContent
              className={cn(
                "flex flex-col gap-3 text-[18px] font-medium text-gray-800 dark:text-gray-300 pb-4 mt-2 pt-3",
                disableContentTopBorder
                  ? undefined
                  : "border-t border-gray-300",
                contentClassName
              )}
            >
              {item.content.map((text, index) => (
                <p key={index} className="leading-relaxed">
                  {text}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
