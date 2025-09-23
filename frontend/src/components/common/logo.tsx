import { SITE } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = 80 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        src={SITE.LOGO}
        alt="Sanas Nursery"
        width={size}
        height={size}
        priority={true}
      />
      <h3 className="text-xl font-bold text-primary-400">Sanas Nursery</h3>
    </Link>
  );
}
