"use client";
import Loading from "@/components/layout/Loading";
import {
  getErrorMessage,
  getFormattedDate,
  showErrorToast,
} from "@/lib/helper";
import {
  SubscribersDataType,
  SubscriptionTableDataType,
} from "@/lib/types/admin-types";
import {
  PaginationDataType,
  TableDataResponseType,
} from "@/lib/types/common-types";
import { hideLoader } from "@/redux/uiSlice";
import axios, { AxiosError } from "axios";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { columns } from "./columns";
import { getSubscription } from "@/lib/api-routes/api-admin";
import { CustomPagination } from "@/components/common/custom-pagination";
import { DataTable } from "@/components/ui/data-table/data-table";

export default function SubscriptionList() {
  const dispatch = useDispatch();
  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    page: 1,
    perPage: 10,
  });

  const [data, setData] = useState<
    TableDataResponseType<SubscriptionTableDataType>
  >({
    data: [],
    total: 0,
  });

  const handlePageChange = useCallback((page: number): void => {
    setPaginationData((prev) =>
      prev.page === page ? prev : { ...prev, page }
    );
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getSubscribers = async () => {
      try {
        const response = await getSubscription(paginationData, controller);

        const allSubscribers: SubscriptionTableDataType[] =
          response.data.data.subscribed.map(
            (subscriber: SubscribersDataType) => ({
              _id: subscriber._id,
              email: subscriber.email,
              createdDate: getFormattedDate(subscriber.createdAt),
            })
          );

        setData({
          data: allSubscribers,
          total: response?.data?.data?.total,
        });
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (!e.name || e.name !== "CanceledError") {
            showErrorToast(getErrorMessage(e as AxiosError));
          }
        }
      }
    };

    getSubscribers();

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch, paginationData]);

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <div className="mb-3">
          <DataTable columns={columns} data={data.data} />
        </div>
        <CustomPagination
          total={data.total}
          perPage={paginationData.perPage}
          pageChange={handlePageChange}
        />
      </div>
    </Suspense>
  );
}
