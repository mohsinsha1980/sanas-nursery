"use client";
import AdminTemplate from "@/components/admin/layout/admin-template";
import { ADMIN_ROUTES, ROLES } from "@/lib/constants";
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
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  useEffect(() => {
    if (user?._id) {
      if (user.role !== ROLES.ADMIN && ADMIN_ROUTES.includes(pathname)) {
        router.push("/");
      } else {
        setIsAdmin(true);
      }
    } else {
      router.push("/auth/signin");
    }
  }, [pathname, router, user]);

  return (
    <div>{isAdmin ? <AdminTemplate>{children} </AdminTemplate> : null}</div>
  );
}
