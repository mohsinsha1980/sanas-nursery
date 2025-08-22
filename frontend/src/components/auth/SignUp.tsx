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

  // const google = () => {
  //   window.open(config.API_GOOGLE_AUTH, "_self");
  // };

  return (
    <div className="z-10 mt-50 text-black">
      <p className="font-medium  text-center my-5 text-2xl ">
        Sign-up now and Start Winning!
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          <div className="grid gap-6 w-[300px]  mx-auto">
            <TextField
              name="name"
              placeholder="Enter Name"
              label="Full Name"
              inputType="text"
              formControl={form.control}
              className="bg-white/10 backdrop-blur-md  placeholder:text-normal rounded-md h-full"
            />
            <TextField
              name="email"
              placeholder="Enter Email"
              label="Email"
              inputType="email"
              formControl={form.control}
              className="bg-white/10 backdrop-blur-md  placeholder:text-normal rounded-md h-full"
            />

            <TextField
              name="phone"
              placeholder="Enter Contact Number"
              label="Contact Number"
              inputType="text"
              formControl={form.control}
              className="bg-white/10 backdrop-blur-md  placeholder:text-normal rounded-md h-full"
            />
            <TextField
              name="password"
              placeholder="Password"
              label="Password"
              inputType="password"
              formControl={form.control}
              className="bg-white/10 backdrop-blur-md  placeholder:text-normal rounded-md h-full"
            />
            <TextField
              name="confirmPassword"
              placeholder="Confirm Password"
              label="Confirm Password"
              inputType="password"
              formControl={form.control}
              className="bg-white/10 backdrop-blur-md  placeholder:text-normal rounded-md h-full"
            />
          </div>

          {/* <div className="flex flex-col gap-2 justify-center items-center my-4 ">
            <div className="w-full flex items-center justify-center my-6">
              <div className="flex items-center w-full max-w-md">
                <div className="flex-grow border-t border-white/50"></div>
                <span className="mx-4  text-sm">Or continue with</span>
                <div className="flex-grow border-t border-white/50"></div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                className="bg-white hover:bg-white p-[12px]"
                onClick={google}
              >
                <IconGoogle />
              </Button>
            </div>
          </div> */}

          <div className="w-full flex justify-center items-center ">
            <Button
              variant="secondary"
              type="submit"
              className="w-40 text-lg cursor-pointer"
            >
              Signup
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
