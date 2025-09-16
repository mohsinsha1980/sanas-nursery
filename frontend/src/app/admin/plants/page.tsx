"use client";
import AddNew from "@/components/admin/action-buttons/add-new";
import PlantsList from "@/components/admin/plants/plant-list";
import { useRouter } from "next/navigation";

export default function PlantsListPage() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
        <h1 className="text-3xl font-bold text-gray-900 !px-0">Plants</h1>
        <AddNew
          label="Plant"
          onClick={() => router.push("/admin/plants/add")}
        />
      </div>
      <div className="">
        <PlantsList />
      </div>
    </>
  );
}
