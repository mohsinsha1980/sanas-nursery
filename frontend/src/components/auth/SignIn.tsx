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
import { AUTH } from "@/assets";

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
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${AUTH.BANNER})`,
        paddingTop: "var(--header-height)",
        minHeight: "calc(100vh - var(--header-height))",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl ring-1 ring-black/5 mx-auto my-8">
        <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="w-full flex flex-col">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2 sm:mb-3">
              Welcome Back To Your Green Space!
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 sm:mb-4 mb-0  leading-relaxed">
              Sign in to explore our plant collections, read product details,
              and learn more about each variety.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="lg:mt-2 mt-2 flex flex-col space-y-5  "
              >
                <TextField
                  name="email"
                  label="Email"
                  labelClassName="text-[16px] font-medium"
                  placeholder="Enter Email"
                  inputType="email"
                  formControl={form.control}
                  className="w-full rounded-md border border-black/20 px-3 text-black bg-white "
                />

                <div className="w-full">
                  <TextField
                    name="password"
                    label="Password"
                    labelClassName="text-[16px] font-medium"
                    placeholder="At least 8 characters"
                    inputType="password"
                    formControl={form.control}
                    className="w-full rounded-md border border-black/20 px-3 text-black bg-white "
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
                  variant={"orange"}
                  size={"md"}
                  className="w-full lg:text-lg text-md font-medium text-white mb-2 sm:p-2"
                >
                  Sign In
                </Button>

                <div className="flex items-center gap-4 my-3">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-500 text-sm">Or</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <p className="text-center text-sm text-gray-600 ">
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
    </div>
  );
}
