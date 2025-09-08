import Link from "next/link";
// import BharathaIconSvg from "../../../../public/site/images/icon-bharathatechno.svg";

export default function FooterPoweredBy() {
  return (
    <div className="flex items-center gap-2">
      <Link href="https://bharathatechno.com" target="_blank">
        Powered by
      </Link>
      <Link href="https://bharathatechno.com" target="_blank">
        {/* <BharathaIconSvg width={24} height={24} className="invert" /> */}
      </Link>
    </div>
  );
}
