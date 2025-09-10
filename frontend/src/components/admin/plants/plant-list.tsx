"use client";
import CustomDialog from "@/components/layout/Dialog";
import { ACTION_TYPES } from "@/lib/constants";
import {
  getErrorMessage,
  getPicURL,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";

import {
  PaginationDataType,
  TableDataResponseType,
} from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import axios, { AxiosError } from "axios";
import { Edit2Icon, Eye, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { columns } from "./columns";
import { deletePlant, getPlants } from "@/lib/api-routes/api-admin";
import { PlantFilterTypes, PlantTableDataType } from "@/lib/types/admin-types";
import PlantFilter from "./plant-filter";
import { CustomPagination } from "@/components/common/custom-pagination";
import { DataTable } from "@/components/ui/data-table/data-table";
import ConfirmButton from "@/components/common/ConfirmButton";

type plantListCategoryType = {
  label: string;
};

export interface plantListType {
  title: string;
  plantId: string;
  status: boolean;
  l1_category: plantListCategoryType;
  l2_category: plantListCategoryType;
  l3_category?: plantListCategoryType;
  pictures: string;
}

const PlantsList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [confirmVal, setConfirmVal] = useState(false);
  const [tableData, setTableData] = useState<
    TableDataResponseType<PlantTableDataType>
  >({ data: [], total: 0 });

  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    page: 1,
    perPage: 20,
  });
  const [filters, setFilters] = useState<PlantFilterTypes>({});

  const editHandler = useCallback(
    (plantId: string): void => {
      router.push(`/admin/plants/edit?plant=${plantId}`);
    },
    [router]
  );

  const deleteHandler = useCallback((plantId: string): void => {
    setOpenConfirm(true);
    setIdToDelete(plantId);
  }, []);

  const viewHandler = useCallback(
    (plantId: string): void => {
      router.push(`/admin/plants/view?plant=${plantId}`);
    },
    [router]
  );

  useEffect(() => {
    const controller = new AbortController();
    const getAllPlants = async () => {
      try {
        dispatch(showLoader());
        const response = await getPlants(filters, paginationData, controller);
        const allPlants = response.data.data.plants.map(
          (plant: plantListType) => ({
            title: plant.title,
            picture: getPicURL(plant.pictures[0]),
            plantId: plant.plantId,
            status: plant.status,
            actions: [
              {
                actionType: ACTION_TYPES.EDIT,
                actionIcon: (
                  <Edit2Icon size={16} strokeWidth={1.5} color="blue" />
                ),
                action: (id: string) => editHandler(id),
              },
              {
                actionType: ACTION_TYPES.DELETE,
                actionIcon: (
                  <Trash2Icon size={16} strokeWidth={1.5} color="red" />
                ),
                action: (id: string) => deleteHandler(id),
              },
              {
                actionType: ACTION_TYPES.VIEW,
                actionIcon: <Eye size={16} strokeWidth={1.5} color="green" />,
                action: (id: string) => viewHandler(id),
              },
            ],
          })
        );

        setTableData({
          data: allPlants,
          total: response.data.data.totalCount,
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

    getAllPlants();

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [
    dispatch,
    paginationData,
    deleteHandler,
    editHandler,
    viewHandler,
    filters,
  ]);

  const handlePageChange = useCallback((page: number): void => {
    setPaginationData((prev) =>
      prev.page === page ? prev : { ...prev, page }
    );
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const deleteHandler = async () => {
      try {
        dispatch(showLoader());
        await deletePlant(idToDelete, controller);
        setIdToDelete("");
        setConfirmVal(false);
        setTableData((prevState) => ({
          ...prevState,
          data: prevState.data.filter((item) => item.plantId !== idToDelete),
          total: prevState.total - 1,
        }));
        showSuccessToast("Plant deleted successfully.");
        dispatch(hideLoader());
      } catch (e: unknown) {
        setIdToDelete("");
        setConfirmVal(false);
        dispatch(hideLoader());
        showErrorToast(getErrorMessage(e as AxiosError));
      }
    };

    if (confirmVal && idToDelete) {
      deleteHandler();
    } else {
      setConfirmVal(false);
    }

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [confirmVal, dispatch, idToDelete]);

  return (
    <>
      <div>
        <PlantFilter setFilters={setFilters} />

        <div>
          <DataTable columns={columns} data={tableData.data} />

          {tableData?.total / paginationData?.perPage > 1 ? (
            <CustomPagination
              total={tableData.total}
              perPage={paginationData.perPage}
              pageChange={handlePageChange}
            />
          ) : null}
        </div>
      </div>

      <CustomDialog
        title="Are you sure you want to delete this plant?"
        description="This action cannot be undone and will permanently delete your plant."
        open={openConfirm}
        onclose={(open: boolean) => setOpenConfirm(open)}
        className="max-w-[500px]"
      >
        <ConfirmButton
          handleConfirm={(status: boolean) => {
            setOpenConfirm(false);
            setConfirmVal(status);
          }}
        />
      </CustomDialog>
    </>
  );
};

export default PlantsList;
