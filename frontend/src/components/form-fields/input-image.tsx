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
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface InputImageFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  formControl: Control<T>;
  multiple?: boolean;
  accept?: string;
  onchange?: (data: FileList) => void;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}

const InputImageField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  formControl,
  multiple,
  accept,
  className = "",
  labelClassName = "",
  descriptionClassName = "",
  onchange,
}: InputImageFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          {/* Add spacing below label */}
          <FormLabel className={`mb-2 block ${labelClassName}`}>
            {label}
          </FormLabel>

          <FormControl>
            {multiple ? (
              <Input
                {...fieldProps}
                placeholder={placeholder}
                type="file"
                multiple
                className={`mb-2 ${className}`} // spacing below input
                accept={accept}
                onChange={(event) => {
                  if (event.target?.files) {
                    onChange(event.target.files);
                    onchange?.(event.target.files);
                  }
                }}
              />
            ) : (
              <Input
                {...fieldProps}
                placeholder={placeholder}
                type="file"
                className={`mb-2 ${className}`} // spacing below input
                accept={accept}
                onChange={(event) => {
                  if (event.target?.files) {
                    onChange(event.target.files[0]);
                    onchange?.(event.target.files);
                  }
                }}
              />
            )}
          </FormControl>

          {description && (
            <FormDescription className={`mt-1 ${descriptionClassName}`}>
              {description}
            </FormDescription>
          )}

          <FormMessage className="mt-1" />
        </FormItem>
      )}
    />
  );
};

export default InputImageField;
