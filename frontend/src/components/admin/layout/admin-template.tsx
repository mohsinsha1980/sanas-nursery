"use client";
import React from "react";
import classes from "./admin-template.module.css";
import ContextMenu from "./context-menu";

export default function AdminTemplate({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <div className="container">
      <div className={`${classes.bl_admin_template} `}>
        <div className={`${classes.admin_nav}`}>
          <ContextMenu />
        </div>

        <div
          className={`${classes.pg_content} bg-[var(--bg-green-light)] p-5 rounded-2xl shadow `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
