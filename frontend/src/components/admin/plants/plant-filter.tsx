import SelectField from "@/components/form-fields/select-field";
import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PlantFilterSchema } from "@/lib/schemas/admin";
import { PlantFilterTypes } from "@/lib/types/admin-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListFilterPlus, RotateCcw } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultFilters = {
  title: "",
  plantId: "",
  status: "",
};

const PlantFilter = ({
  setFilters,
}: {
  setFilters: (filters: PlantFilterTypes) => void;
}) => {
  const form = useForm<PlantFilterTypes>({
    defaultValues: defaultFilters,
    resolver: zodResolver(PlantFilterSchema),
  });

  const onSubmit: SubmitHandler<PlantFilterTypes> = async (
    values: PlantFilterTypes
  ) => {
    setFilters(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-center">
            <div>
              <TextField
                name="title"
                label=""
                placeholder="Filter by plant name"
                formControl={form.control}
                inputType="text"
                className="p-3 md:p-5 border-black/20 rounded-md"
              />
            </div>
            <div>
              <TextField
                name="plantId"
                label=""
                placeholder="Filter by plant ID"
                formControl={form.control}
                inputType="text"
                className="p-3 md:p-5 border-black/20 rounded-md"
              />
            </div>
            <div>
              <SelectField
                name="status"
                label=""
                placeholder="Filter by status"
                formControl={form.control}
                options={[
                  { label: "Active", value: "0" },
                  { label: "In-Active", value: "1" },
                ]}
                className="p-3 md:p-5 border-black/20 mt-0 md:mt-2"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-5">
              {/* {form.getValues("title") ||
              form.getValues("plantId") ||
              form.getValues("status") ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters(defaultFilters);
                    form.reset();
                  }}
                  className="py-3 md:py-5 w-full sm:w-auto"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="">Clear</span>
                </Button>
              ) : null} */}

              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setFilters(defaultFilters);
                  form.reset();
                }}
                className="py-3 md:py-5 w-full sm:w-auto"
                disabled={
                  form.getValues("title") ||
                  form.getValues("plantId") ||
                  form.getValues("status")
                    ? false
                    : true
                }
              >
                <RotateCcw className="h-4 w-4" />
                <span className="">Clear</span>
              </Button>
              <Button
                size="sm"
                variant="orange"
                type="submit"
                className="py-3 md:py-5 w-full sm:w-auto"
              >
                <ListFilterPlus className="h-4 w-4" />
                <span className="">Apply Filter</span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PlantFilter;
