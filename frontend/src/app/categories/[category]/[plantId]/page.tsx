"use client";
import { useParams } from "next/navigation";

const plants = {
  "fruit-trees": [
    { id: "fruit1", name: "Natural Plant 1", image: "/images/fruit1.png", desc: "A healthy indoor fruit plant." },
    { id: "fruit2", name: "Natural Plant 2", image: "/images/fruit2.png", desc: "Perfect for balconies." },
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
    <div className="flex flex-col items-center p-6">
      <img
        src={plant.image}
        alt={plant.name}
        className="w-80 h-80 object-cover rounded-lg shadow-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{plant.name}</h1>
      <p className="text-gray-600 mt-2">{plant.desc}</p>
    </div>
  );
}
