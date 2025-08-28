"use client";
import PlantsList from "@/components/admin/plants/plant-list";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlantsListPage() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row">
        <div className="basis-3/4">
          <h1>Plants</h1>
        </div>
        <div className="basis-1/4 text-right">
          <Button
            type="button"
            size="sm"
            onClick={() => router.push("/admin/plants/add")}
          >
            <CirclePlusIcon /> Add New Plant
          </Button>
        </div>
      </div>

      <PlantsList />
    </>
  );
}
