"use client";
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
  placeholder?: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute;
  formControl: Control<T>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  readOnly?: boolean;
  onChange?: (val: string | number) => void;
  className?: string;
  upperCase?: boolean;
}

const TextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  type = "text",
  formControl,
  prefix,
  suffix,
  readOnly = false,
  onChange,
  className = "",
  upperCase = false,
}: TextFieldProps<T>) => {
  const [isView, setIsView] = useState(false);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative w-full flex items-center">
              {prefix && (
                <div className="flex items-center justify-center rounded-md h-9 px-2 bg-zinc-200 border border-gray-300 me-2">
                  {prefix}
                </div>
              )}

              <Input
                className={className}
                placeholder={placeholder}
                type={type === "password" && isView ? "text" : type}
                value={field.value ?? ""}
                readOnly={readOnly}
                onChange={(e) => {
                  let value: string | number = e.target.value;

                  if (type === "number") {
                    value = e.target.value === "" ? "" : +e.target.value;
                  } else if (upperCase) {
                    value = e.target.value.toUpperCase();
                  }

                  field.onChange(value);
                  onChange?.(value);
                }}
              />

              {type === "password" && (
                <div
                  className="absolute right-2 cursor-pointer text-gray-500"
                  onClick={() => setIsView((prev) => !prev)}
                >
                  {isView ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              )}

              {suffix && (
                <div className="flex items-center justify-center h-9 px-2 bg-zinc-200 rounded-md ms-2">
                  {suffix}
                </div>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
