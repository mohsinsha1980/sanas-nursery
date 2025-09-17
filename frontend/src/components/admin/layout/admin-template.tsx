"use client";
import React, { useState, useEffect } from "react";
import classes from "./admin-template.module.css";
import ContextMenu from "./context-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function AdminTemplate({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100); // Hide after scrolling 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="container">
      <div className={`${classes.bl_admin_template} `}>
        {/* Desktop Navigation */}
        <div className={`${classes.admin_nav} ${classes.desktop_nav}`}>
          <ContextMenu />
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${classes.mobile_nav} ${
            isScrolled ? classes.hidden : ""
          }`}
        >
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className={`${classes.mobile_menu_trigger}`}>
                <Menu className="h-5 w-6 " />
                <span>Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className={`${classes.sheet_content} h-full`}>
                <ContextMenu onLinkClick={closeSheet} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div
          className={`${classes.pg_content} bg-[var(--bg-green-light)] py-5 px-2 lg:px-5 rounded-2xl shadow `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
