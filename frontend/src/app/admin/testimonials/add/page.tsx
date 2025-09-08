"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import SmartBox from "@/components/form-fields/smart-box";
import SwitchField from "@/components/form-fields/switch-field";
import TextArea from "@/components/form-fields/text-area";
import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";

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
        <Button variant="orange" type="button" size="md">
          <Link href="/admin/testimonials">Back</Link>
        </Button>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextField
              name="author"
              label="Author Name"
              placeholder="Enter author name"
              inputType="text"
              className="rounded-md"
              labelClassName="text-[20px] font-semibold"
              formControl={form.control}
            />

            <TextArea
              name="content"
              label="Testimonial Content"
              placeholder="Write testimonial here"
              formControl={form.control}
              labelClassName="text-[20px] font-semibold"
            />

            <SmartBox
              name="rating"
              label="Rating"
              placeholder="Select rating"
              formControl={form.control}
              allowCustomValue={false}
              options={[
                { label: "(1) ⭐", value: "1" },
                { label: "(2) ⭐⭐", value: "2" },
                { label: "(3) ⭐⭐⭐", value: "3" },
                { label: "(4)⭐⭐⭐⭐", value: "4" },
                { label: "(5) ⭐⭐⭐⭐⭐", value: "5" },
              ]}
            />

            <TextField
              name="link"
              label="Author Link (Optional)"
              placeholder="https://example.com"
              inputType="text"
              className="rounded-md"
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
              <Button variant="orange" size="md" type="submit">
                Save Testimonial
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
