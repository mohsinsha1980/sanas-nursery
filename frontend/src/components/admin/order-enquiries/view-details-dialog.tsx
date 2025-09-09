"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Package,
  Phone,
  User,
  X,
} from "lucide-react";
import { getPicURL } from "@/lib/helper";
import { getStatusBadgeVariant, getStatusColor } from "@/lib/helper";
import { OrderEnquiryDataType } from "@/lib/types/admin-types";

interface ViewDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry: OrderEnquiryDataType | null;
}

export default function ViewDetailsDialog({
  isOpen,
  onClose,
  enquiry,
}: ViewDetailsDialogProps) {
  if (!enquiry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Enquiry Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-white shadow-md">
                  {enquiry.plantId?.pictures?.[0] ? (
                    <img
                      src={getPicURL(enquiry.plantId.pictures[0])}
                      alt={enquiry.plantId.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {enquiry.plantId?.title || "N/A"}
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

          {/* Customer Information Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h4 className="text-lg font-semibold text-gray-900">
                Customer Information
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Full Name
                    </p>
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
                {enquiry.preferredContactTime && (
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Preferred Contact Time
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        {enquiry.preferredContactTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enquiry Message Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-semibold text-blue-900">
                Enquiry Message
              </h4>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {enquiry.message}
              </p>
            </div>
          </div>

          {enquiry.plantId && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Package className="w-5 h-5 text-gray-600" />
                <h4 className="text-lg font-semibold text-gray-900">
                  Plant Information
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Plant ID</p>
                  <p className="text-base font-semibold text-gray-900">
                    {enquiry.plantId._id}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-6 py-2 font-semibold border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
