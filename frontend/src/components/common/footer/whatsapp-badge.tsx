"use client";
import { SITE_DATA } from "@/lib/constants";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsappBadge() {
  return (
    <div className="relative w-fit">
      <div className="">
        <FloatingWhatsApp
          phoneNumber={SITE_DATA.phone}
          accountName="Sanas Nursery"
          darkMode={true}
          placeholder="Type Something...."
          avatar="/favicon.ico"
        />
      </div>
    </div>
  );
}
