"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Control, FieldPath, FieldValues } from "react-hook-form";

interface RadioOptionsProps {
  label: string;
  value: string;
}

interface RadioFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  description?: string;
  formControl: Control<T>;
  options: RadioOptionsProps[];
  direction?: "row" | "column";
}

const RadioGroupField = <T extends FieldValues>({
  name,
  label,
  description,
  formControl,
  options,
  direction = "row",
}: RadioFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={
                direction === "column" ? `flex flex-col` : "flex flex-row"
              }
            >
              {options.map((item) => (
                <FormItem
                  className="flex items-center space-x-1 space-y-0"
                  key={item.value}
                >
                  <FormControl>
                    <RadioGroupItem
                      value={item.value.toString()}
                      checked={item.value === field.value}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
              {/* <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem
                    value="afternoon"
                    checked={field.value === "afternoon"}
                  />
                </FormControl>
                <FormLabel className="font-normal">Afternoon</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-1 space-y-0">
                <FormControl>
                  <RadioGroupItem
                    value="evening"
                    checked={field.value === "evening"}
                  />
                </FormControl>
                <FormLabel className="font-normal">Evening</FormLabel>
              </FormItem> */}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioGroupField;
