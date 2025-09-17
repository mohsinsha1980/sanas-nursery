"use client";
import { AUTH } from "@/assets";
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
      otp: "",
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
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center overflow-hidden px-4 sm:px-6 lg:px-8 pb-4  mt-4 sm:mt-0"
      style={{
        backgroundImage: `url(${AUTH.BANNER})`,
        paddingTop: "var(--header-height)",
        minHeight: "calc(100vh - var(--header-height))",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative w-full max-w-md sm:max-w-lg lg:w-lg xl:max-w-2xl bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl ring-1 ring-black/5 mx-auto">
        <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="w-full flex flex-col">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-normal  text-gray-900 leading-tight mb-2 sm:mb-3">
              Reset Password
            </h1>
            <p className="text-sm sm:text-base lg:text-md text-gray-600 sm:mb-4 mb-0  leading-relaxed">
              Enter the OTP sent to your email and set a new password to
              continue exploring our plant collection.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-2 flex flex-col space-y-4 sm:space-y-6"
              >
                {/* Email */}
                <TextField
                  name="email"
                  placeholder="Enter Email"
                  label="Email"
                  labelClassName="text-[16px] font-medium"
                  inputType="email"
                  formControl={form.control}
                  className="w-full rounded-md border border-black/20 px-3 text-black bg-white"
                />

                <TextField
                  name="otp"
                  placeholder="Enter OTP"
                  label="OTP"
                  labelClassName="text-[16px] font-medium"
                  inputType="text"
                  formControl={form.control}
                  className="w-full rounded-md border border-black/20 px-3 text-black bg-white"
                />

                <TextField
                  name="password"
                  placeholder="Enter Password"
                  label="Password"
                  labelClassName="text-[16px] font-medium"
                  inputType="password"
                  formControl={form.control}
                  className="w-full rounded-md border border-black/20 px-3 text-black bg-white"
                />

                <TextField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  labelClassName="text-[16px] font-medium"
                  inputType="password"
                  formControl={form.control}
                  className="w-full rounded-md border border-black/20 px-3 text-black bg-white"
                />

                <Button
                  type="submit"
                  variant={"orange"}
                  size={"md"}
                  className="w-full lg:text-lg text-md font-normal text-white sm:p-2"
                >
                  Reset Password
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
