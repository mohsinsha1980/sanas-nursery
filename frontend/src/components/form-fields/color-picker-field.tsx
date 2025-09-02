"use client";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { z, ZodTypeAny } from "zod";

interface ColorPickerFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  formControl: Control<TFieldValues>;
  onchange?: (val: z.infer<ZodTypeAny>) => void;
}

const ColorPickerField = <TFieldValues extends FieldValues>({
  name,
  label,
  description,
  formControl,
  onchange,
  ...props
}: ColorPickerFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex h-9 w-full items-center">
              <ColorPicker
                onChange={(v) => {
                  if (onchange) {
                    onchange(v);
                  }
                }}
                value={field.value}
                {...props}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ColorPickerField;
