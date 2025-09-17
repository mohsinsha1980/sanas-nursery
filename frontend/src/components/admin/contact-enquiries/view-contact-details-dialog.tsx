"use client";
import CustomDialog from "@/components/layout/Dialog";
import { Badge } from "@/components/ui/badge";
import {
  getFormattedDate,
  getStatusBadgeVariant,
  getStatusColor,
} from "@/lib/helper";
import { ContactEnquiryDataType } from "@/lib/types/admin-types";
import { Calendar, Mail, MessageSquare, Phone, User } from "lucide-react";

interface ViewContactDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry: ContactEnquiryDataType | null;
}

export default function ViewContactDetailsDialog({
  isOpen,
  onClose,
  enquiry,
}: ViewContactDetailsDialogProps) {
  if (!enquiry) return null;

  return (
    <CustomDialog
      title="Contact Enquiry Details"
      open={isOpen}
      onclose={() => onClose()}
      className="max-w-4xl"
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 sm:p-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center">
                <MessageSquare className="w-6 h-6 sm:w-10 sm:h-10 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 truncate mb-2">
                #{enquiry._id}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">
                    {getFormattedDate(enquiry.createdAt)}
                  </span>
                </div>
                <Badge
                  variant={getStatusBadgeVariant(enquiry.status)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-bold rounded-full ${getStatusColor(
                    enquiry.status
                  )} shadow-sm`}
                >
                  {enquiry.status.charAt(0).toUpperCase() +
                    enquiry.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <h4 className="text-base sm:text-lg font-semibold text-gray-900">
              Contact Information
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Full Name
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                    {enquiry.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Email Address
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                    {enquiry.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Phone Number
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 break-words">
                    {enquiry.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 mb-2 sm:mb-3">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <h4 className="text-base sm:text-lg font-semibold text-blue-900">
              Contact Message
            </h4>
          </div>
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-blue-100">
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </p>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
}
