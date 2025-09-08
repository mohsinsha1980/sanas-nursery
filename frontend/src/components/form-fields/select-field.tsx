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

interface SelectFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  formControl: Control<T>;
  options: SelectOptionsProps[];
  onChange?: (data: string) => void;
  readOnly?: boolean;
  className?: string; // ✅ Added className prop
}

interface SelectOptionsProps {
  label: string;
  value: string;
}

const SelectField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  formControl,
  options,
  onChange,
  readOnly = false,
  className = "", // default empty
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              disabled={readOnly}
              onValueChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              value={field.value || ""}
            >
              <FormControl>
                <SelectTrigger className={className}>
                  <SelectValue placeholder={placeholder} className={className}/>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
                {options.map((item, index) => (
                  <SelectItem 
                  key={item.value + index} 
                  value={item.value}
                  className="text-md" 
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SelectField;
