import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[500px] lg:min-h-[500px]">
      <iframe
        src={""}
        className="absolute top-0 left-0 w-full h-full rounded-2xl"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Hero;
