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
import { MASTER_DATA_TYPE, MASTERDATA_PER_PAGE } from "@/lib/constants";
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
import AddBlogTagsData from "./add-blog-tags-data";

type Props = {
  data: MasterDataOption[];
};

export default function BlogTagsField({ data }: Props) {
  const dispatch = useDispatch();
  const [openBlogTag, setOpenBlogTag] = useState<boolean>(false);
  const [blogTagData, setBlogTagData] = useState<MasterDataOption[]>(data);
  const [blogTags, setBlogTags] = useState<MasterDataOption[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [confirmVal, setConfirmVal] = useState(false);

  useEffect(() => {
    if (data) {
      setBlogTagData(data);
    }
  }, [data]);

  useEffect(() => {
    if (
      page &&
      blogTagData &&
      blogTagData.length &&
      blogTagData.length > MASTERDATA_PER_PAGE
    ) {
      setBlogTags(
        getPaginatedMasterData(blogTagData, page, MASTERDATA_PER_PAGE)
      );
    } else {
      setBlogTags(blogTagData);
    }
  }, [page, blogTagData]);

  useEffect(() => {
    if (data && data.length) {
      if (search) {
        setBlogTagData(
          data.filter(
            (item) =>
              item.label.toLowerCase().includes(search.toLowerCase()) ||
              item.value.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        setBlogTagData(data);
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
        await deleteMasterRecord(
          MASTER_DATA_TYPE.BLOG_TAGS,
          idToDelete,
          controller
        );
        setBlogTagData((prev) => prev.filter((tag) => tag._id !== idToDelete));
        showSuccessToast("Blog Tag deleted successfully.");
      } catch (e: unknown) {
        console.log(getErrorMessage(e as AxiosError));
        showErrorToast("Error while deleting Blog Tag.");
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
          <h2>Blog Tags</h2>
        </div>
        <div className="basis-2/4 relative">
          <Input
            placeholder="Search a blog tag"
            className="h-8 border-black/10 rounded-lg pr-8"
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
            onClick={() => setOpenBlogTag(true)}
          >
            <CirclePlusIcon /> Add
          </Button>
        </div>
      </div>

      <Table className="mb-4 rounded-lg table-auto w-full">
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
            <TableHead className="text-left font-semibold text-slate-700 py-2 px-3 sm:px-6 text-xs sm:text-sm">
              Blog Tag Label
            </TableHead>
            <TableHead className="text-left font-semibold text-slate-700 py-2 px-3 sm:px-6 text-xs sm:text-sm">
              Blog Tag Value
            </TableHead>
            <TableHead className="text-right w-20 font-semibold text-slate-700 py-2 px-3 sm:px-6 text-xs sm:text-sm">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogTags.length ? (
            blogTags.map((data, index) => (
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
        total={blogTagData.length}
        perPage={MASTERDATA_PER_PAGE}
        pageChange={setPage}
      />

      <CustomDialog
        title="Add a new blog tag"
        open={openBlogTag}
        onclose={(open: boolean) => setOpenBlogTag(open)}
        className="max-w-[400px]"
      >
        <AddBlogTagsData
          onAdd={(data) => {
            setBlogTagData((prev) => [...prev, data]);
          }}
          onClose={() => setOpenBlogTag(false)}
        />
      </CustomDialog>

      <CustomDialog
        title="Are you sure you want to delete this blog tag?"
        description="This action cannot be undone and will permanently delete your blog tag."
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
