"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getUserEnquiries } from "@/lib/api-routes/api-user";
import { getErrorMessage, getStatusColor, showErrorToast } from "@/lib/helper";
import { OrderEnquiry } from "@/lib/types/user-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function UserEnquiriesList() {
  const dispatch = useDispatch();
  const [enquiries, setEnquiries] = useState<OrderEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchEnquiries = async () => {
      try {
        setIsLoading(true);
        dispatch(showLoader());
        const response = await getUserEnquiries();
        const data: OrderEnquiry[] = response.data?.data;
        setEnquiries(data);
      } catch (error: unknown) {
        showErrorToast(getErrorMessage(error as AxiosError));
      } finally {
        setIsLoading(false);
        dispatch(hideLoader());
      }
    };

    fetchEnquiries();
    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading enquiries...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Inquiries</h2>
        <span className="text-sm text-gray-600">
          {enquiries.length} total inquiries
        </span>
      </div>

      {enquiries.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No enquiries found
          </h3>
          <p className="text-gray-600">
            You haven&apos;t made any enquiries yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <Card
              key={enquiry._id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {enquiry.plantId.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {enquiry.message}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      enquiry.status
                    )} ml-4 px-4 py-2`}
                  >
                    {enquiry.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {formatDate(enquiry.createdAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
