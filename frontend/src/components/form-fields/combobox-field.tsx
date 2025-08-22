"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

interface ComboOptionsProps<T extends string | number = string> {
  label: string;
  value: T;
}

interface ComboboxFieldProps<T extends FieldValues, K extends FieldPath<T>> {
  name: K;
  label: string;
  placeholder: string;
  description?: string;
  formControl: Control<T>;
  options: ComboOptionsProps<T[K]>[]; // value matches the field type
  form: UseFormReturn<T>;
  modal?: boolean;
}

const ComboboxField = <T extends FieldValues, K extends FieldPath<T>>({
  name,
  label,
  placeholder,
  description,
  formControl,
  options,
  form,
  modal = false,
}: ComboboxFieldProps<T, K>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover modal={modal} open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between sm:!w-[170px]",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <span className="truncate max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {field.value
                      ? options.find((option) => option.value === field.value)
                          ?.label
                      : placeholder}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 sm:!w-[170px]">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No option found</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value.toString()}
                        onSelect={() => {
                          form.setValue(name, option.value, {
                            shouldValidate: true,
                          });
                          setOpen(false);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboboxField;
