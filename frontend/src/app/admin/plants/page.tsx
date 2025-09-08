"use client";
import PlantsList from "@/components/admin/plants/plant-list";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlantsListPage() {
  const router = useRouter();
  return (
    <>
      <div className="h-fit w-full lg:space-y-5  ">
        <div className="flex flex-row">
          <div className="basis-3/4  ">
            <h1 className="">Plants</h1>
          </div>
          <div className="basis-1/4 text-right  ">
            <Button
              type="button"
              variant="orange"
              size="lg"
              onClick={() => router.push("/admin/plants/add")}
            >
              <CirclePlusIcon /> Add New Plant
            </Button>
          </div>
        </div>
        <div className="">
          <PlantsList />
        </div>
      </div>
    </>
  );
}
