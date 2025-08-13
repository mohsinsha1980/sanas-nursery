import Link from "next/link";
import WhatsApp from "./whatsapp";

export default function WhatsappBadge() {
  return (
    <div className="whatsapp_badge">
      <Link href="https://wa.me/919090401616" target="_blank">
        <WhatsApp />
      </Link>
    </div>
  );
}
