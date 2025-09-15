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
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center overflow-hidden "
      style={{ backgroundImage: "url('/site/auth/auth-banner.webp')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="absolute lg:top-[56%] top-[50%] -translate-y-1/2 lg:w-full w-[96%] bg-white/80 backdrop-blur-md shadow-lg rounded-2xl ring-1 ring-black/10 flex flex-col justify-start items-start max-w-[600px] lg:px-10 lg:py-5 p-5">
        <h1 className="lg:text-[30px] text-[25px] font-semibold text-gray-900 lg:leading-10">
          Sign Up
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col lg:gap-3 gap-3 w-full lg:pt-3 pt-2"
          >
            <TextField
              name="name"
              label="Full Name"
              labelClassName="text-[16px] font-medium"
              placeholder="Enter Full Name"
              inputType="text"
              formControl={form.control}
              className="w-full rounded-md border border-gray-400 px-3 text-black bg-white  "
            />

            <TextField
              name="email"
              label="Email"
              labelClassName="text-[16px] font-medium"
              placeholder="Enter Email"
              inputType="email"
              formControl={form.control}
              className="w-full rounded-md border border-gray-400 px-3 text-black bg-white "
            />

            <TextField
              name="phone"
              label="Contact Number"
              labelClassName="text-[16px] font-medium"
              placeholder="Enter Contact Number (99876543210)"
              inputType="text"
              formControl={form.control}
              className="w-full rounded-md border border-gray-400 px-3 text-black bg-white "
            />

            <TextField
              name="password"
              label="Password"
              labelClassName="text-[16px] font-medium"
              placeholder="At least 8 characters"
              inputType="password"
              formControl={form.control}
              className="w-full rounded-md border border-gray-400 px-3 text-black bg-white "
            />

            <TextField
              name="confirmPassword"
              label="Confirm Password"
              labelClassName="text-[16px] font-medium"
              placeholder="Re-enter Password"
              inputType="password"
              formControl={form.control}
              className="w-full rounded-md border border-gray-400 px-3 text-black bg-white "
            />

            {/* Signup Button */}
            <div className="md:col-span-2">
              <Button
              type="submit"
              variant={"orange"}
              size={"md"}
              className="w-full lg:text-lg text-md font-medium text-white mt-2 sm:p-2"
            >
              Sign Up
            </Button>
            </div>
          </form>
        </Form>

        {/* Divider */}
        <div className="w-full mt-6 flex items-center gap-1 ">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-sm text-gray-500">Or</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <div className="w-full flex justify-center mt-3">
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
