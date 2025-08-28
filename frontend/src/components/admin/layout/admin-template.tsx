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
    <div className="bg-green-300 mt-32">
      <div className={classes.bl_admin_template}>
        <div className={classes.admin_nav}>
          <ContextMenu />
        </div>

        <div className={classes.pg_content}>{children}</div>
      </div>
    </div>
  );
}
