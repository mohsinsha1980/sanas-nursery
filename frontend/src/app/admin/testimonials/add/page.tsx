"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SwitchField from "@/components/form-fields/switch-field";
import TextArea from "@/components/form-fields/text-area";
import TextField from "@/components/form-fields/text-field";
import { Form } from "@/components/ui/form";

import { createTestimonial } from "@/lib/api-routes/api-admin";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { testimonialSchema } from "@/lib/schemas/admin";
import { AddTestimonialType } from "@/lib/types/admin-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { Star } from "lucide-react";
import CancelButton from "@/components/admin/action-buttons/cancel";
import SaveButton from "@/components/admin/action-buttons/save";
import BackButton from "@/components/admin/action-buttons/back";

const defaultFormData: AddTestimonialType = {
  author: "",
  content: "",
  rating: "5",
  link: "",
  status: true,
};

export default function AddTestimonial() {
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm<AddTestimonialType>({
    defaultValues: defaultFormData,
    resolver: zodResolver(testimonialSchema),
  });

  const onSubmit: SubmitHandler<AddTestimonialType> = async (values) => {
    try {
      dispatch(showLoader());
      const response = await createTestimonial(values);
      form.reset();
      showSuccessToast(response.data.message);
      router.back();
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-2xl font-bold">Add Testimonial</h1>
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
            <div>
              <CancelButton onClick={() => router.back()} />

              <SaveButton type="submit" />
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
