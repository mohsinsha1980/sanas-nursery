import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HOME_HERO } from "@/assets";

export default function HomeBanner() {
    const heroImages = Object.values(HOME_HERO);

  const today = new Date().getDate();
  const imageIndex = today % heroImages.length;

  const selectedImage = heroImages[imageIndex];
  return (
    <section>
      <div className="relative w-full h-screen ">
        <Image
          src={selectedImage}
          alt=""
          width={1920}
          height={1013}
          className="h-full w-full object-cover"
        />
        <div
          className="z-1 absolute 
        lg:w-[711px] lg:h-[385px] lg:top-[50%] lg:left-[28%] lg:space-y-4
        md:w-[500px] md:h-fit md:top-1/2 md:left-[40%] md:-translate-y-1/2 md:space-y-6 md:items-start
        w-[90%] h-fit top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-5 flex flex-col justify-center items-center 
        "
        >
          <p className="text-[#F37521] lg:text-[20px] md:text-[20px] text-[20px] font-medium ">
            Love for Nature
          </p>
          <h1 className="text-[#354733] lg:text-[64px] md:text-[50px] text-[40px] font-bold lg:leading-18 leading-13 md:text-start text-center">
            Leading Wholesale Plant Nursery in Uruli Kanchan.
          </h1>
          <p className="text-[#505050] lg:text-[20px] md:text-[20px] text-[20px] font-medium md:text-start text-center">
           A wholesale plant nursery providing healthy fruit trees, flower plants, and greenery grown with expert care.
          </p>
          <Link href="/categories/fruit-trees">
            <Button variant="orange" size="lg" className="">
              View Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
