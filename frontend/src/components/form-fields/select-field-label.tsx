"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Control, FieldPath, FieldValues } from "react-hook-form";

interface SelectWithLabelProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  formControl: Control<T>;
  options: SelectOptionsProps[];
}

interface SelectOptionsProps {
  label: string;
  value: string;
}

const SelectWithLabel = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  formControl,
  options,
}: SelectWithLabelProps<T>) => {
  return (
    <FormField
      {...(formControl ? { ["form-control"]: formControl } : {})}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(val) => {
              field.onChange(val ? JSON.parse(val) : undefined);
            }}
            // value={field.value ? JSON.stringify(field.value) : ""}
            defaultValue={
              field.value && Object.keys(field.value).length > 0
                ? JSON.stringify(field.value)
                : ""
            }
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.length > 0
                ? options.map((item) => (
                    <SelectItem key={item.value} value={JSON.stringify(item)}>
                      {item.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectWithLabel;
