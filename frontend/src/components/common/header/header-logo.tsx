import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo({ size = 80 }: { size?: number }) {
  return (
    <Link href="/">
      <Image
        src="/site/logo.png"
        alt="Sanas Nursery"
        width={size}
        height={size}
      />
    </Link>
  );
}
