import React from "react";
import Image from "next/image";

const Mission = () => {
  return (
    <div>
      <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-[#E4FFF0] ">
        <div className="h-[485px] max-w-[1370px] md:w-[90%] w-[100%] flex flex-col justify-between   ">
          <div className="h-fit w-full flex flex-col justify-center items-center lg:pb-10  pb-5  ">
            <h1 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
              <span className="text-[#00611F]">Mission</span> &{" "}
              <span className="text-[#00611F]">Vision</span>
            </h1>
            <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:px-0 px-2 lg:text-start text-center">
              A glimpse of our plants thriving in homes, gardens, and happy
              spaces.{" "}
            </p>
          </div>
          <div className="h-[409px] w-full flex justify-between   ">
            <div className="h-[349px] w-[656px] bg-[#4CBA9B] flex justify-center items-center rounded-lg">
              <div className="h-[286px] w-[560px] ">
                <div className="h-full w-full flex flex-col justify-between items-center ">
                    <Image
                  src="/site/about/div.png"
                  alt={""}
                  height={100}
                  width={100}
                  className="h-[64px] w-[64px] object-cover rounded-full"
                />
                <h1 className="text-white lg:text-[32px] md:text-[22px] text-[16px] font-bold ">Our Mission</h1>
                <p className="text-white lg:text-[20px] md:text-[22px] text-[16px] font-medium text-center">To provide the highest quality plants and gardening solutions while promoting sustainable practices and environmental stewardship. We aim to inspire and educate our community about the beauty and benefits of connecting  with nature through gardening.</p>
                </div>
              </div>
            </div>
             <div className="h-[349px] w-[656px] bg-[#4CBA9B] flex justify-center items-center rounded-lg">
              <div className="h-[286px] w-[560px] ">
                <div className="h-full w-full flex flex-col justify-between items-center ">
                    <Image
                  src="/site/about/div1.png"
                  alt={""}
                  height={100}
                  width={100}
                  className="h-[64px] w-[64px] object-cover rounded-full"
                />
                <h1 className="text-white lg:text-[32px] md:text-[22px] text-[16px] font-bold ">Our Vision</h1>
                <p className="text-white lg:text-[20px] md:text-[22px] text-[16px] font-medium text-center">To become the leading nursery in sustainable plant cultivation and environmental education, creating greener communities one garden at a time. We envision a future  where every home and space is enhanced by the natural beauty and benefits of healthy plant life.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
