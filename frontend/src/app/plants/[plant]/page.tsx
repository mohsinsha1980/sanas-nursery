"use client";
import React from "react";
import { useParams } from "next/navigation";
import HomeBanner from "@/components/home/home-banner";
import GreenChoices from "@/components/home/products";
const plantsData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: "/site/home/products/greenchoices.webp",
  title: "Natural Plant",
}));

const page = () => {
  const { plant } = useParams();
  console.log(plant);

  return (
    <div>
      <>
        <HomeBanner />
        <GreenChoices
          plants={plantsData}
          heading="Your Green Choices"
          description="Fresh, healthy plants for every space."
        />
      </>
    </div>
  );
};

export default page;
