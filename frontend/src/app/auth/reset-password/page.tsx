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
import Image from "next/image";
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
    <div className="flex flex-col md:flex-row justify-center items-center h-screen p-6 mt-20">
      <div className="mb-8 md:mb-0 md:mr-10">
        <Image
          src="/site/signin/banner.png"
          width={800}
          height={600}
          alt="Sign-in Banner"
          className="rounded-xl"
        />
      </div>
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg ">
        <div className="flex flex-col gap-2 justify-center items-center mt-4">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Reset Password
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <h2 className="font-semibold text-center mb-2"></h2>
            <TextField
              name="email"
              placeholder="Enter Email"
              label="Email"
              inputType="email"
              formControl={form.control}
            />
            <TextField
              name="otp"
              placeholder="Enter OTP"
              label="OTP"
              inputType="text"
              formControl={form.control}
            />
            <TextField
              name="password"
              placeholder="Enter Password"
              label="Password"
              inputType="password"
              formControl={form.control}
            />

            <TextField
              name="confirmPassword"
              placeholder="Confirm Password"
              label="Confirm Password"
              inputType="password"
              formControl={form.control}
            />
            <div className="w-full flex justify-center items-center">
              <Button type="submit" className="w-24">
                Reset Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
