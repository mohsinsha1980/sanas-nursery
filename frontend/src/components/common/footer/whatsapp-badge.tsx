"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsappBadge() {
  return (
    <div className="relative w-fit">
      <div className="">
        <FloatingWhatsApp
          phoneNumber="+91-96574 80645"
          accountName="Sanas Nursery"
          phoneNumber=""
          accountName="Sanas Nursery"
          darkMode={true}
          placeholder="Type Something...."
          avatar="/favicon.ico"
        />
      </div>
    </div>
  );
}
