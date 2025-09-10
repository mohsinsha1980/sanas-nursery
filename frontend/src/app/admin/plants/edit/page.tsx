import EditPlantForm from "@/components/admin/plants/edit-plant";
import Loading from "@/components/layout/Loading";
import { Suspense } from "react";

export default async function EditPlantPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const plant = (await searchParams).plant;
  console.log("plant", plant);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <EditPlantForm plantId={plant} />
      </Suspense>
    </>
  );
}
