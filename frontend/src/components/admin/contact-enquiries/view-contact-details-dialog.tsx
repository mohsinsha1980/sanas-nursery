"use client";
import CustomDialog from "@/components/layout/Dialog";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeVariant, getStatusColor } from "@/lib/helper";
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
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  #{enquiry._id}
                </h3>
                <Badge
                  variant={getStatusBadgeVariant(enquiry.status)}
                  className={`px-3 py-1.5 text-sm font-bold rounded-full ${getStatusColor(
                    enquiry.status
                  )} shadow-sm`}
                >
                  {enquiry.status.charAt(0).toUpperCase() +
                    enquiry.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Enquiry Date:{" "}
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <h4 className="text-lg font-semibold text-gray-900">
              Contact Information
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Full Name</p>
                  <p className="text-base font-semibold text-gray-900">
                    {enquiry.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Email Address
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    {enquiry.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Phone Number
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    {enquiry.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-3">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-blue-900">
              Contact Message
            </h4>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </p>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
}
