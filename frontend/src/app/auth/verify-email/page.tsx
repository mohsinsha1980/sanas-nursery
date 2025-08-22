"use client";
import Image from "next/image";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen p-6 ">
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
            Email Verification Done
          </h2>
          <Link className="text-blue-500 underline" href="/auth/signin">
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
}
