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
}

export function ProductAccordion({
  items,
  onDelete,
  defaultOpen,
  className,
}: ProductAccordionProps) {
  return (
    <div
      className={cn(
        "w-full rounded-xl shadow-sm bg-white ",
        className
      )}
    >
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen || items[0]?.id}
        className="divide-y divide-gray-200 dark:divide-gray-700"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="px-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <div className="flex justify-between items-center">
              <AccordionTrigger>{item.title}</AccordionTrigger>
              {onDelete && typeof item.index === "number" && (
                <Trash2Icon
                  size={18}
                  color="red"
                  className="cursor-pointer mr-2"
                  onClick={() => onDelete(item.index!)}
                />
              )}
            </div>
            <AccordionContent className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-300 pb-4">
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
