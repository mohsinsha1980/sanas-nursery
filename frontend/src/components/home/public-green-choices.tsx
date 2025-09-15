import { GreenChoicePlant } from "@/lib/types/public-types";
import PlantCard from "./plant-card";

interface GreenChoicesProps {
  plants: GreenChoicePlant[];
  heading?: string;
}

export default function GreenChoices({ plants }: GreenChoicesProps) {
  return (
    <section className="w-full bg-white flex justify-center items-center lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 ">
      <div className="lg:max-w-[1200px] w-full">
        {/* Heading */}
        <div className="text-center lg:mb-12 mb-8 ">
          <h2 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
            Your <span style={{ color: "rgba(0,97,31,1)" }}>Green</span> Choices
          </h2>
          <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold">
            Fresh, healthy plants for every space.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 gap-x-3 lg:gap-y-12 gap-y-5 justify-items-center px-4">
          {plants.map((plant: GreenChoicePlant) => (
            <PlantCard plant={plant} key={plant._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
