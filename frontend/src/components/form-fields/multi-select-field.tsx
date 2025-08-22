import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface MultiSelectFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  formControl: Control<T>;
  options: Option[];
}

const MultipleSelectField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  formControl,
  options,
}: MultiSelectFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex min-h-9 w-full items-center">
              <div className="w-full bg-white">
                <MultipleSelector
                  {...field}
                  defaultOptions={options}
                  placeholder={placeholder}
                  emptyIndicator={
                    <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                  hidePlaceholderWhenSelected
                />
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultipleSelectField;
