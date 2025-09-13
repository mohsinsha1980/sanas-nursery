import React from "react";
import { Button } from "../ui/button";
import { StepForward, X } from "lucide-react";

interface ConfirmButtonProps {
  handleConfirm: (value: boolean) => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ handleConfirm }) => {
  return (
    <div className="">
      <div className="pt-5 flex justify-end space-x-3 ">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleConfirm(false)}
        >
          <X /> Cancel
        </Button>

        <Button
          type="button"
          variant="orange"
          onClick={() => handleConfirm(true)}
        >
          <StepForward />
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ConfirmButton;
