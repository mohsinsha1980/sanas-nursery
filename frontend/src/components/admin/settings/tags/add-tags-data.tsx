import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { useDispatch } from "react-redux";
import {
  capitalize,
  getErrorMessage,
  // getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
// import { AxiosError } from "axios";
import { AxiosError } from "axios";
import { TagsSchema } from "@/lib/schemas/admin";
import { AddMasterDataProps } from "@/lib/types/admin-types";
import { addMasterData } from "@/lib/api-routes/api-admin";
import { MASTER_DATA_TYPE } from "@/lib/constants";
import TextField from "@/components/form-fields/text-field";
import SaveButton from "../../action-buttons/save";
import CancelButton from "../../action-buttons/cancel";

type FormFields = z.infer<typeof TagsSchema>;

export default function AddTagData({ onAdd, onClose }: AddMasterDataProps) {
  const dispatch = useDispatch();

  const form = useForm<FormFields>({
    defaultValues: {
      label: "",
    },
    resolver: zodResolver(TagsSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (values: FormFields) => {
    try {
      dispatch(showLoader());
      const newTag = {
        label: capitalize(values.label),
        value: values.label.toLowerCase(),
      };
      const response = await addMasterData(MASTER_DATA_TYPE.TAGS, newTag);
      const newField = response.data.data;
      onAdd(newField);
      showSuccessToast("Tag Added Successfully.");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-x-4 mb-4">
          <TextField
            name="label"
            label="Tag Label"
            placeholder="indoor, outdoor, low maintenance"
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
