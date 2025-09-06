"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<T>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  readonly?: boolean;
  onchange?: (val: any) => void;
  className?: string;
  upperCase?: boolean;
  labelClassName?: string;        // 👈 for label styling
  descriptionClassName?: string;  // 👈 for description styling
}

const TextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
  prefix,
  suffix,
  readonly,
  onchange,
  className = "",
  upperCase = false,
  labelClassName = "",
  descriptionClassName = "",
}: TextFieldProps<T>) => {
  const [isView, setIsView] = useState(false);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* Label with custom styling */}
          <FormLabel className={labelClassName}>{label}</FormLabel>

          <FormControl>
            <div className="relative w-full">
              <div className="flex h-9 items-center">
                {prefix && (
                  <div className="flex items-center justify-center rounded-md h-full p-2 bg-white-200 min-w-10 me-2 border border-gray-300">
                    {prefix}
                  </div>
                )}

                <Input
                  className={className}
                  placeholder={placeholder}
                  type={inputType === "password" && isView ? "text" : inputType}
                  {...field}
                  readOnly={readonly}
                  onChange={(event) => {
                    if (inputType === "number") {
                      const value = +event.target.value;
                      field.onChange(value);
                      onchange?.(value);
                    } else {
                      const value = upperCase
                        ? event.target.value.toUpperCase()
                        : event.target.value;
                      field.onChange(value);
                      onchange?.(value);
                    }
                  }}
                />

                {inputType === "password" && (
                  <div
                    className="absolute right-6 cursor-pointer text-gray-500"
                    onClick={() => setIsView((prev) => !prev)}
                  >
                    {isView ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                )}

                {suffix && (
                  <div className="flex items-center justify-center h-full p-2 bg-zinc-200 min-w-10 rounded-md ms-1">
                    {suffix}
                  </div>
                )}
              </div>
            </div>
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
};

export default TextField;
