"use client";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";

interface SelectOptionsProps {
  label: string;
  value: string;
}

interface SmartBoxProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  formControl: Control<T>;
  options: SelectOptionsProps[];
  allowCustomValue?: boolean;
  onChange?: (data: string) => void;
  newFieldLabel?: string;
  readOnly?: boolean;
  className?: string;
  labelClassName?: string; // 👈 added for label styling
  descriptionClassName?: string; // 👈 added for description styling
}

const SmartBox = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  formControl,
  options,
  allowCustomValue = true,
  onChange,
  newFieldLabel = "Other",
  readOnly = false,
  className = "",
  labelClassName = "",
  descriptionClassName = "",
}: SmartBoxProps<T>) => {
  const [isCustomValue, setIsCustomValue] = useState(false);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* Label with custom styling */}
          <FormLabel className={labelClassName}>{label}</FormLabel>

          {!isCustomValue ? (
            <Select
              disabled={readOnly}
              onValueChange={(value) => {
                if (value === "__other__") {
                  setIsCustomValue(true);
                  field.onChange("");
                } else {
                  field.onChange(value);
                  onChange?.(value);
                }
              }}
              value={field.value || ""}
            >
              <FormControl>
                <SelectTrigger className={className ? className: ""}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white text-black">
                {options.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
                {allowCustomValue && !readOnly && (
                  <SelectItem key="custom-option" value="__other__">
                    {newFieldLabel}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          ) : (
            <FormControl>
              <Input
                readOnly={readOnly}
                placeholder="Enter your value"
                value={field.value || ""}
                className={className}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onChange?.(e.target.value);
                }}
                onBlur={() => {
                  if (!field.value) {
                    setIsCustomValue(false);
                  }
                }}
              />
            </FormControl>
          )}

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
};

export default SmartBox;
