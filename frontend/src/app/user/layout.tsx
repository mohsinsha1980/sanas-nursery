"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/common/error-boundary";
import PageLoader from "@/components/layout/PageLoader";
import { ROLES } from "@/lib/constants";

const UserSidebar = dynamic(
  () => import("@/components/user/layout/user-sidebar"),
  {
    ssr: false,
    loading: () => (
      <div className="w-64 bg-white shadow-lg min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    ),
  }
);

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user?._id) {
      if (user.role !== ROLES.USER) {
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
    } else {
      router.push("/auth/signin");
    }
    setIsLoading(false);
  }, [router, user]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Please sign in to access this page
          </h2>
          <p className="text-gray-600 mt-2">Redirecting to sign in page...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div
        className="min-h-screen bg-gray-50"
        style={{ paddingTop: "var(--header-height)" }}
      >
        <div className="flex flex-col lg:flex-row">
          <UserSidebar />
          <div className="flex-1 gap-10">
            <div className="container mx-auto px-4 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
