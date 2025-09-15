"use client";
import AdminTemplate from "@/components/admin/layout/admin-template";
import PageLoader from "@/components/layout/PageLoader";
import { ROLES } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?._id) {
      if (user.role !== ROLES.ADMIN) {
        router.push("/");
      } else {
        setIsAdmin(true);
      }
    } else {
      router.push("/auth/signin");
    }
    setIsLoading(false);
  }, [pathname, router, user]);

  if (isLoading) {
    return <PageLoader message="Loading Admin Panel..." showLogo={true} />;
  }

  return (
    <div>{isAdmin ? <AdminTemplate>{children} </AdminTemplate> : null}</div>
  );
}
