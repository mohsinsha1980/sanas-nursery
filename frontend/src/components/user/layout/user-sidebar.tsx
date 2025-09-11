"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/api-routes/api-auth";
import {
  getErrorMessage,
  getInitials,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { RootState } from "@/redux/store";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { removeUser } from "@/redux/userSlice";
import { AxiosError } from "axios";
import { Heart, LogOut, PanelLeftClose, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserSidebar() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      dispatch(showLoader());
      const response = await logout();
      if (response?.data?.message === "success") {
        dispatch(removeUser());
        showSuccessToast("Logged out successfully");
        router.push(`/`);
      }
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      href: "/user/profile",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      href: "/user/wishlist",
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <div className="lg:hidden ml-auto mr-2 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white shadow-md border-black/10"
        >
          {isMobileOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          style={{ top: "var(--header-height)" }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`
         w-74 sm:w-72 bg-white shadow-lg min-h-screen fixed lg:static
         transform transition-transform duration-300 ease-in-out
         ${isMobileOpen ? "z-[9999]" : "z-40"}
         ${
           isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
         }
       `}
        style={{ top: "0" }}
      >
        <div
          className="p-4 sm:p-6"
          style={{paddingTop: "calc(var(--header-height) + 1rem)"}}
        >
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                <AvatarFallback className="bg-green-100 text-green-700 font-semibold text-sm sm:text-base">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  {user.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link key={item.id} href={item.href}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    className={`
                      w-full justify-start h-10 sm:h-12 text-left text-sm sm:text-bas
                      ${
                        active
                          ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }
                    `}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start h-10 sm:h-12 text-sm sm:text-base text-gray-700 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
