"use client";
import { User, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/userSlice";
import { logout } from "@/lib/api-routes/api-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfileSidebar({
  activeTab,
  onTabChange,
}: ProfileSidebarProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      dispatch(removeUser());
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      href: "/profile",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      href: "/wishlist",
    },
  ];

  return (
    <div className="w-64 bg-green-50 min-h-screen p-6">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-12 ${
                  isActive
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}

        <div className="pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start h-12 text-gray-700 hover:bg-red-100 hover:text-red-700"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
