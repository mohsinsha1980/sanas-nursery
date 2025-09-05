import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = 80 }: { size?: number }) {
  return (
    <Link href="/">
      <Image
        src="/site/sanas-nursery-logo.webp"
        alt="Sanas Nursery"
        width={size}
        height={size}
      />
    </Link>
  );
}
