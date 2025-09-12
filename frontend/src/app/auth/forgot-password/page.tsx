"use client";

import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { forgotPassword } from "@/lib/api-routes/api-auth";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { forgetPassSchema } from "@/lib/schemas/auth";
import { ForgetPassField } from "@/lib/types/auth-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useReCaptcha } from "next-recaptcha-v3";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { executeRecaptcha } = useReCaptcha();

  const form = useForm<ForgetPassField>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPassSchema),
  });

  const onSubmit: SubmitHandler<ForgetPassField> = async (data) => {
    try {
      dispatch(showLoader());
      const token = await executeRecaptcha("form_submit");
      const clonedData = structuredClone(data);
      const updatedData = { ...clonedData, token: token };
      const response = await forgotPassword(updatedData);
      showSuccessToast(response.data.message);
      router.push("/auth/reset-password");
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center  bg-cover bg-center overflow-hidden pt-24 pb-10"
      style={{
        backgroundImage: "url('/site/auth/auth-banner.webp')",
      }}
    >
      <div
        className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl flex justify-center items-center"
        style={{
          width: "686px",
          height: "426px",
          maxWidth: "95%",
          padding: "24px",
        }}
      >
        <div className="flex flex-col w-full" style={{ maxWidth: "500px" }}>
          <h1
            className="font-semibold text-gray-900 "
            style={{ fontSize: "32px" }}
          >
            Forgot Password
          </h1>
          <p className="text-gray-600 mt-3" style={{ fontSize: "18px" }}>
            Enter your email to receive password reset instructions.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 flex flex-col space-y-5"
            >
              <TextField
                name="email"
                placeholder="Enter Email"
                label="Email"
                labelClassName="text-[18px] font-semibold"
                inputType="email"
                formControl={form.control}
                className="rounded-md border border-gray-800 px-3 text-black bg-white"
              />

              <Button
                type="submit"
                className="text-lg font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
                style={{ width: "100%", height: "48px" }}
              >
                Proceed
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
