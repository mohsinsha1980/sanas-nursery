"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import Editor from "./rich-text/editor";

interface RichTextFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  formControl: Control<T>;
  labelClassName?: string; // 👈 added for label styling
}

const RichTextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  formControl,
  labelClassName = "",
}: RichTextFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* Label with optional custom styles */}
          <FormLabel className={labelClassName}>{label}</FormLabel>

          <FormControl>
            <div className="flex w-full items-center">
              <Editor
                content={field.value || ""}
                placeholder={placeholder}
                onChange={(value) => {
                  field.onChange(value);
                }}
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

export default RichTextField;
