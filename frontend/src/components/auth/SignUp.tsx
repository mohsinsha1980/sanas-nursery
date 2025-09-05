"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signup } from "@/lib/api-routes/api-auth";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { signUpSchema } from "@/lib/schemas/auth";
import { SignUpType } from "@/lib/types/auth-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useReCaptcha } from "next-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TextField from "../form-fields/text-field";
import Link from "next/link";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { executeRecaptcha } = useReCaptcha();

  const form = useForm<SignUpType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpType> = async (data: SignUpType) => {
    try {
      console.log("onSubmit");
      dispatch(showLoader());
      const token = await executeRecaptcha("form_submit");
      const clonedData = structuredClone(data);
      const updatedData = { ...clonedData, token: token };
      await signup(updatedData);
      form.reset();
      showSuccessToast("Verification link sent in email successfully", 1000);
    } catch (error: unknown) {
      console.log("error", error);
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center overflow-hidden px-4"
      style={{ backgroundImage: "url('/site/auth/auth-banner.webp')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative bg-white/80 backdrop-blur-md shadow-lg rounded-2xl ring-1 ring-black/10 flex flex-col justify-start mt-30 items-start w-full max-w-[686px] py-8 px-6 sm:px-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">
          Join Us For An Exclusive Green Experience!
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Sign up to access beautiful plant varieties and stay updated with new
          arrivals.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <TextField
              name="name"
              label="Full Name"
              placeholder="Enter Full Name"
              inputType="text"
              formControl={form.control}
              className="w-full h-[54px] rounded-md border border-gray-300 px-3 text-gray-900 bg-white/40 placeholder:text-gray-500"
            />

            <TextField
              name="email"
              label="Email"
              placeholder="Enter Email"
              inputType="email"
              formControl={form.control}
              className="w-full h-[54px] rounded-md border border-gray-300 px-3 text-gray-900 bg-white/40 placeholder:text-gray-500"
            />

            <TextField
              name="phone"
              label="Contact Number"
              placeholder="Enter Contact Number"
              inputType="text"
              formControl={form.control}
              className="w-full h-[54px] rounded-md border border-gray-300 px-3 text-gray-900 bg-white/40 placeholder:text-gray-500"
            />

            <TextField
              name="password"
              label="Password"
              placeholder="At least 8 characters"
              inputType="password"
              formControl={form.control}
              className="w-full h-[54px] rounded-md border border-gray-300 px-3 text-gray-900 bg-white/40 placeholder:text-gray-500"
            />

            <TextField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter Password"
              inputType="password"
              formControl={form.control}
              className="w-full h-[54px] rounded-md border border-gray-300 px-3 text-gray-900 bg-white/40 placeholder:text-gray-500"
            />

            {/* Signup Button */}
            <Button
              type="submit"
              className="w-full h-[54px] text-[16px] font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 mt-2"
            >
              Sign Up
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="w-full mt-6 flex items-center gap-3">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500">Or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <div className="w-full flex justify-center mt-4">
          <p className="text-sm text-gray-600 text-center">
            Already a member?{" "}
            <Link href="/auth/signin" className="text-orange-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
