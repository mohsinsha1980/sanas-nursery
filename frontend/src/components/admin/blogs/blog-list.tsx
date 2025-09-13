"use client";

import ConfirmButton from "@/components/common/ConfirmButton";
import { CustomPagination } from "@/components/common/custom-pagination";
import CustomDialog from "@/components/layout/Dialog";
import { Button } from "@/components/ui/button";
import {
  deleteBlog,
  getAllBlogs,
  toggleBlogFeatured,
  toggleBlogStatus,
} from "@/lib/api-routes/api-admin";
import { BLOGS_PER_PAGE } from "@/lib/constants";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { BlogFilterTypes } from "@/lib/types/admin-types";
import {
  BlogDataType,
  PaginationDataType,
  TableDataResponseType,
} from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { CirclePlusIcon, FileText, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BlogFilter from "./blog-filter";
import BlogItem from "./blog-item";
import SkeletonCard from "./skeleton-card";
import AddNew from "../action-buttons/add-new";

const BlogList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [blogsData, setBlogsData] = useState<
    TableDataResponseType<BlogDataType>
  >({
    data: [],
    total: 0,
  });

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [confirmVal, setConfirmVal] = useState(false);
  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    page: 1,
    perPage: BLOGS_PER_PAGE,
  });
  const [filterData, setFilterData] = useState<BlogFilterTypes>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        dispatch(showLoader());
        const response = await getAllBlogs(
          paginationData,
          filterData,
          controller
        );
        console.log(response.data.data.blogs, response.data.data);
        setBlogsData({
          data: response.data.data.blogs,
          total: response.data.data.total,
        });
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") {
          showErrorToast(getErrorMessage(e as AxiosError));
        }
      } finally {
        setIsLoading(false);
        dispatch(hideLoader());
      }
    };

    fetchBlogs();
    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch, paginationData, filterData]);

  const handlePageChange = useCallback((page: number): void => {
    setPaginationData((prev) =>
      prev.page === page ? prev : { ...prev, page }
    );
  }, []);

  const handleFilterChange = useCallback((newFilter: BlogFilterTypes) => {
    setFilterData(newFilter);
    setPaginationData((prev) => ({ ...prev, page: 1 }));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const deleteHandler = async () => {
      try {
        dispatch(showLoader());
        await deleteBlog(idToDelete, controller);
        setIdToDelete("");
        setConfirmVal(false);
        setBlogsData((prev) => ({
          ...prev,
          data: prev.data.filter((blog) => blog._id !== idToDelete),
          total: prev.total - 1,
        }));
        showSuccessToast("Blog deleted successfully.");
      } catch (e: unknown) {
        setIdToDelete("");
        setConfirmVal(false);
        showErrorToast(getErrorMessage(e as AxiosError));
      } finally {
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

  const deleteHandler = useCallback((blogId: string): void => {
    setOpenConfirm(true);
    setIdToDelete(blogId);
  }, []);

  const handleToggleStatus = async (blogId: string) => {
    try {
      dispatch(showLoader());
      const response = await toggleBlogStatus(blogId);
      const updatedBlog = response.data.data;

      setBlogsData((prev) => ({
        ...prev,
        data: prev.data.map((blog) =>
          blog._id === blogId ? { ...blog, status: updatedBlog.status } : blog
        ),
      }));

      showSuccessToast(
        `Blog ${
          updatedBlog.status === "0" ? "activated" : "deactivated"
        } successfully.`
      );
    } catch (e) {
      showErrorToast(getErrorMessage(e as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleToggleFeatured = async (blogId: string) => {
    try {
      dispatch(showLoader());
      const response = await toggleBlogFeatured(blogId);
      const updatedBlog = response.data.data;

      setBlogsData((prev) => ({
        ...prev,
        data: prev.data.map((blog) =>
          blog._id === blogId
            ? { ...blog, featured: updatedBlog.featured }
            : blog
        ),
      }));

      showSuccessToast(
        `Blog ${updatedBlog.featured ? "featured" : "unfeatured"} successfully.`
      );
    } catch (e) {
      showErrorToast(getErrorMessage(e as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  const hasActiveFilters = Object.keys(filterData).length > 0;

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 !px-0">
              Blog Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your blog posts, create content, and engage with your
              audience.
            </p>
          </div>

          <AddNew
            label="Blog"
            onClick={() => router.push("/admin/blogs/add")}
          />
        </div>

        <BlogFilter setFilters={handleFilterChange} />

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>
              Showing {blogsData.data.length} of {blogsData.total} blogs
              {hasActiveFilters && " (filtered)"}
            </span>
          </div>
        </div>

        {isLoading ? (
          <SkeletonCard />
        ) : blogsData.data.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {hasActiveFilters ? "No blogs found" : "No blogs yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {hasActiveFilters
                ? "Try adjusting your filters to see more results."
                : "Get started by creating your first blog post."}
            </p>
            {!hasActiveFilters && (
              <Button
                onClick={() => router.push("/admin/blogs/add")}
                variant="orange"
                size="sm"
              >
                <CirclePlusIcon />
                Create Your First Blog
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsData.data.map((blog) => (
              <BlogItem
                key={blog._id}
                blog={blog}
                onDelete={deleteHandler}
                onToggleStatus={handleToggleStatus}
                onToggleFeatured={handleToggleFeatured}
              />
            ))}
          </div>
        )}

        {blogsData?.total / paginationData?.perPage > 1 ? (
          <CustomPagination
            total={blogsData.total}
            perPage={paginationData.perPage}
            pageChange={handlePageChange}
          />
        ) : null}
      </div>

      <CustomDialog
        title="Are you sure you want to delete this blog?"
        description="This action cannot be undone and will permanently delete your blog."
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

export default BlogList;
