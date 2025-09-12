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
import { mergeWishlistFromDB } from "@/redux/wishListSlice";

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
      const encryptedUserData = response.data?.data?.user;
      const userData = decryptData(encryptedUserData);
      dispatch(updateUser(userData.data));
      if (response.data.data?.wishlist?.length) {
        dispatch(mergeWishlistFromDB(response.data.data?.wishlist));
      }
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
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/site/auth/auth-banner.webp')" }}
    >
      <div className="absolute inset-0 bg-black/20 border-2 border-amber-500"></div>

      <div className="relative bg-white/80 backdrop-blur-md shadow-lg rounded-2xl flex justify-center items-center mt-13 w-full max-w-[713px] mx-4 sm:mx-0 sm:p-6 h-auto sm:h-[768px]   border-2 border-amber-500">
        <div className="w-full max-w-[574px] flex flex-col px-4 sm:px-0 py-6 sm:py-0  border-2 border-amber-500">
          <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900">
            Welcome Back To Your Green Space!
          </h1>
          <p className="text-base sm:text-[20px] text-gray-600 mt-4">
            Sign in to explore our plant collections, read product details, and
            learn more about each variety.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 flex flex-col space-y-5  "
            >
              <TextField
                name="email"
                label="Email"
                labelClassName="lg:text-[18px] text-[16px] font-semibold"
                placeholder="Enter Email"
                inputType="email"
                formControl={form.control}
                className="w-full rounded-md border border-gray-800 px-3 text-black bg-white "
              />

              <div className="w-full">
                <TextField
                  name="password"
                  label="Password"
                  labelClassName="lg:text-[18px] text-[16px] font-semibold"
                  placeholder="At least 8 characters"
                  inputType="password"
                  formControl={form.control}
                  className="w-full rounded-md border border-gray-800 px-3 text-black bg-white "
                />
                <div className="flex justify-end mt-4">
                  <Link href="/auth/forgot-password">
                    <span className="text-sm text-orange-500 cursor-pointer">
                      Forgot Password?
                    </span>
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-[53px] text-lg font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Sign In
              </Button>

              <div className="flex items-center gap-4 my-2">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">Or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <p className="text-center text-sm text-gray-600">
                Don &apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-orange-500">
                  Sign up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
