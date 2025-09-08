"use client";
import { RootState } from "@/redux/store";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const ProfileDetails = dynamic(
  () => import("@/components/user/profile/profile-details"),
  {
    ssr: false,
    loading: () => <div className="h-32 bg-gray-200 rounded animate-pulse" />,
  }
);

const AccountSettings = dynamic(
  () => import("@/components/user/profile/account-settings"),
  {
    ssr: false,
    loading: () => <div className="h-32 bg-gray-200 rounded animate-pulse" />,
  }
);

const UserEnquiriesList = dynamic(
  () => import("@/components/user/profile/user-enquiries-list"),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" />,
  }
);

export default function UserProfilePage() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="">
      <ProfileDetails user={user} />
      <AccountSettings />
      <UserEnquiriesList />
    </div>
  );
}
