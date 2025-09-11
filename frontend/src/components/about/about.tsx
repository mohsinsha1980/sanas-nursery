import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center     ">
        <div className="lg:h-[545px] h-full max-w-[1370px] md:w-[90%] w-[100%] flex lg:flex-row flex-col justify-around   ">
          <div className="h-full lg:w-[621px] w-full lg:py-10 lg:pb-0 pb-10 flex flex-col justify-between lg:items-start lg:space-y-0 space-y-2 ">
            <h1 className="text-[#00611F] lg:text-[42px] md:text-[36px] text-[28px] font-semibold lg:text-start text-center ">
              About Sanas Nursery
            </h1>
            <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold lg:px-0 px-2 lg:text-start text-center ">
              Sanas Nursery was founded in [Year] by [Founder Name] with a
              passion for plants and a vision to bring the beauty of nature into
              every home and garden. Starting as a small nursery with a few
              saplings, it has now grown into a trusted destination offering a
              wide variety of fruit trees, flower trees, show trees, and shadow
              trees. Each plant is nurtured with care using eco-friendly
              practices and expert horticultural knowledge, ensuring healthy and
              high-quality growth. 
              <br />
              Our mission is to inspire sustainable
              gardening and help our customers create vibrant green spaces. We
              guide plant lovers, hobbyists, and professional landscapers in
              choosing and caring for plants while introducing rare and unique
              varieties to enrich gardens and outdoor spaces. At Sanas Nursery,
              we combine expertise, quality, and a love for nature to make every
              garden flourish.
            </p>
          </div>
          <div className="h-full lg:w-[559px] w-full  ">
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
