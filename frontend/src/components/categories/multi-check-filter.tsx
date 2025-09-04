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
    <div className={`flex flex-col gap-1 pt-4`}>
      <div className="flex items-center justify-between">
        <h3 className="mb-1">{label}</h3>
        <Button
          variant="link"
          className="justify-end btn-red"
          size="sm"
          onClick={reset}
        >
          Clear
        </Button>
      </div>

      <div className={className ? className : ""}>
        {options.map((item) => (
          <FormItem
            key={item.value}
            className="flex items-center space-x-2 mb-2"
          >
            <Checkbox
              id={item.label}
              disabled={item.disable}
              checked={value?.includes(item.value)}
              className="cursor-pointer"
              onCheckedChange={(checked) => {
                return checked
                  ? setValue([...value, item.value])
                  : setValue(
                      Array.from(value)?.filter((v: string) => v !== item.value)
                    );
              }}
            />
            <div className="flex space-x-2 !mt-0 items-center">
              <Label className="text-sm font-normal" htmlFor={item.label}>
                {item.label}
              </Label>
            </div>
          </FormItem>
        ))}
      </div>
    </div>
  );
};

export default MultiCheckBoxFilter;
