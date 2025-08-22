"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  BoxesIcon,
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
    <Card className={classes.bl_context_menu}>
      <CardContent className={classes.card_content}>
        <ul className={classes.context_menu}>
          <li className={getActiveClass("/admin/dashboard")}>
            <Link href="/admin/dashboard">
              <ChartAreaIcon strokeWidth={1} className="h-6" /> Dashboard
            </Link>
          </li>
          <li className={getActiveClass("/admin/categories")}>
            <Link href="/admin/categories">
              <BoxesIcon strokeWidth={1} className="h-6" /> Categories
            </Link>
          </li>
          <li className={getActiveClass("/admin/games")}>
            <Link href="/admin/games">
              <Gamepad2 strokeWidth={1} className="h-6" /> Games
            </Link>
          </li>
          <li className={getActiveClass("/admin/reviews")}>
            <Link href="/admin/reviews">
              <Star strokeWidth={1} className="h-6" /> Reviews
            </Link>
          </li>
          <li className={getActiveClass("/admin/users")}>
            <Link href="/admin/users">
              <UserRound strokeWidth={1} className="h-6" /> Users
            </Link>
          </li>
          <li className={getActiveClass("/admin/home")}>
            <Link href="/admin/home">
              <LayoutPanelTopIcon strokeWidth={1} className="h-6" /> Home Page
            </Link>
          </li>
          <li className={getActiveClass("/admin/support")}>
            <Link href="/admin/support">
              <Headset strokeWidth={1} className="h-6" /> Support
            </Link>
          </li>
          <li className={getActiveClass("/admin/enquiry")}>
            <Link href="/admin/enquiry">
              <MailOpen strokeWidth={1} className="h-6" /> Enquiry
            </Link>
          </li>
          <li className={getActiveClass("/admin/settings")}>
            <Link href="/admin/settings">
              <SettingsIcon strokeWidth={1} className="h-6" /> Settings
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
