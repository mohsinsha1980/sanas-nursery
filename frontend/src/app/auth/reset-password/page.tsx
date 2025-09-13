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
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center overflow-hidden border-2 border-amber-500"
      style={{
        backgroundImage: "url('/site/auth/auth-banner.webp')",
      }}
    >
      <div className="absolute lg:w-full w-[96%] max-w-[600px] top-[53%] -translate-y-1/2 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl flex justify-center items-center lg:p-15 p-10">
        <div className="w-full max-w-[574px] flex flex-col">
          <h1 className="lg:text-[40px] text-[25px] font-semibold text-gray-900 leading-13">
            Reset Password
          </h1>
          <p className="lg:text-[20px] text-[16px] text-gray-600 lg:mt-2">
            Enter the OTP sent to your email and set a new password to continue
            exploring our plant collection.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 flex flex-col space-y-5 sm:space-y-6"
            >
              {/* Email */}
              <TextField
                name="email"
                placeholder="Enter Email"
                label="Email"
                labelClassName="text-[18px] font-semibold"
                inputType="email"
                formControl={form.control}
                className="w-full rounded-md border border-gray-800 px-3 text-black bg-white"
              />

              <TextField
                name="otp"
                placeholder="Enter OTP"
                label="OTP"
                labelClassName="text-[18px] font-semibold"
                inputType="text"
                formControl={form.control}
                className="w-full rounded-md border border-gray-800 px-3 text-black bg-white"
              />

              <TextField
                name="password"
                placeholder="Enter Password"
                label="Password"
                labelClassName="text-[18px] font-semibold"
                inputType="password"
                formControl={form.control}
                className="w-full rounded-md border border-gray-800 px-3 text-black bg-white"
              />

              <TextField
                name="confirmPassword"
                placeholder="Confirm Password"
                label="Confirm Password"
                labelClassName="text-[18px] font-semibold"
                inputType="password"
                formControl={form.control}
                className="w-full rounded-md border border-gray-800 px-3 text-black bg-white"
              />

              <Button
                type="submit"
                variant={"orange"}
                className="w-full h-[48px] sm:h-[53px] text-base sm:text-lg font-medium text-white "
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
