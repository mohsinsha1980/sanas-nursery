"use client";
import { CustomPagination } from "@/components/common/custom-pagination";
import {
  getInCompOrderEnquiries,
  updateOrderEnquiryStatus,
} from "@/lib/api-routes/api-admin";
import { ENQUIRY_STATUS, PLANTS_PER_PAGE } from "@/lib/constants";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import {
  EnquiryFilterTypes,
  OrderEnquiryDataType,
} from "@/lib/types/admin-types";
import {
  PaginationDataType,
  TableDataResponseType,
} from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import axios, { AxiosError } from "axios";
import { MessageSquare } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import OrderEnquiryFilter from "./order-enquiry-filter";
import EnquiryItem from "./enquiry-item";
import ViewDetailsDialog from "./view-details-dialog";

const PendingOrderEnquiries = () => {
  const dispatch = useDispatch();
  const [enquiriesData, setEnquiriesData] = useState<
    TableDataResponseType<OrderEnquiryDataType>
  >({ data: [], total: 0 });

  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    page: 1,
    perPage: PLANTS_PER_PAGE,
  });
  const [filters, setFilters] = useState<EnquiryFilterTypes>({
    status: undefined,
  });
  const [openView, setOpenView] = useState<boolean>(false);
  const [viewData, setViewData] = useState<OrderEnquiryDataType | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const getAllEnquiries = async () => {
      try {
        dispatch(showLoader());
        const response = await getInCompOrderEnquiries(
          paginationData,
          filters.status as "pending" | "contacted" | undefined,
          controller
        );

        setEnquiriesData({
          data: response.data.data.enquiries,
          total: response.data.data.total,
        });
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (!e.name || e.name !== "CanceledError") {
            showErrorToast(getErrorMessage(e as AxiosError));
          }
        }
      } finally {
        dispatch(hideLoader());
      }
    };

    getAllEnquiries();
    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch, paginationData, filters]);

  const viewHandler = (_id: string): void => {
    const found = enquiriesData.data.find((e) => e._id === _id) || null;
    setViewData(found);
    setOpenView(true);
  };

  const updateStatusHandler = async (enquiryId: string, newStatus: string) => {
    try {
      dispatch(showLoader());
      await updateOrderEnquiryStatus(
        enquiryId,
        newStatus as "contacted" | "resolved"
      );

      if (newStatus === ENQUIRY_STATUS.RESOLVED) {
        setEnquiriesData((prevState) => ({
          ...prevState,
          data: prevState.data.filter((item) => item._id !== enquiryId),
          total: prevState.total - 1,
        }));
      } else {
        setEnquiriesData((prevState) => ({
          ...prevState,
          data: prevState.data.map((item) =>
            item._id === enquiryId
              ? { ...item, status: newStatus as typeof item.status }
              : item
          ),
        }));
      }

      showSuccessToast(`Enquiry marked as ${newStatus}.`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        showErrorToast(getErrorMessage(e as AxiosError));
      }
    } finally {
      dispatch(hideLoader());
    }
  };

  const handlePageChange = useCallback((page: number): void => {
    console.log(1);
    setPaginationData((prev) =>
      prev.page === page ? prev : { ...prev, page }
    );
  }, []);

  return (
    <>
      <div>
        {/* <div className="mb-6">
          <OrderEnquiryFilter setFilters={setFilters} />
        </div> */}

        <div>
          {enquiriesData.data?.length ? (
            <>
              <div className="mb-6">
                <OrderEnquiryFilter setFilters={setFilters} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {enquiriesData.data.map((enquiry) => (
                  <EnquiryItem
                    key={enquiry._id}
                    enquiry={enquiry}
                    onViewDetails={viewHandler}
                    onUpdateStatus={updateStatusHandler}
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
                No enquiries found
              </h3>
              <p className="text-gray-600">
                There are no incomplete order enquiries at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      <ViewDetailsDialog
        isOpen={openView}
        onClose={() => setOpenView(false)}
        enquiry={viewData}
      />
    </>
  );
};

export default PendingOrderEnquiries;
