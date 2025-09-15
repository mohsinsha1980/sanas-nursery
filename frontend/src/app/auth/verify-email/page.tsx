"use client";
import Image from "next/image";
import Link from "next/link";
import { AUTH } from "@/assets";

export default function VerifyEmailPage() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center overflow-hidden "
      style={{ backgroundImage: "url('/site/auth/auth-banner.webp')" }}
    >
      <Image
      src={AUTH.BANNER}
      alt=""
      height={1000}
      width={1000}
      className="h-screen w-full"
      />
      <div className="z-10 absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-full max-w-xs md:max-w-md p-8 bg-white/50 backdrop-blur-md rounded-xl shadow-lg ">
        <div className="flex flex-col gap-2 justify-center items-center mt-4">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Email Verification Done
          </h2>
          <Link className="text-(--txt-orange) hover:text-(--dark-orange) underline" href="/auth/signin">
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
}
