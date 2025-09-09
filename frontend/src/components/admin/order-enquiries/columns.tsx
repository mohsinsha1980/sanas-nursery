"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderEnquiryTableDataType } from "@/lib/types/admin-types";
import { getActionColor, getStatusColor } from "@/lib/helper";
import { EnquiryStatusType } from "@/lib/constants";

export const columnsUnresolved: ColumnDef<OrderEnquiryTableDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string;
      return <div className="text-sm">{phone}</div>;
    },
  },
  {
    accessorKey: "plantTitle",
    header: "Plant",
    cell: ({ row }) => {
      const plantTitle = row.getValue("plantTitle") as string;
      return <div className="text-sm font-medium">{plantTitle}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          className={`${getStatusColor(
            status as EnquiryStatusType
          )} ml-4 px-4 py-2`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const actions = row.original.actions;
      return (
        <div className="flex items-center gap-3">
          {actions.map((action, index) => {
            const isIconOnly = !action.actionLabel && action.actionIcon;

            return isIconOnly ? (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => action.action(row.original._id)}
                className={`${getStatusColor(
                  row.original.status as EnquiryStatusType
                )} ml-4 px-4 py-2 flex items-center justify-center`}
              >
                {action.actionIcon}
              </Button>
            ) : (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => action.action(row.original._id)}
                className={`${getActionColor(
                  row.original.status as EnquiryStatusType
                )} ml-4 px-4 py-2 justify-center flex items-center gap-2 `}
                // className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 hover:text-blue-800 px-3 py-1 rounded-lg text-xs font-medium transition-colors"
              >
                {action.actionIcon && <span>{action.actionIcon}</span>}
                <span>{action.actionLabel}</span>
              </Button>
            );
          })}
        </div>
      );
    },
  },
];

export const columnsResolved: ColumnDef<OrderEnquiryTableDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "plantTitle",
    header: "Plant",
    cell: ({ row }) => {
      const plantTitle = row.getValue("plantTitle") as string;
      const plantPicture = row.original.plantPicture;
      return (
        <div className="flex items-center gap-2">
          {plantPicture && (
            <img
              src={plantPicture}
              alt={plantTitle}
              className="w-8 h-8 rounded object-cover"
            />
          )}
          <span className="text-sm font-medium">{plantTitle}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <div className="text-sm text-gray-600">{email}</div>;
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      const truncatedMessage =
        message.length > 50 ? `${message.substring(0, 50)}...` : message;
      return (
        <div className="text-sm text-gray-600 max-w-xs" title={message}>
          {truncatedMessage}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusVariant = (status: string) => {
        switch (status) {
          case "pending":
            return "secondary";
          case "contacted":
            return "default";
          case "resolved":
            return "success";
          case "closed":
            return "destructive";
          default:
            return "secondary";
        }
      };

      return (
        <Badge
          variant={
            getStatusVariant(status) as
              | "default"
              | "secondary"
              | "destructive"
              | "success"
              | "outline"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <div className="text-sm text-gray-600">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const actions = row.original.actions;
      return (
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => action.action(row.original._id)}
              className="h-8 w-8 p-0"
            >
              {action.actionIcon}
            </Button>
          ))}
        </div>
      );
    },
  },
];
