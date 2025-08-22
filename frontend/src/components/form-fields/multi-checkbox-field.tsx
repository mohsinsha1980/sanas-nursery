"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Option } from "@/components/ui/multi-select";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface MultiCheckBoxFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  description?: string;
  formControl: Control<T>;
  options: Option[];
  direction?: "row" | "column";
}

const MultiCheckBox = <T extends FieldValues>({
  name,
  label,
  description,
  formControl,
  options,
  direction = "row",
}: MultiCheckBoxFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          {options.map((item) => (
            <FormField
              key={item.value}
              control={formControl}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.value}
                    className={`flex ${
                      direction === "row" ? "flex-row" : "flex-column"
                    } options-start space-x-3 space-y-0`}
                  >
                    <FormControl>
                      <Checkbox
                        disabled={item.disable}
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultiCheckBox;
