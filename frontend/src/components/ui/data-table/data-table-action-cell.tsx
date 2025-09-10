"use client";
import { DataTableActionType } from "@/lib/types/common-types";
import { Button } from "@/components/ui/button";

interface DataTableActionCellProps {
  actions: DataTableActionType[];
  rowId: string;
}

export function DataTableActionCell({
  actions,
  rowId,
}: DataTableActionCellProps) {
  return (
    <div className="flex items-center gap-2">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          onClick={() => action.action(rowId)}
          className="h-8 w-8 p-0"
        >
          {action.actionIcon}
        </Button>
      ))}
    </div>
  );
}


