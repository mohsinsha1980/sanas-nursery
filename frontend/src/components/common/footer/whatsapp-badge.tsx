"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsappBadge() {
  return (
    <div className="relative w-fit">
      <div className="floating-bg-animate">
        <FloatingWhatsApp
          phoneNumber="+91-96574 80645"
          accountName="Maxima Business Solution"
          darkMode={true}
          placeholder="Type Something...."
          avatar="./maxima-wapp.webp"
        />
      </div>
    </div>
  );
}
