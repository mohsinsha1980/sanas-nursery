"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/api-routes/api-auth";
import { ROLES } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { removeUser } from "@/redux/userSlice";
import { LayoutDashboard, LogOut, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalSearch from "./global-search";
import { showSuccessToast } from "@/lib/helper";

export default function HeaderActions() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      dispatch(removeUser());
      const currentPath = window.location.pathname;
      const isProtectedPage =
        currentPath.includes("/user") || currentPath.includes("/admin");
      if (isProtectedPage) {
        router.push("/");
      }
      showSuccessToast("Loged Out Successfully!");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ul className="header-actions flex items-center gap-4">
      <li>
        <GlobalSearch />
      </li>
      <li>
        {user && user._id ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer text-black">
                <UserIcon />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                align="end"
                className="w-56 z-[9999] border-black/20"
                sideOffset={8}
                avoidCollisions={true}
                collisionPadding={10}
              >
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                {user.role === ROLES.ADMIN ? (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">
                      <span className="flex items-center cursor-pointer hover:text-orange-500">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/user/profile">
                      <span className="flex items-center cursor-pointer hover:text-orange-500">
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile
                      </span>
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <span className="flex items-center cursor-pointer hover:text-orange-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        ) : (
          <Link href="/auth/signin">
            <button className="cursor-pointer text-black">
              <UserIcon />
            </button>
          </Link>
        )}
      </li>
    </ul>
  );
}
