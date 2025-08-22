import SignUpForm from "@/components/auth/SignUp";
import Loading from "@/components/layout/Loading";
import { Metadata } from "next";
import { Suspense } from "react";

// TODO
export const metadata: Metadata = {
  title: "",
  description: "",
};

const AuthPage = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SignUpForm />
      </Suspense>
    </>
  );
};

export default AuthPage;
