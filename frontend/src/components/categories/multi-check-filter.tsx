"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Option } from "@/components/ui/multi-select";
import { Button } from "../ui/button";

interface MultiCheckBoxFieldProps {
  label: string;
  value: string[];
  description?: string;
  setValue: (value: string[]) => void;
  options: Option[];
  className?: string;
}

const MultiCheckBoxFilter: React.FC<MultiCheckBoxFieldProps> = ({
  label,
  value,
  setValue,
  options,
  className = "flex flex-col",
}) => {
  const reset = () => {
    setValue([]);
  };

  return (
    <div
      className={`flex flex-col gap-1 p-3 rounded-lg border-2 border-gray-100`}
    >
      <div className="flex items-center justify-between font-semibold">
        <h3 className="mb-1 text-md">{label}</h3>
        <Button
          variant="link"
          className="pr-0 mb-1 justify-end text-[16px] font-semibold text-red-600"
          size="sm"
          onClick={reset}
        >
          Clear
        </Button>
      </div>

      <div className={className ? className : ""}>
        {options.map((item) => {
          const isChecked = value?.includes(item.value);

          return (
            <FormItem key={item.value} className="flex items-center space-x-2">
              <Checkbox
                id={item.label}
                disabled={item.disable}
                checked={isChecked}
                className="cursor-pointer data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-1 data-[state=checked]:text-white"
                onCheckedChange={(checked) => {
                  return checked
                    ? setValue([...value, item.value])
                    : setValue(value.filter((v: string) => v !== item.value));
                }}
              />

              <div className="flex space-x-2 items-center">
                <Label
                  className={`text-md cursor-pointer ${
                    isChecked
                      ? "text-orange-500 font-semibold"
                      : "text-[#505050] font-medium"
                  }`}
                  htmlFor={item.label}
                >
                  {item.label}
                </Label>
              </div>
            </FormItem>
          );
        })}
      </div>
    </div>
  );
};

export default MultiCheckBoxFilter;
