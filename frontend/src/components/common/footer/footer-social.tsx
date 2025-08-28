import { Facebook, Instagram, Youtube } from "lucide-react";
import Logo from "../logo";
import Link from "next/link";

export default function FooterSocial() {
  return (
    <div className="flex flex-col justify-center gap-6 bl-footer-social">
      <Logo size={96} />
      <div className="flex gap-4">
        <Link href="/" target="_blank">
          <Facebook />
        </Link>
        <Link href="/" target="_blank">
          <Instagram />
        </Link>
        <Link href="/" target="_blank">
          <Youtube />
        </Link>
      </div>
    </div>
  );
}
