import EditPlantForm from "@/components/admin/plants/edit-plant";
import Loading from "@/components/layout/Loading";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export default async function EditPlantPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const plant = (await searchParams).plant;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1>Edit Plant</h1>
        <Button variant="orange" type="button" size="md" className="h-fit ">
          <a href="http://localhost:3333/admin/plants">Back</a>
        </Button>
      </div>
      <Suspense fallback={<Loading />}>
        <EditPlantForm plantId={plant} />
      </Suspense>
    </>
  );
}
