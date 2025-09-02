// components/GreenChoices.tsx
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
    <section className="w-full bg-white flex justify-center items-center py-16 px-4">
      <div className="max-w-[1370px] w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold">
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
          <p className="text-gray-600 mt-2">{description}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12 justify-items-center">
          {plants.map((plant) => (
            <Link
              key={plant.id}
              href={`/plants/${plant.id}`}
              className="flex flex-col items-center cursor-pointer"
            >
              {/* Card Image */}
              <div className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[250px] h-[300px] sm:h-[320px] md:h-[350px] lg:h-[375px] rounded-[10px] overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-105">
                <div className="relative w-full h-full">
                  <Image
                    src={plant.src}
                    alt={plant.title}
                    fill
                    className="rounded-[10px] object-cover"
                  />
                </div>
              </div>
              {/* Text outside */}
              <p className="mt-4 text-center text-lg font-medium text-gray-700 group-hover:text-green-700">
                {plant.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
