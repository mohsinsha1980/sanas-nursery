"use client";
import PlantsList from "@/components/admin/plants/plant-list";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlantsListPage() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
        <h1>Plants</h1>
          <Button
            type="button"
            variant="orange"
            size="sm"
            onClick={() => router.push("/admin/plants/add")}
          >
            <CirclePlusIcon /> Add New Plant
          </Button>
      </div>
      <div className="">
        <PlantsList />
      </div>
    </>
  );
}
