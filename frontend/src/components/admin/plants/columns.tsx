"use client";
import { Button } from "@/components/ui/button";
import { STATUS } from "@/lib/helper";
import { PlantTableDataType } from "@/lib/types/admin-types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<PlantTableDataType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plant Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.title || "";
      const picture = row.original.picture;

      return (
        <Link
          href={`/categories/${row.original.categorySlug}/${row.original.slug}/${row.original._id}`}
        >
          <div className="flex items-center gap-2 p-2">
            <Image
              src={picture}
              alt={name}
              width={50}
              height={50}
              className="rounded-sm"
            />
            <span>{name}</span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.getValue("category")}</span>;
    },
  },
  {
    accessorKey: "plantId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plant ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.getValue("plantId")}</span>;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 gap-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === STATUS.ACTIVE ? (
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
        <div className="flex justify-start gap-3 cursor-pointer">
          {row.original.actions?.map((item, index) => (
            <Button
              key={`action_${item.actionType}_${index}`}
              type="button"
              variant="link"
              className="p-0"
              onClick={() => item.action(row.original.plantId)}
            >
              {item.actionIcon ? item.actionIcon : item.actionType}
            </Button>
          ))}
        </div>
      );
    },
  },
];
