import Image from "next/image";

export default function HomeBanner() {
  return (
    <section>
      <Image src="/site/home/banner.webp" alt="" width={1920} height={1013} />
    </section>
  );
}
