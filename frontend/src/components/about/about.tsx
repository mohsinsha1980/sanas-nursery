import React from "react";
import Image from "next/image";
import { ABOUT } from "@/assets";

const About = () => {
  return (
    <div>
      <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 px-5 flex flex-row justify-center ">
        <div className="h-full max-w-[1200px] md:w-[90%] w-[100%] flex lg:flex-row flex-col justify-between items-start ">
          <div className="h-full lg:w-[47%] w-full lg:pb-0 pb-10 flex flex-col justify-evenly lg:items-start lg:space-y-5 space">
            <h1 className="lg:text-[42px] md:text-[26px] text-[20px] font-semibold lg:text-start text-center">
              <span className="text-[#00611F]">Sanas Nursery</span> Plants and
              Trees Supplier
            </h1>
            <p className="text-[#505050] lg:text-[20px] md:text-[18px] text-[15px] font-semibold lg:px-0 px-2 lg:text-start text-center ">
              Welcome to Sanas Wholesale Nursery, a trusted plants and trees
              supplier dedicated to bringing greenery to large-scale projects,
              landscaping, and plantation drives. With years of experience in
              cultivating and supplying healthy plants, we have become a
              reliable partner for businesses, organizations, and community
              leaders who value quality and sustainability. At our nursery,
              every plant and tree is grown with care, ensuring strength,
              longevity, and adaptability. Beyond supplying, we also provide
              expert guidance on plantation and maintenance, helping our clients
              build thriving green spaces. From bulk plant supplies to large
              environmental projects, Sanas Nursery stands as a one-stop
              destination for all your wholesale greenery needs.
            </p>
          </div>
          <div className="h-full lg:w-[48%] md:w-[559px] w-full ">
            <Image
              src={ABOUT.WELCOME}
              height={900}
              width={900}
              alt={ABOUT.WELCOME}
              className="h-[500px] lg:w-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
