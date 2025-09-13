import ConfirmButton from "@/components/common/ConfirmButton";
import { CustomPagination } from "@/components/common/custom-pagination";
import CustomDialog from "@/components/layout/Dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteMasterRecord } from "@/lib/api-routes/api-admin";
import { MASTER_DATA_TYPE, PAGINATION } from "@/lib/constants";
import {
  getErrorMessage,
  getPaginatedMasterData,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { MasterDataOption } from "@/lib/types/admin-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { CirclePlusIcon, Trash2Icon, XIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddTagData from "./add-tags-data";

type Props = {
  data: MasterDataOption[];
};

export default function TagsField({ data }: Props) {
  const dispatch = useDispatch();
  const [openTag, setOpenTag] = useState<boolean>(false);
  const [tagData, setTagData] = useState<MasterDataOption[]>(data);
  const [tags, setTags] = useState<MasterDataOption[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [confirmVal, setConfirmVal] = useState(false);

  useEffect(() => {
    if (data) {
      setTagData(data);
    }
  }, [data]);

  useEffect(() => {
    if (
      page &&
      tagData &&
      tagData.length &&
      tagData.length > PAGINATION.PER_PAGE
    ) {
      setTags(getPaginatedMasterData(tagData, page, PAGINATION.PER_PAGE));
    } else {
      setTags(tagData);
    }
  }, [page, tagData]);

  useEffect(() => {
    if (data && data.length) {
      if (search) {
        setTagData(
          data.filter(
            (item) =>
              item.label.toLowerCase().includes(search.toLowerCase()) ||
              item.value.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setTagData(data);
      }
    }
  }, [search, data]);

  const deleteHandler = useCallback((_id: string): void => {
    setOpenConfirm(true);
    setIdToDelete(_id);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const deleteHandler = async () => {
      try {
        dispatch(showLoader());
        await deleteMasterRecord(MASTER_DATA_TYPE.TAGS, idToDelete, controller);
        setTagData((prev) => prev.filter((tag) => tag._id !== idToDelete));
        showSuccessToast("Tag deleted successfully.");
      } catch (e: unknown) {
        console.log(getErrorMessage(e as AxiosError));
        showErrorToast("Error while deleting Tag.");
      } finally {
        setIdToDelete("");
        setConfirmVal(false);
        dispatch(hideLoader());
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
    <div className="pt-5 ">
      <div className="flex flex-row">
        <div className="basis-1/4">
          <h2>Plant Tags</h2>
        </div>
        <div className="basis-2/4 relative">
          <Input
            placeholder="Search a tag"
            className="h-8 border-black/10 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <XIcon
              size="16"
              className="absolute right-2 bottom-1/3 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => setSearch("")}
            />
          )}
        </div>
        <div className="basis-1/4 text-right">
          <Button
            variant={"orange"}
            type="button"
            size="sm"
            onClick={() => setOpenTag(true)}
          >
            <CirclePlusIcon /> Add
          </Button>
        </div>
      </div>

      <Table className="mb-4 rounded-lg table-auto w-full">
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
            <TableHead className="text-left font-semibold text-slate-700 py-2 px-3 sm:px-6 text-xs sm:text-sm">
              Tag Label
            </TableHead>
            <TableHead className="text-left font-semibold text-slate-700 py-2 px-3 sm:px-6 text-xs sm:text-sm">
              Tag Value
            </TableHead>
            <TableHead className="text-right w-20 font-semibold text-slate-700 py-2 px-3 sm:px-6 text-xs sm:text-sm">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.length ? (
            tags.map((data, index) => (
              <TableRow
                key={index}
                className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors duration-150"
              >
                <TableCell className="text-left py-2 px-3 sm:px-6 text-slate-600 text-xs sm:text-sm break-words">
                  {data.label}
                </TableCell>
                <TableCell className="text-left py-2 px-3 sm:px-6 text-slate-600 text-xs sm:text-sm break-words">
                  {data.value}
                </TableCell>
                <TableCell className="text-right py-2 px-3 sm:px-6 text-slate-600 text-xs sm:text-sm break-words">
                  <div className="flex justify-end gap-1">
                    <Trash2Icon
                      size="18"
                      color="red"
                      onClick={() => deleteHandler(data._id)}
                      className="icon_action cursor-pointer"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-left" colSpan={3}>
                No Records added
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomPagination
        total={tagData.length}
        perPage={PAGINATION.PER_PAGE}
        pageChange={setPage}
      />

      <CustomDialog
        title="Add a new tag"
        open={openTag}
        onclose={(open: boolean) => setOpenTag(open)}
        className="max-w-[400px]"
      >
        <AddTagData
          onAdd={(data) => {
            setTagData((prev) => [...prev, data]);
          }}
          onClose={() => setOpenTag(false)}
        />
      </CustomDialog>

      <CustomDialog
        title="Are you sure you want to delete this tag?"
        description="This action cannot be undone and will permanently delete your tag."
        open={openConfirm}
        onclose={(open: boolean) => setOpenConfirm(open)}
        className="max-w-[500px]"
      >
        <ConfirmButton
          handleConfirm={(status) => {
            setOpenConfirm(false);
            setConfirmVal(status);
          }}
        />
      </CustomDialog>
    </div>
  );
}
