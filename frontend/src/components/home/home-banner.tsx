import { HERO } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomeBanner() {
  const heroImages = Object.values(HERO.HOME);

  const today = new Date().getDate();
  const imageIndex = today % heroImages.length;

  const selectedImage = heroImages[imageIndex];
  return (
    <section>
      <div className="relative w-full h-screen ">
        <Image
          src={selectedImage}
          alt="Sanas Nursery - Premium Fruit, Flowering, Show Plants & Shadow Trees Collection in Pune"
          width={1920}
          height={1013}
          priority={true}
          className="h-full w-full object-cover"
        />
        <div className="z-10 lg:w-[1200px] w-[100%] lg:h-fit h-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
          <div
            className="z-1 absolute bg-white/80 backdrop-blur-sm bg-opacity-50 lg:p-8 p-7 rounded-lg lg:bg-transparent lg:backdrop-blur-none
        lg:w-[711px] lg:h-[385px] lg:top-[50%] lg:left-[28%] lg:space-y-4
        md:w-[500px] md:h-fit md:top-1/2 md:left-[40%] md:-translate-y-1/2 md:space-y-6 md:items-start
        w-[90%] h-fit top-[55%] -translate-y-1/2 left-1/2 -translate-x-1/2 space-y-4 flex flex-col justify-center items-center 
        "
          >
            <p className="text-[#F37521] lg:text-[20px] md:text-[20px] text-[20px] font-medium ">
              Love for Nature
            </p>
            <h1 className="text-[#354733] lg:text-[60px] md:text-[50px] text-[40px] font-bold lg:leading-18 leading-12 md:text-start text-center">
              Leading Wholesale Plant Nursery in Uruli Kanchan.
            </h1>
            <p className="text-[#505050] lg:text-[20px] md:text-[20px] text-[20px] font-medium md:text-start text-center">
              A wholesale plant nursery providing healthy fruit trees, flower
              plants, and greenery grown with expert care.
            </p>
            <Link href="/plants">
              <Button variant="orange" size="lg" className="">
                View Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
