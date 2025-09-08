"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartAreaIcon,
  Gamepad2,
  Headset,
  LayoutPanelTopIcon,
  MailOpen,
  SettingsIcon,
  Star,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./context-menu.module.css";

export default function ContextMenu() {
  const pathname = usePathname();

  const getActiveClass = (link: string): string => {
    return link === pathname || pathname.startsWith(link) ? classes.active : "";
  };

  return (
   <Card className={`${classes.bl_context_menu}`}>
  <CardContent className={`${classes.card_content} `}>
    <ul className={`${classes.context_menu} space-y-5`}>
      <li className={`${getActiveClass("/admin/dashboard")} `}>
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="">
            <ChartAreaIcon strokeWidth={1} className="h-6 font-bold" />
          </div>
          Dashboard
        </Link>
      </li>

      <li className={getActiveClass("/admin/plants")}>
        <Link href="/admin/plants" className="flex items-center gap-3">
          <div className="">
            <Gamepad2 strokeWidth={1} className="h-6 font-bold" />
          </div>
          Plants
        </Link>
      </li>

      <li className={getActiveClass("/admin/reviews")}>
        <Link href="/admin/reviews" className="flex items-center gap-3">
          <div className="">
            <Star strokeWidth={1} className="h-6 font-bold" />
          </div>
          Reviews
        </Link>
      </li>

      <li className={getActiveClass("/admin/users")}>
        <Link href="/admin/users" className="flex items-center gap-3">
          <div className="">
            <UserRound strokeWidth={1} className="h-6 font-bold" />
          </div>
          Users
        </Link>
      </li>

      <li className={getActiveClass("/admin/home")}>
        <Link href="/admin/home" className="flex items-center gap-3">
          <div className="">
            <LayoutPanelTopIcon strokeWidth={1} className="h-6 font-bold" />
          </div>
          Home Page
        </Link>
      </li>

      <li className={getActiveClass("/admin/support")}>
        <Link href="/admin/support" className="flex items-center gap-3">
          <div className="">
            <Headset strokeWidth={1} className="h-6 font-bold" />
          </div>
          Support
        </Link>
      </li>

      <li className={getActiveClass("/admin/enquiry")}>
        <Link href="/admin/enquiry" className="flex items-center gap-3">
          <div className="">
            <MailOpen strokeWidth={1} className="h-6 font-bold" />
          </div>
          Enquiry
        </Link>
      </li>

      <li className={getActiveClass("/admin/settings")}>
        <Link href="/admin/settings" className="flex items-center gap-3">
          <div className="">
            <SettingsIcon strokeWidth={1} className="h-6 font-bold" />
          </div>
          Settings
        </Link>
      </li>
    </ul>
  </CardContent>
</Card>

  );
}
