import Loading from "@/components/layout/Loading";
import { UserTableDataType } from "@/lib/types/admin-types";
import { Suspense } from "react";

interface Props {
  user: UserTableDataType;
}

export default function UserDetails({ user }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="p-6 rounded-none w-full max-w-lg">
        <div className="space-y-3">
          <p className="text-md">
            <span className="font-light text-gray-900">Full Name:</span>{" "}
            <strong>{user.name}</strong>
          </p>

          <p className="text-md">
            <span className="font-light text-gray-900">Email:</span>{" "}
            <strong>{user.email || "N/A"}</strong>
          </p>

          <p className="text-md">
            <span className="font-light text-gray-900">Mobile Number:</span>{" "}
            <strong> {user.phone || "N/A"}</strong>
          </p>
        </div>
      </div>
    </Suspense>
  );
}
