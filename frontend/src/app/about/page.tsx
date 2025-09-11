import About from "@/components/about/about";
import Hero from "@/components/about/hero";
import Mission from "@/components/about/mission";
import WhyChoose from "@/components/about/whychoose";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Mission />
      <WhyChoose />
    </div>
  );
};

export default page;
