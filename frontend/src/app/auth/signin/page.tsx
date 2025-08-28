import SignIn from "@/components/auth/SignIn";
import { Metadata } from "next";
import { Suspense } from "react";

// TODO
export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
}
