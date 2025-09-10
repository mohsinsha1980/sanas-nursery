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
import { Edit2Icon, Quote, Star, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const TestimonialsList = () => {
  const dispatch = useDispatch();
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [confirmVal, setConfirmVal] = useState(false);

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-lg px-6 py-8 text-white flex flex-col justify-between h-full ${
              item.status === STATUS.INACTIVE ? "bg-green-300" : "bg-[#4CB390]"
            }`}
          >
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <Quote size={24} className="text-white" />
                <span className="font-bold text-[18px]">{item.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-white" />
                <span className="font-bold text-[16px]">{item.rating}</span>
              </div>
            </div>
            <p className="text-[16px] leading-relaxed">{item.content}</p>

            <div className={`flex justify-between items-start mt-4`}>
              {item.link && (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline text-[16px] md:text-[18px] lg:text-[20px] hover:text-gray-200 transition-colors"
                >
                  Visit Website
                </Link>
              )}

              <div className="flex gap-4">
                <Link
                  href={`/admin/testimonials/edit?testimonial=${item._id}`}
                  className="flex items-center gap-1 text-white underline hover:text-orange-600  transition-colors"
                >
                  <Edit2Icon size={16} /> Edit
                </Link>

                <button
                  type="button"
                  onClick={() => deleteHandler(item._id)}
                  className="cursor-pointer flex items-center gap-1 underline hover:text-red-600 transition-colors"
                >
                  <Trash2Icon size={16} /> Delete
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
