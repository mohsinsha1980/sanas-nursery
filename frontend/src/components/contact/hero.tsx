import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[500px] lg:min-h-[500px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.0491842958786!2d74.1666438!3d18.4814312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e1579a8e3dc1%3A0xd82516d259aa5ea!2zU2FuYXMgV2hvbGVzYWxlIE51cnNlcnkg4KS24KS-4KSW4KS-IChVcnVsaS1LYW5jaGFuKSBVbml0IDI!5e0!3m2!1sen!2sin!4v1756447903300!5m2!1sen!2sin"
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
