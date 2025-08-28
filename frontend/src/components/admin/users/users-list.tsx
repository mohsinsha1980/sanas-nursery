"use client";
import { CustomPagination } from "@/components/common/custom-pagination";
import CustomDialog from "@/components/layout/Dialog";
import Loading from "@/components/layout/Loading";
import { DataTable } from "@/components/ui/data-table/data-table";
import { getUsers } from "@/lib/api-routes/api-admin";
import { ACTION_TYPES } from "@/lib/constants";
import { getErrorMessage, showErrorToast } from "@/lib/helper";
import { UserTableDataType } from "@/lib/types/admin-types";
import {
  PaginationDataType,
  TableDataResponseType,
} from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { Eye } from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { columns } from "./columns";
import UserDetails from "./user-details";

export default function UsersList() {
  const dispatch = useDispatch();
  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    page: 1,
    perPage: 10,
  });
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const [data, setData] = useState<TableDataResponseType<UserTableDataType>>({
    data: [],
    total: 0,
  });
  const [userDetails, setUserDetails] = useState<UserTableDataType>();

  const handlePageChange = useCallback((page: number): void => {
    setPaginationData((prev) =>
      prev.page === page ? prev : { ...prev, page }
    );
  }, []);

  const viewHandler = useCallback((user: UserTableDataType): void => {
    setUserDetails(user);
    setOpenStatus(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchAllUsers = async () => {
      try {
        dispatch(showLoader());
        const response = await getUsers(paginationData, controller);
        const allUsers: UserTableDataType[] = response?.data?.data?.users.map(
          (user: UserTableDataType) => ({
            _id: user._id,
            phone: user.phone || "",
            verified: user.isVerified,
            name: user.name || "-----",
            role: user.role,
            email: user.email || "-----",
            actions: [
              {
                actionType: ACTION_TYPES.VIEW,
                actionIcon: <Eye size={16} strokeWidth={1.5} color="green" />,
                action: (selectedUser: UserTableDataType) =>
                  viewHandler(selectedUser),
              },
            ],
          })
        );
        setData({
          data: allUsers,
          total: response?.data?.data?.totalCount,
        });
      } catch (e) {
        showErrorToast(getErrorMessage(e as AxiosError));
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchAllUsers();
    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch, paginationData, viewHandler]);

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

      {userDetails ? (
        <CustomDialog
          title="User Detail"
          open={openStatus}
          onclose={(open: boolean) => setOpenStatus(open)}
          className="max-w-[500px]"
        >
          <UserDetails user={userDetails} />
        </CustomDialog>
      ) : null}
    </Suspense>
  );
}
