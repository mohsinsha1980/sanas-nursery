"use client";
import ConfirmButton from "@/components/common/ConfirmButton";
import CustomDialog from "@/components/layout/Dialog";
import { deleteTestimonial, getTestimonials } from "@/lib/api-routes/api-admin";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
  STATUS,
} from "@/lib/helper";
import { TestimonialType } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { Edit2Icon, Filter, Quote, Star, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const TestimonialsList = () => {
  const dispatch = useDispatch();
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [confirmVal, setConfirmVal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  useEffect(() => {
    const controller = new AbortController();
    const fetchTestimonials = async () => {
      try {
        dispatch(showLoader());
        const response = await getTestimonials(controller);
        setTestimonials(response.data.data);
      } catch (error: unknown) {
        showErrorToast(getErrorMessage(error as AxiosError));
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchTestimonials();

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch]);

  const deleteHandler = (id: string) => {
    setIdToDelete(id);
    setOpenConfirm(true);
  };

  useEffect(() => {
    const controller = new AbortController();
    const deleteConfirmed = async () => {
      try {
        dispatch(showLoader());
        await deleteTestimonial(idToDelete, controller);
        setTestimonials((prev) => prev.filter((t) => t._id !== idToDelete));
        showSuccessToast("Testimonial deleted successfully.");
        setIdToDelete("");
        setConfirmVal(false);
      } catch (error: unknown) {
        showErrorToast(getErrorMessage(error as AxiosError));
        setIdToDelete("");
        setConfirmVal(false);
      } finally {
        dispatch(hideLoader());
      }
    };

    if (confirmVal && idToDelete) {
      deleteConfirmed();
    } else {
      setConfirmVal(false);
    }

    return () => controller.abort();
  }, [confirmVal, idToDelete, dispatch]);

  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return testimonial.status === STATUS.ACTIVE;
    if (filterStatus === "inactive")
      return testimonial.status === STATUS.INACTIVE;
    return true;
  });

  return (
    <>
      <div className="mb-6 p-3 md:p-4 bg-white rounded-lg shadow-sm border border-gray-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-semibold text-gray-700 text-sm md:text-base">
              Filter by Status:
            </span>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                filterStatus === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({testimonials.length})
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                filterStatus === "active"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active (
              {testimonials.filter((t) => t.status === STATUS.ACTIVE).length})
            </button>
            <button
              onClick={() => setFilterStatus("inactive")}
              className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                filterStatus === "inactive"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Inactive (
              {testimonials.filter((t) => t.status === STATUS.INACTIVE).length})
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredTestimonials.map((item, idx) => (
          <div
            key={idx}
            className={`group rounded-xl px-4 md:px-6 py-6 md:py-8 flex flex-col justify-between h-full min-h-[250px] md:min-h-[280px] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border ${
              item.status === STATUS.INACTIVE
                ? "bg-white border-gray-200 text-gray-600"
                : "bg-orange-50 border-none text-gray-800"
            }`}
          >
            <div className="flex justify-between items-center mb-4 md:mb-5">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Quote
                  size={20}
                  className={`${
                    item.status === STATUS.INACTIVE
                      ? "text-gray-400"
                      : "text-[#4CB390]"
                  } group-hover:scale-110 transition-all duration-200 flex-shrink-0`}
                />
                <span className="font-bold text-base md:text-[18px] group-hover:text-[#00611F] transition-colors truncate">
                  {item.author}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 rounded-full px-2 md:px-3 py-1 transition-colors flex-shrink-0 ${
                  item.status === STATUS.INACTIVE
                    ? "bg-gray-100 group-hover:bg-gray-200"
                    : "bg-[#E4FFF0] group-hover:bg-[#4CB390] group-hover:text-white"
                }`}
              >
                <Star size={14} className="text-yellow-500" fill="#ffa534" />
                <span className="font-bold text-sm md:text-[16px]">
                  {item.rating}
                </span>
              </div>
            </div>

            <p className="text-sm md:text-[16px] leading-relaxed text-gray-600 group-hover:text-gray-800 transition-colors flex-grow break-words">
              {item.content}
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 md:mt-6 gap-3 sm:gap-0">
              {item.link && (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4CB390] underline text-xs md:text-[14px] hover:text-[#00611F] hover:bg-[#E4FFF0] px-2 py-1 rounded transition-all duration-200 self-start"
                >
                  Visit
                </Link>
              )}

              <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
                <Link
                  href={`/admin/testimonials/edit?testimonial=${item._id}`}
                  className="flex items-center gap-1 text-[#4CB390] hover:text-orange-500 hover:bg-orange-50 px-2 py-1 rounded transition-all duration-200 text-xs md:text-sm flex-1 sm:flex-none justify-center"
                >
                  <Edit2Icon size={14} className="md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Link>

                <button
                  type="button"
                  onClick={() => deleteHandler(item._id)}
                  className="cursor-pointer flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-all duration-200 text-xs md:text-sm flex-1 sm:flex-none justify-center"
                >
                  <Trash2Icon size={14} className="md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CustomDialog
        title="Are you sure you want to delete this testimonial?"
        description="This action cannot be undone and will permanently delete this testimonial."
        open={openConfirm}
        onclose={(open: boolean) => setOpenConfirm(open)}
        className="max-w-[400px]"
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

export default TestimonialsList;
