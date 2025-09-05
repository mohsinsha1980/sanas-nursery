"use client";
import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateUserProfile } from "@/lib/api-routes/api-user";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { profileEditSchema } from "@/lib/schemas/user";
import {
  ProfileEditFormData,
  UserInSessionTypes,
} from "@/lib/types/user-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { updateUser } from "@/redux/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface ProfileEditFormProps {
  user: UserInSessionTypes;
  onClose?: () => void;
}

export default function ProfileEditForm({
  user,
  onClose,
}: ProfileEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (data: ProfileEditFormData) => {
    try {
      setIsLoading(true);
      dispatch(showLoader());
      await updateUserProfile(data);
      const updatedData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };
      dispatch(updateUser(updatedData));
      onClose?.();
      showSuccessToast("Profile updated successfully");
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
          className="space-y-4 px-2 py-1"
        >
          <p>
            {" "}
            Email: <strong>{user?.email}</strong>
          </p>

          <TextField
            name="name"
            label="Your Name"
            placeholder="Enter your name"
            formControl={form.control}
            className="rounded-lg"
          />

          <TextField
            name="phone"
            label="Phone"
            placeholder="Enter your phone number"
            formControl={form.control}
            inputType="tel"
            className="rounded-lg"
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
