"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface TextAreaProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
  formControl: Control<T>;
  readOnly?: boolean;
  resize?: boolean;
  rows?: number;
  onChange?: (val: string) => void;
  labelClassName?: string;        
  descriptionClassName?: string;  
}

const TextArea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  formControl,
  readOnly = false,
  resize = true,
  rows = 4,
  onChange,
  labelClassName = "",
  descriptionClassName = "",
  className = "",
}: TextAreaProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {/* Label with custom styles */}
          <FormLabel className={labelClassName}>{label}</FormLabel>

          <FormControl>
            <Textarea
              readOnly={readOnly}
              placeholder={placeholder}
              rows={rows}
              className={resize || className ? `${className}` : "resize-none"}
              {...field}
              value={field.value ?? ""} // ensures no uncontrolled warning
              onChange={(e) => {
                field.onChange(e.target.value);
                onChange?.(e.target.value);
              }}
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
};

export default TextArea;
