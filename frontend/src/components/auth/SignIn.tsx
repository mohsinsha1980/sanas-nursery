"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Form } from "@/components/ui/form";
import { signin } from "@/lib/api-routes/api-auth";
import {
  decryptData,
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { signInSchema } from "@/lib/schemas/auth";
import { SignInType } from "@/lib/types/auth-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { updateUser } from "@/redux/userSlice";
import { useReCaptcha } from "next-recaptcha-v3";
import TextField from "../form-fields/text-field";
import { Button } from "../ui/button";
import Link from "next/link";

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { executeRecaptcha } = useReCaptcha();

  const form = useForm<SignInType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    try {
      dispatch(showLoader());
      const token = await executeRecaptcha("form_submit");
      const clonedData = structuredClone(data);
      const updatedData = { ...clonedData, token: token };
      const response = await signin(updatedData);
      const encryptedUserData = response.data?.data;
      const userData = decryptData(encryptedUserData);
      dispatch(updateUser(userData));
      showSuccessToast("Signed in successfully");
      router.push("/");
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div
      className="flex h-screen w-full bg-cover bg-center items-center pl-10 sm:h-auto sm:p-2"
      style={{
        backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/auth-banner.png')`,
      }}
    >
      <div className="bg-white/25 backdrop-blur-lg shadow-lg rounded-2xl p-10 w-[852px] h-[631px] flex flex-col justify-center items-start pl-16 sm:h-[450px] sm:w-[581px] sm:gap-2 sm:p-4 md:h-[591px]">
        <h1 className="text-[48px] font-semibold text-[rgba(17,17,17,1)] leading-[28px] sm:text-[20px] sm:mb-0 md:text-[30px]">
          Sign in
        </h1>

        <p className="text-[24px] font-semibold text-[rgba(51,51,51,1)] leading-[32px] mt-[20px] sm:text-[16px] sm:mt-0 md:text-[17px] sm:font-normal sm:leading-[30px]">
          Sign in now for exclusive deals, fast checkout, and a <br /> smooth
          shopping experience!
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-10 space-y-6 w-[384px] max-w-full sm:w-full sm:mt-4 pe-4 sm:px-0"
          >
            <div className="w-full">
              <TextField
                name="email"
                label="Email"
                placeholder="Enter email "
                inputType="email"
                formControl={form.control}
                className="w-full h-10 sm:h-12 rounded-md border border-gray-300 px-3 pr-14 py-2 text-black bg-white"
              />
            </div>

            <div className="w-full">
              <TextField
                name="password"
                label="Password"
                placeholder="Enter your password"
                inputType="password"
                formControl={form.control}
                className="w-full h-10 sm:h-12 rounded-md border border-gray-300 px-3 pr-14 py-2 text-black bg-white"
              />

              <div className="flex justify-end w-full mt-2">
                <Link href="/auth/forgot-password">
                  <span className="text-base text-gray-600 cursor-pointer sm:text-sm">
                    Forgot Password
                  </span>
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-12 text-lg text-white bg-gray-900 rounded-md transition hover:bg-gray-800 sm:text-md"
            >
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
