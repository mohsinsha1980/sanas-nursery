"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Info } from "lucide-react";
import { UserTableDataType } from "@/lib/types/admin-types";
import { ROLES } from "@/lib/constants";

export const columns: ColumnDef<UserTableDataType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <span
          className={`flex gap-x-2  rounded-lg ${
            row.original.role === ROLES.ADMIN
              ? " bg-[var(--color-pink-light)] "
              : ""
          }`}
        >
          {name}
          {row.original.role === ROLES.ADMIN ? (
            <span className="relative flex items-center group ">
              <Info size={17} color="black" className="cursor-pointer" />
              <span
                role="tooltip"
                className="ml-4 absolute z-10 left-full top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gray-300 border"
              >
                Role: Admin
              </span>
            </span>
          ) : null}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span
          className={`flex items-center justify-between gap-x-2  rounded-lg ${
            row.original.role === ROLES.ADMIN
              ? " bg-[var(--color-pink-light)] p-2"
              : ""
          }`}
        >
          {row.original.phone}
        </span>
      );
    },
  },
  {
    accessorKey: "verified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.getValue("verified") === true ? (
        <span className="indicator green"></span>
      ) : (
        <span className="indicator red"></span>
      );
    },
  },
  {
    id: "actions",
    header: ({}) => {
      return (
        <Button variant="ghost" className="px-0 gap-0">
          Actions
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-start gap-3">
          {row.original.actions?.map((item, index) => (
            <Button
              key={`action_${item.actionType}_${index}`}
              type="button"
              variant="link"
              className="p-0"
              onClick={() => item.action(row.original)}
            >
              {item.actionIcon ? item.actionIcon : item.actionType}
            </Button>
          ))}
        </div>
      );
    },
  },
];
