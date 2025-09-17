"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartAreaIcon,
  LayoutPanelTopIcon,
  MailOpen,
  MessageSquareQuote,
  Notebook,
  SettingsIcon,
  ShoppingCartIcon,
  Sprout,
  UserPlus,
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
    <Card className={`${classes.bl_context_menu} border-2 border-gray-100`}>
      <CardContent className={`${classes.card_content} `}>
        <ul className={`${classes.context_menu} space-y-2`}>
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
                <Sprout strokeWidth={1} className="h-6 font-bold" />
              </div>
              Plants
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

          <li className={getActiveClass("/admin/testimonials")}>
            <Link
              href="/admin/testimonials"
              className="flex items-center gap-3"
            >
              <div className="">
                <MessageSquareQuote strokeWidth={1} className="h-6 font-bold" />
              </div>
              Testimonials
            </Link>
          </li>

          <li className={getActiveClass("/admin/order-enquiries")}>
            <Link
              href="/admin/order-enquiries"
              className="flex items-center gap-3"
            >
              <div className="">
                <ShoppingCartIcon strokeWidth={1} className="h-6 font-bold" />
              </div>
              Order Enquiries
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

          <li className={getActiveClass("/admin/subscription")}>
            <Link href="/admin/subscription" className="flex items-center gap-3">
              <div className="">
                <UserPlus strokeWidth={1} className="h-6 font-bold" />
              </div>
              Subscription
            </Link>
          </li>

          <li className={getActiveClass("/admin/blogs")}>
            <Link href="/admin/blogs" className="flex items-center gap-3">
              <div className="">
                <Notebook strokeWidth={1} className="h-6 font-bold" />
              </div>
              Blogs
            </Link>
          </li>

          <li className={getActiveClass("/admin/contact-enquiries")}>
            <Link
              href="/admin/contact-enquiries"
              className="flex items-center gap-3"
            >
              <div className="">
                <MailOpen strokeWidth={1} className="h-6 font-bold" />
              </div>
              Contact Enquiries
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
