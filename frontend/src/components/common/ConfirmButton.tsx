import React from "react";
import { Button } from "../ui/button";

interface ConfirmButtonProps {
  handleConfirm: (value: boolean) => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ handleConfirm }) => {
  return (
    <div className="flex justify-end space-x-3">
      <Button type="button" onClick={() => handleConfirm(false)}>
        Cancel
      </Button>

      <Button type="button" onClick={() => handleConfirm(true)}>
        Continue
      </Button>
    </div>
  );
};

export default ConfirmButton;
