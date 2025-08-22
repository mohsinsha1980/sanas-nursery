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
  disabled?: boolean;
  onChange?: (val: boolean) => void;
}

const SwitchField = <T extends FieldValues>({
  name,
  label,
  description,
  formControl,
  disabled = false,
  onChange,
}: SwitchFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-3">
          <div className="space-y-1">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              disabled={disabled}
              checked={field.value ?? false}
              onCheckedChange={(val) => {
                field.onChange(val);
                onChange?.(val);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SwitchField;
