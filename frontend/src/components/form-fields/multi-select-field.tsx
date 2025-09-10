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
  labelClassName?: string; // ✅ added support
  descriptionClassName?: string; // optional (if you want consistent styling)
  className?: string;
}

const MultipleSelectField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  formControl,
  options,
  labelClassName, // ✅ receive
  descriptionClassName,
  className ="",
}: MultiSelectFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClassName}>{label}</FormLabel>{" "}
          {/* ✅ applied */}
          <FormControl>
            <div className="flex min-h-9 w-full items-center">
              <div className="w-full">
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
                  className={className ? className : ""}
                />
                <style jsx global>{`
                  [data-radix-popper-content-wrapper] {
                    background-color: white !important;
                  }
                  .multiple-selector-content {
                    background-color: white !important;
                  }
                  .multiple-selector-list {
                    background-color: white !important;
                  }
                  [cmdk-root],
                  [cmdk-list],
                  [cmdk-group] {
                    background-color: white !important;
                    border: none !important;
                  }
                  [cmdk-item] {
                    background-color: white !important;
                  }
                  [cmdk-item][data-selected="true"] {
                    background-color: #f3f4f6 !important;
                  }
                `}</style>
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

export default MultipleSelectField;
