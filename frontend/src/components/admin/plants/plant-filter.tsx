import SelectField from "@/components/form-fields/select-field";
import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PlantFilterSchema } from "@/lib/schemas/admin";
import { PlantFilterTypes } from "@/lib/types/admin-types";
import { zodResolver } from "@hookform/resolvers/zod";
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
          <div className="grid grid-cols-4 gap-4 mb-4 items-center">
            <div>
              <TextField
                name="title"
                label=""
                placeholder="Filter by plant name"
                formControl={form.control}
                inputType="text"
                className="p-5 border rounded-md"
              />
            </div>
            <div>
              <TextField
                name="plantId"
                label=""
                placeholder="Filter by plant ID"
                formControl={form.control}
                inputType="text"
                className="p-5 border rounded-md"
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
                className="p-5 mt-2"
              />
            </div>
            <div className="flex gap-5">
              <Button size="md" variant="orange" type="submit" className="">
                Apply Filter
              </Button>
              {form.getValues("title") ||
              form.getValues("plantId") ||
              form.getValues("status") ? (
                <Button
                  variant="link"
                  onClick={() => {
                    setFilters(defaultFilters);
                    form.reset();
                  }}
                  className="text-red-500"
                >
                  Clear Filter
                </Button>
              ) : null}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PlantFilter;
