import Link from "next/link";
// import BharathaIconSvg from "../../../../public/site/images/icon-bharathatechno.svg";
import Image from "next/image";

export default function FooterPoweredBy() {
  return (
    <div className="flex justify-between items-center gap-2">
      <Link href="https://bharathatechno.com" target="_blank">
        Powered by
      </Link>
      <Link href="https://bharathatechno.com" target="_blank">
        {/* <BharathaIconSvg width={24} height={24} /> */}
        <Image
          src="/site/images/icon-bharathatechno.svg"
          width={18}
          height={18}
          alt="BharathaTechno"
        />
      </Link>
    </div>
  );
}
