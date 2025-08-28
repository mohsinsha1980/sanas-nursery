"use client";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface RangeFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  description?: string;
  formControl: Control<T>;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
}

const RangeSliderField = <T extends FieldValues>({
  name,
  label,
  description,
  formControl,
  min = 0,
  max = 100,
  prefix,
  suffix,
}: RangeFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex h-9 !mt-10 w-full items-center">
              <DualRangeSlider
                label={(value) => (
                  <span className="whitespace-nowrap">
                    {prefix ? `${prefix} ` : null}
                    {value}
                    {suffix ? ` ${suffix}` : null}
                  </span>
                )}
                labelPosition="top"
                value={field.value}
                onValueChange={(values) => field.onChange(values)}
                min={min ? min : 0}
                max={max ? max : 100}
                step={1}
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

export default RangeSliderField;
