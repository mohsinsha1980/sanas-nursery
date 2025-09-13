"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { EnquiryFilterTypes } from "@/lib/types/admin-types";
import { ENQUIRY_STATUS } from "@/lib/constants";
import { getStatusColor } from "@/lib/helper";
import { Filter, X, RotateCcw, Clock, CheckCircle, Circle } from "lucide-react";
import { useEffect, useState } from "react";

interface EnquiryFilterProps {
  setFilters: (filters: EnquiryFilterTypes) => void;
}

const EnquiryFilter = ({ setFilters }: EnquiryFilterProps) => {
  const [status, setStatus] = useState<"pending" | "contacted" | undefined>(
    undefined
  );

  useEffect(() => {
    setFilters({ status });
  }, [status, setFilters]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case ENQUIRY_STATUS.PENDING:
        return "Pending";
      case ENQUIRY_STATUS.CONTACTED:
        return "Contacted";
      default:
        return "All Statuses";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Filter Enquiries
          </h3>
        </div>
        {status && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Active filter:</span>
            <Badge
              variant="secondary"
              className={`${getStatusColor(status)} font-medium`}
            >
              {getStatusLabel(status)}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center sm:flex-row sm:items-end gap-4">
        <div className="flex-1 min-w-[280px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <Select
            value={status || "all"}
            onValueChange={(val) =>
              setStatus(
                val === "all" ? undefined : (val as "pending" | "contacted")
              )
            }
          >
            <SelectTrigger className="h-9 border-gray-300 focus:border-orange-300 focus:ring-orange-300">
              <SelectValue placeholder="All Enquiries">
                {status ? (
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full ${
                        status === "pending" ? "bg-orange-100" : "bg-green-100"
                      }`}
                    >
                      {status === "pending" ? (
                        <Clock className="w-4 h-4 text-orange-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {getStatusLabel(status)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
                      <Circle className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      All Enquiries
                    </span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg rounded-lg">
              <SelectItem
                value="all"
                className="py-3 px-4 rounded-md hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
                    <Circle className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      All Enquiries
                    </span>
                    <span className="text-xs text-gray-500">
                      Show all enquiry types
                    </span>
                  </div>
                </div>
              </SelectItem>
              <SelectItem
                value="pending"
                className="py-3 px-4 rounded-md hover:bg-orange-50 focus:bg-orange-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100">
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      Pending
                    </span>
                    <span className="text-xs text-gray-500">
                      Awaiting response
                    </span>
                  </div>
                </div>
              </SelectItem>
              <SelectItem
                value="contacted"
                className="py-3 px-4 rounded-md hover:bg-green-50 focus:bg-green-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      Contacted
                    </span>
                    <span className="text-xs text-gray-500">
                      Response in progress
                    </span>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 h-9">
          {status && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStatus(undefined)}
              className="h-full"
            >
              <X  />
              Clear Filter
            </Button>
          )}

          <Button
            variant="orange"
            size="sm"
            onClick={() => setStatus(undefined)}
            className="h-full"
          >
            <RotateCcw />
            Reset All
          </Button>
        </div>
      </div>

      {status && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-800 font-medium">
              Showing {getStatusLabel(status)} enquiries only
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryFilter;
