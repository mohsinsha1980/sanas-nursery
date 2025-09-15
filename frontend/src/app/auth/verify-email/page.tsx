"use client";
import Link from "next/link";
import { AUTH } from "@/assets";
import { CheckCircle, Mail, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center overflow-hidden px-4 sm:px-6 lg:px-8 pb-4 mt-4 sm:mt-0"
      style={{
        backgroundImage: `url(${AUTH.BANNER})`,
        paddingTop: "var(--header-height)",
        minHeight: "calc(100vh - var(--header-height))",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl ring-1 ring-black/5 mx-auto">
        <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="w-full flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Email Verification Complete!
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
              Your email has been successfully verified. You can now sign in to
              your account and start exploring our amazing plant collection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <Link
                href="/auth/signin"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                <ArrowRight className="w-4 h-4" />
                Sign In Now
              </Link>

              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                <Mail className="w-4 h-4" />
                Browse Plants
              </Link>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <strong>What&apos;s next?</strong> You can now access all features
                including wishlist, order tracking, and personalized
                recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
