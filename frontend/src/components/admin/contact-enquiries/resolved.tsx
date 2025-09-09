"use client";
import { CustomPagination } from "@/components/common/custom-pagination";
import { getCompContactEnquiries } from "@/lib/api-routes/api-admin";
import { PLANTS_PER_PAGE } from "@/lib/constants";
import { getErrorMessage, showErrorToast } from "@/lib/helper";
import { ContactEnquiryDataType } from "@/lib/types/admin-types";
import {
  PaginationDataType,
  TableDataResponseType,
} from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import axios, { AxiosError } from "axios";
import { MessageSquare } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContactEnquiryItem from "./contact-enquiry-item";
import ViewContactDetailsDialog from "./view-contact-details-dialog";

const ResolvedContactEnquiries = () => {
  const dispatch = useDispatch();
  const [enquiriesData, setEnquiriesData] = useState<
    TableDataResponseType<ContactEnquiryDataType>
  >({ data: [], total: 0 });
  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    page: 1,
    perPage: PLANTS_PER_PAGE,
  });
  const [openView, setOpenView] = useState(false);
  const [viewData, setViewData] = useState<ContactEnquiryDataType | null>(null);

  const fetchResolvedEnquiries = useCallback(async () => {
    try {
      dispatch(showLoader());
      const response = await getCompContactEnquiries(paginationData);
      setEnquiriesData({
        data: response.data.data.enquiries,
        total: response.data.data.total,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showErrorToast(getErrorMessage(e as AxiosError));
      }
    } finally {
      dispatch(hideLoader());
    }
  }, [paginationData, dispatch]);

  useEffect(() => {
    fetchResolvedEnquiries();
  }, [fetchResolvedEnquiries]);

  const handlePageChange = useCallback((page: number): void => {
    setPaginationData((prev) =>
      prev.page === page ? prev : { ...prev, page }
    );
  }, []);

  const viewHandler = (enquiryId: string) => {
    const enquiry = enquiriesData.data.find((item) => item._id === enquiryId);
    if (enquiry) {
      setViewData(enquiry);
      setOpenView(true);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          {enquiriesData.data?.length ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {enquiriesData.data.map((enquiry) => (
                  <ContactEnquiryItem
                    key={enquiry._id}
                    enquiry={enquiry}
                    onViewDetails={viewHandler}
                    onUpdateStatus={() => {}}
                    showActions={false}
                    showStatus={false}
                  />
                ))}
              </div>

              {enquiriesData?.total / paginationData?.perPage > 1 ? (
                <div className="mt-6">
                  <CustomPagination
                    total={enquiriesData.total}
                    perPage={paginationData.perPage}
                    pageChange={handlePageChange}
                  />
                </div>
              ) : null}
            </>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No resolved contact enquiries found
              </h3>
              <p className="text-gray-600">
                There are no completed contact enquiries at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      <ViewContactDetailsDialog
        isOpen={openView}
        onClose={() => setOpenView(false)}
        enquiry={viewData}
      />
    </>
  );
};

export default ResolvedContactEnquiries;
