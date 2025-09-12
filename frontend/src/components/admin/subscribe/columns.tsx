"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { SubscriptionTableDataType } from "@/lib/types/admin-types";

export const columns: ColumnDef<SubscriptionTableDataType>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "createdDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="p-2">
            {row.getValue("createdDate")}
        </div>
      );
    },
  },
];
