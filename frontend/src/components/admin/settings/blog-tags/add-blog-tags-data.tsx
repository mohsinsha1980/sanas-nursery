import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { useDispatch } from "react-redux";
import {
  capitalize,
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { AxiosError } from "axios";
import { BlogTagsSchema } from "@/lib/schemas/admin";
import { AddMasterDataProps } from "@/lib/types/admin-types";
import { addMasterData } from "@/lib/api-routes/api-admin";
import { MASTER_DATA_TYPE } from "@/lib/constants";
import TextField from "@/components/form-fields/text-field";
import CancelButton from "../../action-buttons/cancel";
import SaveButton from "../../action-buttons/save";

type FormFields = z.infer<typeof BlogTagsSchema>;

export default function AddBlogTagsData({
  onAdd,
  onClose,
}: AddMasterDataProps) {
  const dispatch = useDispatch();

  const form = useForm<FormFields>({
    defaultValues: {
      label: "",
    },
    resolver: zodResolver(BlogTagsSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (values: FormFields) => {
    try {
      dispatch(showLoader());
      const newBlogTag = {
        label: capitalize(values.label),
        value: values.label.toLowerCase(),
      };
      const response = await addMasterData(
        MASTER_DATA_TYPE.BLOG_TAGS,
        newBlogTag
      );
      const newField = response.data.data;
      onAdd(newField);
      showSuccessToast("Blog Tag Added Successfully.");
      form.reset();
      if (onClose) {
        onClose();
      }
      dispatch(hideLoader());
    } catch (error: unknown) {
      console.log(error);
      showErrorToast(getErrorMessage(error as AxiosError));
      dispatch(hideLoader());
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-x-4 mb-4">
          <TextField
            name="label"
            label="Blog Tag Label"
            placeholder="gardening, plant care, tips"
            formControl={form.control}
            inputType="text"
            className="rounded-md"
          />
        </div>
        <div className="flex h-9 w-full items-center mt-10">
          <CancelButton onClick={() => onClose?.()} />
          <SaveButton type="submit" />
        </div>
      </form>
    </Form>
  );
}
