import { SITE } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function FooterPoweredBy() {
  return (
    <div className="flex justify-between items-center gap-2 text-white">
      <Link href="https://bharathatechno.com" target="_blank">
        Powered by
      </Link>
      <Link href="https://bharathatechno.com" target="_blank">
        <Image
          src={SITE.POWERED_BY}
          width={18}
          height={18}
          alt="BharathaTechno"
        />
      </Link>
    </div>
  );
}
