import Loading from "@/components/layout/Loading";
import { UserTableDataType } from "@/lib/types/admin-types";
import { Suspense } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  user: UserTableDataType;
}

export default function UserDetails({ user }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 w-full max-w-2xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-16 h-16 shadow-lg">
              <AvatarFallback className="bg-green-300 text-white text-2xl font-bold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user.name || "Unknown User"}
              </h2>
              <p className="text-gray-600">User Details</p>
            </div>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-[var(--txt-orange)] to-[var(--bg-green)]"></div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Full Name */}
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex-shrink-0 w-10 h-10 bg-[var(--txt-orange)]/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[var(--txt-orange)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Full Name
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {user.name || "Not provided"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex-shrink-0 w-10 h-10 bg-[var(--bg-green)]/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[var(--bg-green)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Email Address
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1 break-all">
                {user.email || "Not provided"}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex-shrink-0 w-10 h-10 bg-[var(--txt-orange)]/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[var(--txt-orange)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Mobile Number
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {user.phone || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[var(--bg-green)] rounded-full"></div>
              <span className="text-sm text-gray-600">User Information</span>
            </div>
            <div className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
