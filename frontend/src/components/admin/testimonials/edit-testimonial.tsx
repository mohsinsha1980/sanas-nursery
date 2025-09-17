"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import SwitchField from "@/components/form-fields/switch-field";
import TextArea from "@/components/form-fields/text-area";
import TextField from "@/components/form-fields/text-field";
import { Form } from "@/components/ui/form";

import {
  getTestimonialById,
  updateTestimonial,
} from "@/lib/api-routes/api-admin";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
  STATUS,
} from "@/lib/helper";
import { testimonialSchema } from "@/lib/schemas/admin";
import { EditTestimonialType } from "@/lib/types/admin-types";
import { TestimonialType } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { Star } from "lucide-react";
import BackButton from "../action-buttons/back";
import CancelButton from "../action-buttons/cancel";
import UpdateButton from "../action-buttons/update";

type EditTestimonialProps = {
  testimonialId: string;
};

const defaultFormData: EditTestimonialType = {
  author: "",
  content: "",
  rating: "5",
  link: "",
  status: true,
};

export default function EditTestimonialForm({
  testimonialId,
}: EditTestimonialProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm<EditTestimonialType>({
    defaultValues: defaultFormData,
    resolver: zodResolver(testimonialSchema),
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchTestimonial = async () => {
      try {
        dispatch(showLoader());
        const response = await getTestimonialById(testimonialId, controller);
        const testimonialData: TestimonialType = response.data.data;
        if (testimonialData) {
          form.reset({
            author: testimonialData.author,
            content: testimonialData.content,
            rating: String(testimonialData.rating),
            link: testimonialData.link || "",
            status: testimonialData.status === STATUS.ACTIVE ? true : false,
          });
        }
      } catch (error) {
        showErrorToast(getErrorMessage(error as AxiosError));
      } finally {
        dispatch(hideLoader());
      }
    };

    if (testimonialId) fetchTestimonial();

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [testimonialId, dispatch, form]);

  const onSubmit: SubmitHandler<EditTestimonialType> = async (values) => {
    try {
      dispatch(showLoader());
      const newData = structuredClone(values);
      const updatedData = {
        ...newData,
        _id: testimonialId,
      };
      await updateTestimonial(updatedData);
      showSuccessToast("Testimonial updated successfully");
      router.back();
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 md:pb-5 gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 !p-0">
          Edit Testimonial
        </h1>
        <BackButton onClick={() => router.back()} />
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextField
              name="author"
              label="Author Name"
              placeholder="Enter author name"
              inputType="text"
              className="rounded-md border-black/20"
              labelClassName="text-[20px] font-semibold"
              formControl={form.control}
            />

            <TextArea
              name="content"
              label="Testimonial Content"
              placeholder="Write testimonial here"
              formControl={form.control}
              labelClassName="text-[20px] font-semibold"
              className="border-black/20"
            />

            <div className="space-y-2">
              <label className="text-[20px] font-semibold text-gray-700">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const currentRating = parseInt(form.watch("rating") || "0");
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => form.setValue("rating", star.toString())}
                      className="p-1 rounded transition-colors hover:bg-gray-100"
                    >
                      <Star
                        size={24}
                        className={
                          star <= currentRating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 hover:text-yellow-200"
                        }
                      />
                    </button>
                  );
                })}
              </div>
              {form.formState.errors.rating && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.rating.message}
                </p>
              )}
            </div>

            <TextField
              name="link"
              label="Redirection Link (Optional)"
              placeholder="https://example.com"
              inputType="text"
              className="rounded-md border-black/20"
              labelClassName="text-[20px] font-semibold"
              formControl={form.control}
            />

            <SwitchField
              name="status"
              label="Status"
              formControl={form.control}
              className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-300"
            />

            <div className="md:col-span-2 lg:col-span-4">
              <div className="flex flex-row">
                <CancelButton onClick={() => router.back()} />
                <UpdateButton type="submit" />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
