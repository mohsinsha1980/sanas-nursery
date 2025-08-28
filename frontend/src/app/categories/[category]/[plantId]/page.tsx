"use client";
import { useParams } from "next/navigation";
import Image from "next/image";


const plants = {
  "fruit-trees": [
    { id: "fruit1", name: "Mango Tree - Totapuri", image: "/plant1.png", desc: "A healthy indoor fruit plant." },
    { id: "fruit2", name: "Natural Plant 2", image: "/plant2.png", desc: "Perfect for balconies." },
  ],
  "flower-trees": [
    { id: "flower1", name: "Flower Plant 1", image: "/images/flower1.png", desc: "Beautiful flowering plant." },
    { id: "flower2", name: "Flower Plant 2", image: "/images/flower2.png", desc: "Low maintenance flower tree." },
  ],
};

export default function PlantDetailPage() {
  const { category, plantId } = useParams();

  const plantList = plants[category as keyof typeof plants] || [];
  const plant = plantList.find((p) => p.id === plantId);

  if (!plant) {
    return <p className="p-6">Plant not found!</p>;
  }

  return (
    <>
      <div key="hero" >
        <div className="relative">
          <Image
            src="/home-hero.webp"
            alt=""
            width={1920}
            height={1013}
            className="lg:h-full lg:w-full"
          />
          <div className="z-1 absolute top-[40%] left-[11%] lg:w-[611px] lg:h-[385px] space-y-4">
            <h1 className="text-[#0D6536] lg:text-[64px] font-bold leading-18">Fruit Trees Collection </h1>
            <p className="text-[#505050] lg:text-[20px] font-medium">Explore a variety of fruit trees perfect for your garden</p>
          </div>
        </div>
      </div>
     
       <div key="main-div" className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-col justify-center items-center">
        <div key="inner-div" className="w-[60%] h-[656px] flex  justify-between ">
          <div key="image-div" className="w-[42%] h-full ">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div key="four-image-div" className="w-[10%] h-full flex flex-col justify-between ">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-[22%] object-cover rounded-sm"
            />
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-[22%] object-cover rounded-sm"
            />
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-[22%] object-cover rounded-sm"
            />
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-[22%] object-cover rounded-sm"
            />

          </div>
          <div key="content-div" className="w-[42%] h-[85%] flex flex-col justify-between items-start ">
            <div className="h-fit w-full space-y-2">
              <h1 className="text-[#1D2F33] lg:text-[40px] ">{plant.name}</h1>
              <p className="text-black lg:text-[16px]">The Totapuri Mango Tree is a popular variety known for its sweet, tangy fruits. Perfect for home gardens and orchards.</p>
            </div>
            <div className="h-fit w-full space-y-2">
              <p className="text-black lg:text-[16px]">Key Specifications</p>
              <p className="text-[#505050] lg:text-[16px]">Category: Fruit Tree</p>
              <p className="text-[#505050] lg:text-[16px]">Mature Height: 12–15 feet</p>
              <p className="text-[#505050] lg:text-[16px]">Fruit Season: March – June</p>
              <p className="text-[#505050] lg:text-[16px]">Sunlight Needs:  Full Sun</p>
            </div>
            <div className="h-fit w-full space-y-2">
              <p className="text-black lg:text-[16px]">Care Tips</p>
              <p className="text-[#505050] lg:text-[16px]">Water moderately</p>
              <p className="text-[#505050] lg:text-[16px]">Fertilize every few months</p>
              <p className="text-[#505050] lg:text-[16px]">Prune dead branches</p>
            </div>
            <button
              type="submit"
              className="p lg:h-fit lg:w-fit pt-4 pb-4 pl-5 pr-5 md:h-[35px] md:w-[110px] w-[90px] h-[30px] flex justify-center items-center hover:bg-[#DA5700]  bg-[#F37521] lg:rounded-xl md:rounded-xl rounded-[5px] text-[#FFFFFF] lg:text-[20px] ">Enquire on WhatsApp
            </button>
          </div>
        </div>
         <div key="desc-div" className="w-[60%] h-fit pt-10 space-y-5 ">
         <h1 className="text-[#1D2F33] lg:text-[40px]">Description</h1>
         <p className="text-black lg:text-[16px]">{plant.desc}</p>
      </div>
      </div>
    </>
  );
}
