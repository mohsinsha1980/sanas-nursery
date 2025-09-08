"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface SwitchFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  description?: string;
  formControl: Control<T>;
  className?: string; // ✅ Added
  labelClassName?: string; // optional for styling
  descriptionClassName?: string; // optional for styling
}

function SwitchField<T extends FieldValues>({
  name,
  label,
  description,
  formControl,
  className = "",
  labelClassName = "",
  descriptionClassName = "",
}: SwitchFieldProps<T>) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`block ${labelClassName}`}>{label}</FormLabel>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className={className}
            />
          </FormControl>
          {description && (
            <FormDescription className={descriptionClassName}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SwitchField;
