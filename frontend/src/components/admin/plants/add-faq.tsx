"use client";
import { Form, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import TextArea from "@/components/form-fields/text-area";
import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
import { faqsSchema } from "@/lib/schemas/admin";
import CancelButton from "../action-buttons/cancel";
import { Save } from "lucide-react";

type FormFields = z.infer<typeof faqsSchema>;
type AddFAQProps = {
  onAdd: (data: z.infer<typeof faqsSchema>) => void;
  onClose?: () => void;
};

export default function AddFAQ({ onAdd, onClose }: AddFAQProps) {
  const form = useForm<FormFields>({
    defaultValues: {
      question: "",
      answer: "",
    },
    resolver: zodResolver(faqsSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (
    values: z.infer<typeof faqsSchema>
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
      <form className="space-y-4">
        <div className="grid  gap-4 mb-4">
          <div>
            <TextField
              name="question"
              label="Question"
              placeholder="Enter FAQ question here"
              formControl={form.control}
              className="rounded-md border-black/20"
            />
          </div>
          <div>
            <TextArea
              name="answer"
              label="FAQ Answer"
              placeholder="Enter FAQ answer here"
              formControl={form.control}
              className="border-black/20 p-4"
            />
          </div>
          <div>
            <div className="space-y-2">
              <FormLabel>&nbsp;</FormLabel>
              <div className="flex h-9 w-full items-center">
                <CancelButton onClick={() => onClose?.()} />

                <Button
                  type="button"
                  variant="orange"
                  onClick={form.handleSubmit(onSubmit)}
                  className="rounded-md"
                >
                  <Save /> Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
