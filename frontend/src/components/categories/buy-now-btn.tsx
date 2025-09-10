"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CustomDialog from "@/components/layout/Dialog";
import TextField from "@/components/form-fields/text-field";
import TextArea from "@/components/form-fields/text-area";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "@/lib/helper";
import Link from "next/link";
import { OrderEnquiryFields, PlantDataType } from "@/lib/types/common-types";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderEnquirySchema } from "@/lib/schemas/common";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { createOrderEnquiry } from "@/lib/api-routes/api-public";
import { Form } from "../ui/form";
import { useReCaptcha } from "next-recaptcha-v3";

const defaultValues: OrderEnquiryFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
  preferredContactTime: "",
};

const BuyNowBtn = ({ plant }: { plant: PlantDataType }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const { executeRecaptcha } = useReCaptcha();

  const form = useForm<OrderEnquiryFields>({
    defaultValues: defaultValues,
    resolver: zodResolver(orderEnquirySchema),
  });

  useEffect(() => {
    if (user) {
      form.reset({
        ...form.getValues(),
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: OrderEnquiryFields) => {
    try {
      dispatch(showLoader());
      const token = await executeRecaptcha("form_submit");
      const payload = {
        ...values,
        token,
        plantId: plant._id,
        userId: user?._id || "",
      };
      console.log(token);
      const res = await createOrderEnquiry(payload);
      console.log("res ", res);
      showSuccessToast(
        "Your enquiry has been submitted. We will contact you soon!"
      );
      setOpenDialog(false);
      form.reset(defaultValues);
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to submit enquiry. Please try again.");
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <Button variant="orange" size="lg" onClick={() => setOpenDialog(true)}>
        Order Now
      </Button>

      <CustomDialog
        title={`Enquiry for ${plant.title}`}
        open={openDialog}
        onclose={(open: boolean) => setOpenDialog(open)}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-2 py-1"
          >
            {!user?._id && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-md text-sm flex justify-between items-center">
                <span>
                  You are not logged in. <strong>Login</strong> to autofill your
                  details.
                </span>
                <Link href="/login">
                  <Button size="sm" variant="link" className="text-amber-600">
                    Login
                  </Button>
                </Link>
              </div>
            )}

            <TextField
              name="name"
              label="Your Name"
              placeholder="Enter your name"
              formControl={form.control}
              className="rounded-lg"
            />
            <TextField
              name="email"
              label="Email"
              placeholder="Enter your email"
              formControl={form.control}
              inputType="email"
              className="rounded-lg"
            />
            <TextField
              name="phone"
              label="Phone"
              placeholder="Enter your phone number"
              formControl={form.control}
              inputType="tel"
              className="rounded-lg"
            />
            <TextArea
              name="message"
              label="Your Query"
              placeholder="Tell us what you are looking for..."
              formControl={form.control}
            />
            <TextField
              name="preferredContactTime"
              label="Preferred Contact Time"
              placeholder="e.g. Morning, Evening (Optional)"
              formControl={form.control}
              className="rounded-lg"
            />

            <div className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="orange">
                Submit Enquiry
              </Button>
            </div>
          </form>
        </Form>
      </CustomDialog>
    </>
  );
};

export default BuyNowBtn;
