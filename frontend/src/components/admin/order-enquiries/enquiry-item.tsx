"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getActionColor,
  getNextStatus,
  getPicURL,
  getStatusBadgeVariant,
  getStatusColor,
} from "@/lib/helper";
import { OrderEnquiryDataType } from "@/lib/types/admin-types";
import {
  Calendar,
  Eye,
  MessageSquare,
  Package,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";

interface EnquiryItemProps {
  enquiry: OrderEnquiryDataType;
  onViewDetails: (enquiryId: string) => void;
  onUpdateStatus: (enquiryId: string, newStatus: string) => void;
  showActions?: boolean;
  showStatus?: boolean;
}

export default function EnquiryItem({
  enquiry,
  onViewDetails,
  onUpdateStatus,
  showActions = true,
  showStatus = true,
}: EnquiryItemProps) {
  const nextStatus = getNextStatus(enquiry.status);

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
              {enquiry.plantId?.pictures?.[0] ? (
                <Image
                  src={getPicURL(enquiry.plantId.pictures[0])}
                  alt={enquiry.plantId.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">
              {enquiry.plantId?.title || "N/A"}
            </h3>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500 font-medium">
                {new Date(enquiry.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        {showStatus && (
          <Badge
            variant={getStatusBadgeVariant(enquiry.status)}
            className={`px-3 py-1.5 text-sm font-bold rounded-full ${getStatusColor(
              enquiry.status
            )} shadow-sm self-start sm:self-auto`}
          >
            {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
          </Badge>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">
              Customer Details
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Name</p>
                <p className="text-sm font-semibold text-gray-900">
                  {enquiry.name}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Phone className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Phone</p>
                <p className="text-sm font-semibold text-gray-900">
                  {enquiry.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 sm:p-4 mb-4 flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-600">
              Enquiry Message
            </span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed line-clamp-3">
            {enquiry.message}
          </p>
        </div>
      </div>

      {showActions && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 mt-auto gap-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(enquiry._id)}
              className="flex items-center space-x-2 font-semibold border-gray-300 hover:border-gray-400 hover:bg-gray-50 w-full sm:w-auto justify-center"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </Button>
          </div>

          {nextStatus && (
            <Button
              size="sm"
              onClick={() => onUpdateStatus(enquiry._id, nextStatus.status)}
              className={`flex items-center space-x-2 font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto justify-center ${getActionColor(
                enquiry.status
              )}`}
            >
              <span>{nextStatus.label}</span>
            </Button>
          )}
        </div>
      )}

      {!showActions && (
        <div className="flex items-center justify-center pt-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(enquiry._id)}
            className="flex items-center space-x-2 font-semibold border-gray-300 hover:border-gray-400 hover:bg-gray-50 w-full sm:w-auto justify-center"
          >
            <Eye className="w-5 h-5" />
            <span>View Details</span>
          </Button>
        </div>
      )}
    </div>
  );
}
