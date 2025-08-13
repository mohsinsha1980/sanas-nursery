import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
      <Image
        src="/logo.jpg"
        alt="Sanas Nursery Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo;
