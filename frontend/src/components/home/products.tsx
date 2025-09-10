import Image from "next/image";
import Link from "next/link";

interface Plant {
  id: number;
  src: string;
  title: string;
}

interface GreenChoicesProps {
  plants: Plant[];
  heading?: string;
  description?: string;
}

export default function GreenChoices({
  plants,
  heading = "Your Green Choices",
  description = "Fresh, healthy plants for every space.",
}: GreenChoicesProps) {
  return (
    <section className="w-full bg-white flex justify-center items-center lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10   ">
      <div className="lg:max-w-[1200px] w-full">
        {/* Heading */}
        <div className="text-center lg:mb-12 mb-8 ">
          <h2 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
            {heading.split("Green").map((part, idx) =>
              idx === 1 ? (
                <span key={idx} style={{ color: "rgba(0,97,31,1)" }}>
                  Green
                </span>
              ) : (
                part
              )
            )}
          </h2>
          <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 gap-x-1 lg:gap-y-12 gap-y-5 justify-items-center">
          {plants.map((plant) => (
            <Link
              key={plant.id}
              href={`/plants/${plant.id}`}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-[180px] md:w-[240px] lg:w-[250px] h-[300px] sm:h-[320px] md:h-[350px] lg:h-[375px] rounded-[10px] overflow-hidden transition-transform duration-300 hover:scale-105 group lg:px-0 px-4">
                <div className="relative w-full h-full">
                  <Image
                    src={plant.src}
                    alt={plant.title}
                    fill
                    className="rounded-[10px] object-cover"
                  />
                  <div className="absolute inset-0 bg-[#DA5700] opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-[10px]"></div>
                </div>
              </div>
              <p className="mt-4 text-center text-lg font-medium text-gray-700 ">
                {plant.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
