"use client";
import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateUserPassword } from "@/lib/api-routes/api-user";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { passwordChangeSchema } from "@/lib/schemas/common";
import { PasswordChangeFormData } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface PasswordChangeFormProps {
  onClose?: () => void;
}

export default function PasswordChangeForm({
  onClose,
}: PasswordChangeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
  });

  const onSubmit = async (data: PasswordChangeFormData) => {
    try {
      setIsLoading(true);
      dispatch(showLoader());
      const updatedData = structuredClone(data);
      await updateUserPassword(updatedData);
      onClose?.();
      showSuccessToast("Password updated successfully");
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <TextField
            name="currentPassword"
            label="Current Password"
            placeholder="At least 8 characters"
            inputType="password"
            formControl={form.control}
            className="rounded-sm"
          />

          <TextField
            name="newPassword"
            label="New Password"
            placeholder="New Password"
            inputType="password"
            formControl={form.control}
            className="rounded-sm"
          />

          <TextField
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm New Password"
            inputType="password"
            formControl={form.control}
            className="rounded-sm"
          />

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="orange" disabled={isLoading}>
              {isLoading ? "Saving" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
