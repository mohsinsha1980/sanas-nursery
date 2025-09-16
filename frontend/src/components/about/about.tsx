import React from "react";
import Image from "next/image";
import { ABOUT } from "@/assets";

const About = () => {
  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Content Section */}
          <div className="flex-1 lg:max-w-[47%] space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-green-600">Sanas Nursery</span> Plants and
                Trees Supplier
              </h1>
            </div>

            <div className="space-y-4">
              <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-justify">
                Welcome to Sanas Wholesale Nursery, a trusted plants and trees
                supplier dedicated to bringing greenery to large-scale projects,
                landscaping, and plantation drives.
              </p>

              <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-justify">
                With years of experience in cultivating and supplying healthy
                plants, we have become a reliable partner for businesses,
                organizations, and community leaders who value quality and
                sustainability.
              </p>

              <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-justify">
                At our nursery, every plant and tree is grown with care,
                ensuring strength, longevity, and adaptability. Beyond
                supplying, we also provide expert guidance on plantation and
                maintenance, helping our clients build thriving green spaces.
              </p>

              <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-700 leading-relaxed text-center lg:text-justify">
                From bulk plant supplies to large environmental projects, Sanas
                Nursery stands as a one-stop destination for all your wholesale
                greenery needs.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 lg:max-w-[48%] w-full">
            <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
              <Image
                src={ABOUT.WELCOME}
                alt="Sanas Nursery - Plants and Trees Supplier"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
