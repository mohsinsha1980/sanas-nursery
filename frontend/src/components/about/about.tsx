import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 px-5 flex flex-row justify-center     ">
        <div className="lg:h-[545px] h-full max-w-[1370px] md:w-[90%] w-[100%] flex lg:flex-row flex-col justify-around   ">
          <div className="h-full lg:w-[621px] w-full lg:pt-7 lg:pb-7 pb-10 flex flex-col justify-between lg:items-start lg:space-y-0 space-y-2 ">
            <h1 className="lg:text-[42px] md:text-[26px] text-[20px] font-semibold text-center">
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
          <div className="h-full md:w-[559px] w-full m-auto">
            <Image
              src="/about-about.jpg"
              height={900}
              width={900}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
