"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getActionColor,
  getNextStatus,
  getStatusBadgeVariant,
  getStatusColor,
} from "@/lib/helper";
import { ContactEnquiryDataType } from "@/lib/types/admin-types";
import { Calendar, Eye, Mail, MessageSquare, Phone, User } from "lucide-react";

interface ContactEnquiryItemProps {
  enquiry: ContactEnquiryDataType;
  onViewDetails: (enquiryId: string) => void;
  onUpdateStatus: (enquiryId: string, newStatus: string) => void;
  showActions?: boolean;
  showStatus?: boolean;
}

export default function ContactEnquiryItem({
  enquiry,
  onViewDetails,
  onUpdateStatus,
  showActions = true,
  showStatus = true,
}: ContactEnquiryItemProps) {
  const nextStatus = getNextStatus(enquiry.status);

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-1">
              #{enquiry._id}
            </h4>
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
            )} shadow-sm`}
          >
            {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
          </Badge>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">
              Contact Details
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <Mail className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="text-sm font-semibold text-gray-900">
                  {enquiry.email}
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

        <div className="bg-blue-50 rounded-lg p-4 mb-4 flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">
              Contact Message
            </span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed line-clamp-3">
            {enquiry.message}
          </p>
        </div>
      </div>

      {showActions && (
        <div className="flex items-center justify-between pt-2 mt-auto">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(enquiry._id)}
              className="flex items-center space-x-2 font-semibold border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </Button>
          </div>

          {nextStatus && (
            <Button
              size="sm"
              onClick={() => onUpdateStatus(enquiry._id, nextStatus.status)}
              className={`flex items-center space-x-2 font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${getActionColor(
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
            className="flex items-center space-x-2 font-semibold border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </Button>
        </div>
      )}
    </div>
  );
}
