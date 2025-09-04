"use client";
import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { resetPassword } from "@/lib/api-routes/api-auth";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { resetPassSchema } from "@/lib/schemas/auth";
import { ResetPassType } from "@/lib/types/auth-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useReCaptcha } from "next-recaptcha-v3";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function ResetPasswordPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { executeRecaptcha } = useReCaptcha();
  const form = useForm<ResetPassType>({
    defaultValues: {
      email: "",
      otp: undefined,
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPassSchema),
  });

  const onSubmit: SubmitHandler<ResetPassType> = async (data) => {
    try {
      const controller = new AbortController();
      dispatch(showLoader());
      const token = await executeRecaptcha("form_submit");
      const clonedData = structuredClone(data);
      const updatedData = { ...clonedData, token: token };
      const response = await resetPassword(updatedData, controller);
      showSuccessToast(response.data.message);
      router.push("/auth/signin");
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center overflow-hidden pt-24 pb-10"
      style={{
        backgroundImage: "url('/site/auth/auth-banner.webp')",
      }}
    >
      <div
        className="bg-white shadow-lg rounded-2xl flex justify-center items-center mt-20 
        w-[713px] h-[768px] max-w-[95%] sm:max-w-[713px] sm:h-[768px] p-6 sm:p-0"
      >
        <div className="w-full max-w-[574px] flex flex-col">
          <h1 className="text-2xl sm:text-[40px] font-semibold text-gray-900">
            Reset Password
          </h1>
          <p className="text-base sm:text-[20px] text-gray-600 mt-3 sm:mt-4">
            Enter the OTP sent to your email and set a new password to continue
            exploring our plant collection.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 sm:mt-10 flex flex-col space-y-5 sm:space-y-6"
            >
              {/* Email */}
              <TextField
                name="email"
                placeholder="Enter Email"
                label="Email"
                inputType="email"
                formControl={form.control}
                className="w-full h-[48px] sm:h-[53px]"
              />

              <TextField
                name="otp"
                placeholder="Enter OTP"
                label="OTP"
                inputType="text"
                formControl={form.control}
                className="w-full h-[48px] sm:h-[53px]"
              />

              <TextField
                name="password"
                placeholder="Enter Password"
                label="Password"
                inputType="password"
                formControl={form.control}
                className="w-full h-[48px] sm:h-[53px]"
              />

              <TextField
                name="confirmPassword"
                placeholder="Confirm Password"
                label="Confirm Password"
                inputType="password"
                formControl={form.control}
                className="w-full h-[48px] sm:h-[53px]"
              />

              <Button
                type="submit"
                className="w-full h-[48px] sm:h-[53px] text-base sm:text-lg font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Reset Password
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
