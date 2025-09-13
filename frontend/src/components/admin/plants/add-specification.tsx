"use client";
import { Form, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
import { specificationsSchema } from "@/lib/schemas/admin";

type FormFields = z.infer<typeof specificationsSchema>;
type AddSpecificatinProps = {
  onAdd: (data: z.infer<typeof specificationsSchema>) => void;
  onClose?: () => void;
};

export default function AddSpecificatin({
  onAdd,
  onClose,
}: AddSpecificatinProps) {
  const form = useForm<FormFields>({
    defaultValues: {
      label: "",
      value: "",
    },
    resolver: zodResolver(specificationsSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (
    values: z.infer<typeof specificationsSchema>
  ) => {
    try {
      onAdd(values);
      form.reset();
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form className="">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <TextField
              name="label"
              label="Key specification Label"
              placeholder="for e.g. Height, Width"
              formControl={form.control}
              className="rounded-md border-black/20 shadow-md"
            />
          </div>
          <div>
            <TextField
              name="value"
              label="Key specification value"
              placeholder="for e.g. 5 feet, 10 inch"
              formControl={form.control}
              className="rounded-md border-black/20 shadow-md"
            />
          </div>
          <div>
            <div className="space-y-2">
              <FormLabel>&nbsp;</FormLabel>
              <div className="flex h-9 w-full items-center">
                <Button
                  type="button"
                  variant={'orange'}
                  className=""
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Add Specification
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
